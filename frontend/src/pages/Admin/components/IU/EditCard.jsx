import { useEffect, useState } from "react";
import { getModules } from "../../../../services/api";
import { editModule, editService } from "../../../../services/api";

export const EditCard = ({ item, type, onClose }) => {
    const [modules, setModules] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (type === 'service') {
            const fetchModules = async () => {
                try {
                    const response = await getModules();
                    setModules(response);
                } catch (error) {
                    console.error("Error fetching modules:", error);
                }
            };
            fetchModules();
        }

        if (type === 'module') {
            setFormData({ name: item.name, role: item.role });
        } else if (type === 'service') {
            setFormData({ name: item.name, letter: item.word, module_id: item.module_id });
        }
    }, [item, type]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let dataToSend = {};
        if (type === 'module') {
            dataToSend = { name: formData.name, role: formData.role };
            await editModule(item.id, dataToSend);
        } else if (type === 'service') {
            dataToSend = { name: formData.name, letter: formData.letter, module_id: formData.module_id };
            await editService(item.id, dataToSend);
        }

        alert(`${type} editado con éxito`);
        window.location.reload();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-black/50 fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center">
            <div className="bg-white lg:w-1/2 h-max p-6 rounded-md relative text-black">
                <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x absolute top-1 right-1.5 size-9 cursor-pointer" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-4 text-black">Editar {type === 'module' ? 'Módulo' : 'Servicio'}</h2>
                    <input
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        value={formData.name || ''}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md "
                    />
                    {type === 'module' ? (
                        <input
                            name="role"
                            type="text"
                            placeholder="Rol"
                            value={formData.role || ''}
                            onChange={handleChange}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        />
                    ) : (
                        <>
                            <input
                                name="letter"
                                type="text"
                                placeholder="Letra del Servicio"
                                value={formData.letter || ''}
                                onChange={handleChange}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            />
                            <select
                                name="module_id"
                                value={formData.module_id || ''}
                                onChange={handleChange}
                                className="w-full p-1 rounded-sm border mb-4"
                            >
                                {modules.map((module) => (
                                    <option key={module.id} value={module.id}>{module.name}</option>
                                ))}
                            </select>
                        </>
                    )}
                    <button type="submit" className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-md hover:bg-blue-600">Editar</button>
                </form>
            </div>
        </div>
    );
};

export default EditCard;