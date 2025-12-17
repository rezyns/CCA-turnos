import BgPages from "./components/IU/BgPages";
import { useState, useEffect } from "react";
import { HeaderComponent } from "./components/IU/HeaderComponent";
import {NavbarComponent } from "./components/IU/NavbarComponent.jsx";
import { getModules, getServices, getWaitingShifts, createShift } from "../../services/api.jsx";
import { data } from "react-router";


export const Shift =() => {

    const [modules, setModules] = useState([]);
    const [services, setServices] = useState([]);
    const [waitingShifts, setWaitingShifts] = useState([]);

    const newShift = async (data) => {
        data.preventDefault();
        const serviceId = data.target.serviceOpt.value;
        try {
            const shift = await createShift(serviceId);
            console.log("New shift created:", shift);
        } catch (error) {
            console.error("Error creating new shift:", error);
        }
    }

    useEffect(() => {
        // Fetch modules from API
        const fetchModules = async () => {
            try {
                const data = await getModules();
                setModules(data);
            } catch (error) {
                console.error("Error fetching modules:", error);
            }
        };

        // Fetch services from API
        const fetchServices = async () => {
            try {
                const data = await getServices();
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        // Fetch waiting shifts from API
        const fetchWaitingShifts = async () => {
            try {
                const data = await getWaitingShifts();
                setWaitingShifts(data);
                let waitingNumber = data.length;
                console.log("Number of waiting shifts:", waitingNumber);
            } catch (error) {
                console.error("Error fetching waiting shifts:", error);
            }
        };

        fetchWaitingShifts();
        fetchModules();
        fetchServices();
    }, []);
    return(
        <>
        <BgPages/>
            <div className="w-full h-dvh bg-transparent  ">
                <HeaderComponent/>
                <NavbarComponent/>
                <div className="m-auto h-max w-11/12 lg:w-3/4 rounded-md lg:mt-16  shadow-lg">
                <div className="text-white">
                    <h2 className="font-bold text-3xl"> Turnos </h2>
                    <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
                        <form onSubmit={newShift} className="bg-neutral-800 py-5 flex flex-col gap-3 rounded-md  px-8 col-span-2">
                            {/* <label htmlFor=""> Selecione su modulo: </label>
                            <select name="" id="" className="lg:w-1/2 p-1 rounded-sm border text-white bg-neutral-700">
                                {modules.map((module) => (
                                    <option key={module.id} value={module.id}>
                                        {module.name}
                                    </option>
                                ))}
                            </select> */}
                            <label htmlFor="serviceOpt"> Selecione el servicio: </label>
                            <select name="serviceOpt" className="lg:w-1/2 p-1 rounded-sm border text-white bg-neutral-700"> 
                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" className="bg-[#20C05C] w-max p-3 rounded-lg text-black font-bold mt-5 cursor-pointer">Generar </button>
                        </form>
                        <div className="col-span-1 bg-neutral-800 rounded-md p-5">
                            <h3 className="font-bold text-2xl mb-5"> Turno generado: </h3>
                            <div className="bg-neutral-900 p-5 rounded-md w-max">
                                <p className="text-xl"> Modulo: <span className="font-bold"> A </span> </p>
                                <p className="text-xl"> Servicio: <span className="font-bold"> Consulta general </span> </p>
                                <p className="text-xl"> Numero de turno: <span className="font-bold text-3xl"> 001 </span> </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-neutral-800 p-5 rounded-md">
                        <p>Turnos pendientes: {waitingShifts.length}</p>
                    </div>
                        
                    </div>
                    </div>
                </div>
        
        </>
    )
}

export default Shift;