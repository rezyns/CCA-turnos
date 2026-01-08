import { Route, Routes } from "react-router"
import {Module} from "../pages/Admin/Module.jsx";
import {Services} from "../pages/Admin/Services.jsx";
import {Shift} from "../pages/Admin/Shift.jsx";
import { ShiftWindowComponent } from "../pages/User/WindowShift.jsx";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={ <Module />} />
            <Route path="/servicios" element={ <Services />} />
            <Route path="/turnos" element={ <Shift />} />
            <Route path="/usuarios" element={ <ShiftWindowComponent />} />
        </Routes>
    )
}