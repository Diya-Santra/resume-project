import Protected from "./features/components/Protected";
import Login from "./features/pages/Login";
import Home from "./features/pages/Home";
import Register from "./features/pages/Register";
import { Route, Routes } from "react-router-dom";

export const AppRoutes=()=>{
    return(
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Protected><Home/></Protected>}/>
            </Routes>
    )
}