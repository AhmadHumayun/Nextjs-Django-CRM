// import Table from "@/components/DataTable/Table";
// import { users } from "./lib/tblData";
// import { get, ApiUrls } from "./lib/apiClient";
// import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
// import ECommerce from "@/components/Dashboard/E-commerce";
// import ECommerce from '@/components/Dashboard/HomePageCard';
import {Input,Container} from '@mantine/core';
import Cards from '@/components/Dashboard/HomePageCard';

export default async function Home() {
  return (
    <main className=" w-full pt-10 mt-5">
      <div className="bg-white rounded">
      <div className="flex h-[70px]">
        {/* <DisplaySettingsIcon className="text-orange-500 w-20 h-20" /> */}
        <div className="flex justify-center items-center h-[70px] mt-2">
          <div className="">
            <h3 className=" text-md font-bold	">text1sdsd</h3>
            <h3 className=" text-2xl font-bold	">text1sdsd</h3>
          </div>
        </div>
      </div>

      {/* <div className="tbl">
        <Table />
      </div> */}
      </div>
      <div className="mt-4">
        <Cards />
      </div>
    </main>
  );
}

// async function getData() {
//   try {
//     const response = await get(ApiUrls.TblDataAPI.getTblData);
//     debugger;
//     return {
//       doctorData: response.data.results,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }