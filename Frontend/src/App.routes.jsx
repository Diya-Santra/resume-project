import Protected from "./features/components/Protected";
import Login from "./features/pages/Login";
import Register from "./features/pages/Register";
import { Route, Routes } from "react-router-dom";

export const AppRoutes=()=>{
    return(
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Protected><h1 className="text-white">Home</h1></Protected>}/>
            </Routes>
    )
}