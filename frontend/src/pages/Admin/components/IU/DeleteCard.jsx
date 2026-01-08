import { deleteModule, deleteService } from "../../../../services/api";

export const DeleteCard = ({ itemId, type, onClose }) => {

    const handleDelete = async () => {
        try {
            if (type === 'module') {
                await deleteModule(itemId);
            } else if (type === 'service') {
                await deleteService(itemId);
            }

            alert(`${type} eliminado con éxito`);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting item:", error);
            alert(`Error al eliminar el ${type}`);
        }
    };

    return(
        <div className="bg-black/50 fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center">
            <div className="bg-white lg:w-1/2 h-max p-6 rounded-md relative text-black">
                <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x absolute top-1 right-1.5 size-9 cursor-pointer" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
                <h2 className="text-2xl font-bold mb-4 text-black">Eliminar {type === 'module' ? 'Módulo' : 'Servicio'}</h2>
                <p className="mb-4">¿Estás seguro que deseas eliminar este {type === 'module' ? 'módulo' : 'servicio'}?</p>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2 hover:bg-gray-400">Cancelar</button>
                    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 hover:cursor-pointer">Eliminar</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCard;