import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useState } from "react";


const Pie = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
   <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
    </main>
    </div>
    </>
  );
};

export default Pie;
