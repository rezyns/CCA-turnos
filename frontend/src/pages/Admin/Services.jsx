import { useState, useEffect } from "react";
import {BgPages} from "./components/IU/BgPages.jsx";
import { HeaderComponent } from "./components/IU/HeaderComponent";
import{ NavbarComponent }from "./components/IU/NavbarComponent.jsx";
import {TableComponent} from "./components/IU/TableComponent.jsx";
import { getServices}  from "../../services/api.jsx";
import { CreateServiceCard } from "./components/IU/CardCreateComponent.jsx";

export const Services = () => {

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [])

  return (
    <>
        <BgPages/>
        <CreateServiceCard />
        <div className="w-full h-dvh bg-transparent  ">
            <HeaderComponent/>
            <NavbarComponent/>
            <div className="m-auto h-max w-11/12 lg:w-3/4 rounded-md lg:mt-16  shadow-lg">
            <TableComponent title={"Servicios"} headers={["Nombre", "letra"]} data={services} />
            </div>
        </div>
    </>
  );
}

export default Services;
