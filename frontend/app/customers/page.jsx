'use client'
import BigQueryTable from "@/components/Tables/AgGridTable"
import MemoizedEditButtonRenderer from "@/components/Tables/Edits";
import { IconSearch, IconChevronDown,IconBriefcase } from "@tabler/icons-react"
import { Input, Grid, Stack, Space, Dropdown } from '@mantine/core';
import { useState, useEffect } from "react";



export default function Customers() {

  const [gridApi, setGridApi] = useState(null);
  const [originalGridData, setOriginalGridData] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
      if (!gridApi) return;
      let filteredGridData = originalGridData
        .filter(el => (!searchInput || 
          el.customer.toLowerCase().includes(searchInput.toLowerCase()) || 
          el.segmentedby?.toLowerCase().includes(searchInput.toLowerCase())
        )
        )
      gridApi.setRowData(filteredGridData);

    }, [gridApi,searchInput])
  
    function onGridReady({ api }) {
      let originalData = [];
      api.forEachNode(rowNode => {
        originalData.push(rowNode.data);
      });
      setGridApi(api);
      setOriginalGridData(originalData);
    }


    return (
    <main className=" w-full pt-10 mt-5">
      <div className="bg-white rounded">
        <Space h="xs" />
        <Stack>
        <Grid>
          <Space h="xs" w="xs" />
          <Grid.Col span={4} style={{ display: "flex" }}>
            <div style={{ backgroundColor: "#78b0fd", padding: "8px", borderRadius: "4px", display:'inline-block'}}>
                <IconBriefcase size={20} color="white" />
              </div>
              <span style={{ marginLeft: "8px" }}>Customers</span>
              </Grid.Col>
          <Grid.Col span={4}>
            <Input
              value={searchInput}
              size="xs"
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Type to search..."
              leftSection={<IconSearch size={14}/>}
              type="search"
            />
          </Grid.Col>
          </Grid>
          <Grid>
          <Grid.Col>
            <BigQueryTable 
              onGridReady = {onGridReady}
              endpoint={'customer'}
              columns={'customer,region,customer_id,phase,customer_category,segmentedby,creation_time,website'}
              maxTableHeight={550}
              colDefs={[
                { field: "creation_time", width:80 },
                { field: "segmentedby", width: 100 },
                { field: "approver", width: 100 },
                { field: "region", width: 100 },
                { field: "phone", width: 100 },
                { field: "customer", checkboxSelection: true, headerCheckboxSelection: true, pinned:'left',lockPinned: true}
              ]}
            />
          </Grid.Col>
        </Grid>       
      </Stack>
      </div>
    </main>
    )
}