import BgPages from "./components/IU/BgPages";
import { useState, useEffect } from "react";
import { HeaderComponent } from "./components/IU/HeaderComponent";
import {NavbarComponent } from "./components/IU/NavbarComponent.jsx";
import { getModules, getServices } from "../../services/api.jsx";

export const Shift =() => {

    const [modules, setModules] = useState([]);
    const [services, setServices] = useState([]);

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
                        <form action="" className="bg-neutral-800 w-full py-5 flex flex-col gap-3 rounded-md mt-5 px-8">
                            <label htmlFor=""> Selecione su modulo: </label>
                            <select name="" id="" className="lg:w-1/2 p-1 rounded-sm border text-white bg-neutral-700">
                                {modules.map((module) => (
                                    <option key={module.id} value={module.id}>
                                        {module.name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor=""> Selecione el servicio: </label>
                            <select name="" id=""  className="lg:w-1/2 p-1 rounded-sm border text-white bg-neutral-700"> 
                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" className="bg-[#20C05C] w-max p-3 rounded-lg text-black font-bold mt-5 cursor-pointer">Generar </button>
                        </form>
                    </div>
                    </div>
                </div>
        
        </>
    )
}

export default Shift;