import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";


import { CssBaseline, ThemeProvider } from "@mui/material";

import AuthGuard from "./guards/AuthGuard";

import DashBoardLayout from "./scenes/dashboard/"


const Loadable = (Component) => (props) =>
  <Suspense fallback={<></>}><Component {...props} /></Suspense>

function App() {


  return (
    
        <div className="app">

          {/* <Sidebar isSidebar={isSidebar} /> */}
          {/* <main className="content"> */}
          {/* <Topbar setIsSidebar={setIsSidebar} /> */}
          <Routes>
            <Route path="/" element={<AuthGuard><DashBoardLayout /></AuthGuard>}>
              <Route path="/" element={<Dashboard />} index />
         
              </Route>
        </Routes>
        </div>
        
  );
}

// const Company = Loadable(lazy(() => import('./scenes/Company')))
const Dashboard = Loadable(lazy(() => import('./scenes/dashboard')))
export default App;
