'use client';
import {
  ActionIcon,
  Group,
  Menu,
  Stack,
  Text,
  Space,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronDown, IconEdit, IconTrash } from '@tabler/icons-react';
import MemoizedEditButtonRenderer from "./Edits";
import { useCallback , useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

function isTimestamp(input) {
  const iso8601TimestampRegex = /^\d{4}-\d{2}-\d{2}(?:T|\s)\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|\s\+\d{2}:\d{2})?$/;
  return iso8601TimestampRegex.test(input);
}

function valueFormatter(params) {
  let val = params.value;
  if (!val) return "-";
  if (isNaN(Number(val))) {
    if (isTimestamp(val)) return new Date(val).toISOString().split('T')[0];
    return val;
  }
  val = Number(val);
  if (val % 1 != 0) val = val.toFixed(2);
  val = val.toString().split(".");
  val[0] = val[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  val = val.join(".");
  if (
    params.colDef.field.toLowerCase() === "processed_month" ||
    params.colDef.field.toLowerCase() === "casenumber"
  ) {
    val = val.replaceAll(",", "");
  }
  return val;
}

function BigQueryTable({
  colDefs = [],
  projectId = "adara-bi",
  endpoint,
  columns = '',
  header = "",
  getRowStyle = () => {},
  maxTableHeight = 450,
  minTableHeight,
  showRowId = true,
  header_background_color = "white",
  onGridReady,
  enableRowAddition = false,
  onAddRow,
}) {
  const theme = useMantineTheme();
  ;

  const gridRef = useRef();
  const [height, setHeight] = useState(110);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const columnDefs = [];

  if (tableData.length)
    columnDefs.push(
      ...Object.keys(tableData[0]).map((f) => {
        let cd = colDefs.filter( (c) => c.field?.toLowerCase() === f?.toLowerCase() );

        return !cd.length
          ? f.toLowerCase().includes("_id")
            ? { field: f, headerName: f.toLowerCase(), tooltipField: f }
            : { field: f, headerName: f.toLowerCase(), valueFormatter, tooltipField: f }
          : f.toLowerCase().includes("_id")
            ? { ...cd[0], field: f, headerName: cd[0].headerName?.length ? cd[0].headerName : f.toLowerCase(), tooltipField: f }
            : { ...cd[0], field: f, headerName: cd[0].headerName?.length ? cd[0].headerName : f.toLowerCase(), valueFormatter, tooltipField: f }; // temporary fix (add new formatting logic)
      })
    );
  
  columnDefs.push({ headerName: 'Actions',cellRenderer: MemoizedEditButtonRenderer})
  
  const rowData = tableData;
  let request;
  useEffect(() => {
    setHeight(110);
    setTableData([]);
    setLoading(true);
    if (request) request.cancel();
    request = axios.CancelToken.source();
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}?columns=${columns}`, {}, { cancelToken: request.token })
      .then(({ data }) => {
        setLoading(false);
        if (!data.results) return;
        setHeight(data.results > 9 ? maxTableHeight : (minTableHeight ? minTableHeight : 30 * (data.results + 1.5)));
        setTableData(data.data);
      })
      .catch((err) => console.error(axios.isCancel(err) ? "Request was cancelled for a new request\n" : "", err));
  }, [projectId, endpoint]);

  useEffect(() => {
    setHeight(tableData.length > 9 ? maxTableHeight : (minTableHeight ? minTableHeight : 30 * (tableData.length + 1.5)));
  }, [tableData]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
    }),
    []
  );


  if (loading)
    return (
      <div style={{ height, position: "relative" }}>
        loading.....
      </div>
    );

  // const onRowDataUpdated = useCallback(() => {
  //   let newTableData = [];
  //   gridRef.current.api.forEachNode(({ data }) => newTableData.push(data));
  //   let isDataSame = newTableData.length === rowData.length &&
  //   rowData.every((e, i) => Object.entries(e).toString() === Object.entries(newTableData[i]).toString());
  //   if (isDataSame) return;
  //   setTableData(newTableData);
  // });

  if (loading)
    return (
      <div style={{ height, position: "relative" }}>
        <CustomLoadingOverlay visible={true} />
        loading...
      </div>
    );

  function MenuDropdownStyles() {
    return {
      maxHeight: "300px",
      overflow: "auto",
      borderRadius: 0,
      width: 200,
    };
  }

  return (
    <Stack spacing={3}>
      <div
        className="ag-theme-balham"
        style={{
          height,
          "--ag-borders": 'none',
          "--ag-row-border-style": 'dashed',
          "--ag-row-border-color": 'rgb(150, 150, 200)',
          "--ag-header-foreground-color": theme.colors.gray[9],
          "--ag-header-background-color": theme.colors.gray[3],
          "--ag-foreground-color": 'rgb(1, 118, 211)',
          "--ag-row-hover-color": "transparent",
          "--ag-odd-row-background-color": theme.colors.gray[1],
          "--ag-background-color": "transparent",
          "--ag-header-column-resize-handle-color": "white",
          "--ag-selected-row-background-color": 'rgb(0, 255, 0, 0.1)'
        }}
      >
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          getRowStyle={getRowStyle}
          rowData={rowData} // Row Data for Rows
          rowSelection={'multiple'}
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          suppressDragLeaveHidesColumns={true}
          suppressPropertyNamesCheck={true}
          enableCellTextSelection={true}
          enableRangeSelection={true} // Enable range selection
          enableRangeHandle={true} // Show range selection handle
          enableFillHandle={true} // Show fill handle for dragging values
          clipboardDeliminator="\t" // Set clipboard delimiter to tab
          suppressRowTransform={true}
          enableCellChangeFlash={true}
          onGridReady={onGridReady}
          enableBrowserTooltips={true}
          // onRowDataUpdated={onRowDataUpdated}
        ></AgGridReact>
      </div>
    </Stack>
  );
}

export default BigQueryTable;
