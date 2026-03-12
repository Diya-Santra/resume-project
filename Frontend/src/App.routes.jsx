import { createBrowserRouter } from "react-router-dom";
import Login from "./features/pages/Login";
import Register from "./features/pages/Register";
import { Route, Router, Routes } from "react-router";

export const AppRoutes=()=>{
    return(
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
    )
}