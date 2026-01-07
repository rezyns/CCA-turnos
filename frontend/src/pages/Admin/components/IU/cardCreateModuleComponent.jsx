import { createModule } from "../../../../services/api";

export const CreateModuleCard = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.nameModule.value,
            role: e.target.moduleRole.value
        };

        const submitService = async () => {
            try {
                const response = await createModule(formData);

                if (!response) {
                    throw new Error("Error creating modulo");
                }

                alert("Modulo creado con éxito");
                window.location.reload();
            } catch (error) {
                console.error("Error creating service:", error);
                alert("Error al crear el modulo");
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
            <div id="card" className="bg-black/50 hidden absolute top-0 left-0 z-20 w-full h-full rounded-md justify-center  items-center ">
                <div className="bg-white lg:w-1/2 h-max p-6 rounded-md relative">
                    <svg onClick={closeCard} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x absolute top-1 right-1.5 size-9 cursor-pointer" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    <form action="" onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-4 text-black">Crear Nuevo Modulo</h2>
                        <label htmlFor=""></label>
                        <input name="nameModule" type="text" placeholder="Nombre del Módulo" className="w-full p-2 mb-4 border border-gray-300 rounded-md"/>
                        <label htmlFor=""></label>
                        <input name="moduleRole" type="text" placeholder="Rol del Módulo" className="w-full p-2 mb-4 border border-gray-300 rounded-md"/>
                        <button type="submit" className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-md hover:bg-blue-600">Crear Módulo</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateModuleCard;