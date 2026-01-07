import React, { useEffect, useState } from "react";
import {BgPages} from "./components/IU/BgPages.jsx";
import { HeaderComponent } from "./components/IU/HeaderComponent";
import{ NavbarComponent }from "./components/IU/NavbarComponent.jsx";
import {TableComponent} from "./components/IU/TableComponent.jsx";
import  {getModules}  from "../../services/api.jsx";
import { CreateModuleCard } from "./components/IU/cardCreateModuleComponent.jsx";

export const Module = () => {

  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await getModules();
        setModules(data); 
        console.log(data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    
    fetchModules();
  }, []);


  return (
    <>
        <BgPages/>
        <CreateModuleCard />
        <div className="w-full h-dvh bg-transparent  ">
            <HeaderComponent/>
            <NavbarComponent/>
            <div className="m-auto h-max w-11/12 lg:w-3/4 rounded-md lg:mt-16  shadow-lg">
            <TableComponent title={"Modulos"} headers={["Nombre", "Rol"]} data={modules}/>
            </div>
        </div>
    </>
  );
}

export default Module;