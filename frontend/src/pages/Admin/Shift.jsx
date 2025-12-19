import BgPages from "./components/IU/BgPages";
import { useState, useEffect } from "react";
import { HeaderComponent } from "./components/IU/HeaderComponent";
import {NavbarComponent } from "./components/IU/NavbarComponent.jsx";
import { getModules, getServices, getWaitingShifts, createShift , callNextShift} from "../../services/api.jsx";

export const Shift =() => {

    const [modules, setModules] = useState([]);
    const [services, setServices] = useState([]);
    const [newShiftNumber, setNewShiftNumber] = useState("---");
    const [waitingShiftsCount, setWaitingShiftsCount] = useState(0);

    const newShift = async (data) => {
        data.preventDefault();
        const serviceId = data.target.serviceOpt.value;
        try {
            const shift = await createShift(serviceId);
            
            console.log("New shift created:", shift.shift);
            setNewShiftNumber(shift.shift);
            
            const updatedWaitingShifts = await getWaitingShifts();
            setWaitingShiftsCount(updatedWaitingShifts.length);
        } catch (error) {
            console.error("Error creating new shift:", error);
        }
    }


    const nextShift = async (data) => {
        console.log(data)
        data.preventDefault();

        const moduleId = data.target.moduleOpt.value;

        const nextShift = await callNextShift(moduleId);

        if (nextShift.message) {
            alert('No hay turnos en espera para su modulo.');
        } else {
            const updatedWaitingShifts = await getWaitingShifts();
            setWaitingShiftsCount(updatedWaitingShifts.length);
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
                let waitingNumber = data.length;
                setNewShiftNumber(data[waitingNumber - 1].shift);
                setWaitingShiftsCount(waitingNumber);
                console.log("Number of waiting shifts:", waitingNumber);
                console.log("Waiting shifts data:", data);
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
                    <div className=" h-max flex items-center gap-5 w-full">
                        <h2 className="font-bold text-3xl"> Turnos </h2>
                        <form onSubmit={nextShift} className="flex items-center gap-5 ml-auto bg-neutral-800 p-2 rounded-md">
                            <label htmlFor="moduleOpt"> Selecione su modulo: </label>
                            <select name="moduleOpt" className="lg:w-1/2 h-max p-1 rounded-sm border text-white bg-neutral-700">
                                {modules.map((module) => (
                                    <option key={module.id} value={module.id}>
                                        {module.name}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" className="bg-[#007bff] w-max p-1 rounded-lg text-black font-bold cursor-pointer"> Llamar siguiente </button>
                        </form>
                    </div>
                    <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
                        <form onSubmit={newShift} className="bg-neutral-800 py-5 flex flex-col gap-3 rounded-md  px-8 col-span-2">
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
                            <h3 className="font-bold text-xl mb-5">Ultimo turno generado: </h3>
                            <div className="bg-neutral-900 p-5 rounded-md w-max">
                                <span className="font-bold text-3xl"> {newShiftNumber} </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-neutral-800 p-5 rounded-md">
                        <p> <button className="hover:underline cursor-pointer"> Ver Turnos pendientes </button>  ({waitingShiftsCount})</p>
                    </div>
                        
                    </div>
                    </div>
                </div>
        
        </>
    )
}

export default Shift;