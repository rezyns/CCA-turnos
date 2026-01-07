import {DeleteButtonComponent} from "./DeleteButton.jsx";
import {CreateButton} from "./CreateButton";
import EditButtonComponent from "../IU/EditButton.jsx";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard.jsx";
import { useState } from "react";

export const TableComponent = ({title, headers, data}) => {
    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);


    const type = title.toLowerCase().includes('modulo') ? 'module' : 'service';

    const handleEdit = (item) => {
        setEditItem(item);
        setShowEdit(true);
    };

    const handleDelete = (itemId) => {
        setShowDelete(true);
        setDeleteItemId(itemId);
    }

    const closeEdit = () => {
        setShowEdit(false);
        setEditItem(null);
    };

    const closeDelete = () => {
        setShowDelete(false);
        setDeleteItemId(null);
    }

    return(
        <div className="w-full mt-5 p-3 text-white">
            <h2 className="font-bold w-full text-left text-3xl">
                {title} <CreateButton />
            </h2>

        <div className="max-h-96 overflow-y-auto mt-5 scrollbar scrollbar-thumb-[#007bff] scrollbar-track-transparent scrollbar-track-rounded-full">
            <table className="rounded-2xl w-11/12 p-0">
            <thead>
                <tr>
                {headers.map((header, index) => (
                    <th key={index} className="sticky top-0 bg-neutral-900 text-left px-5 py-4 z-10" >
                    {header}
                    </th>
                ))}
                <th className="sticky top-0 bg-neutral-900 z-10">
                    Acciones
                </th>
                </tr>
            </thead>
            <tbody className="bg-neutral-800">
                {data.map((item, index) => (
                <tr key={index}>
                    <td className="border-b border-t border-neutral-700 p-4"> {item.name} </td>
                    <td className="border-b border-t border-neutral-700 p-4"> {item.role ? item.role : item.word} </td>
                    <td className="border-b border-t border-neutral-700 p-4 flex">
                        <EditButtonComponent onClick={() => handleEdit(item)} />
                        <DeleteButtonComponent onClick={() => handleDelete(item.id)}  />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        {showEdit && <EditCard item={editItem} type={type} onClose={closeEdit} />}
        {showDelete && <DeleteCard itemId={deleteItemId} type={type} onClose={closeDelete} />}
        </div>

    )
}

export default TableComponent;