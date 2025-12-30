import { useEffect, useState } from "react";
import { getModules } from "../../../../services/api"; 
import { createService } from "../../../../services/api";

export const CreateServiceCard = () => {

    const [modules, setModules] = useState([]);

    useEffect(() => {
        const fethModules =async () => {
            try {
                const response = await getModules();
                setModules(response);
            } catch (error) {
                console.error("Error fetching modules:", error);
                throw new Error(error);
            }
        }

        fethModules()
    },[]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.nameService.value,
            letter: e.target.serviceLetter.value,
            module_id: e.target.moduleId.value
        };

        const submitService = async () => {
            try {
                const response = await createService(formData);

                if (!response) {
                    throw new Error("Error creating service");
                }

                alert("Servicio creado con éxito");
                window.location.reload();
            } catch (error) {
                console.error("Error creating service:", error);
                alert("Error al crear el servicio");
            }
        }

        submitService();

    }

    const closeCard = () => {
        const card = document.getElementById("card");
        card.style.display = "none";
    }

    return(
        <>
            <div id="card" className="bg-black opacity-90 hidden absolute top-0 left-0 z-20 w-full h-full rounded-md justify-center  items-center ">
                <div className="bg-white lg:w-1/2 h-max p-6 rounded-md relative">
                    <svg onClick={closeCard} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x absolute top-1 right-1.5 size-9 cursor-pointer" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    <form action="" onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-4 text-black">Crear Nuevo Servicio</h2>
                        <label htmlFor=""></label>
                        <input name="nameService" type="text" placeholder="Nombre del Servicio" className="w-full p-2 mb-4 border border-gray-300 rounded-md"/>
                        <label htmlFor=""></label>
                        <input name="serviceLetter" type="text" placeholder="Letra del Servicio" className="w-full p-2 mb-4 border border-gray-300 rounded-md"/>
                        <label htmlFor="">Módulo</label>
                        <select name="moduleId" id="" className="w-full  p-1 rounded-sm border ">
                            {modules.map((module) => (
                                <option key={module.id} value={module.id} >{module.name}</option>
                            ))}
                        </select>
                        <button type="submit" className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-md hover:bg-blue-600">Crear Servicio</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateServiceCard;