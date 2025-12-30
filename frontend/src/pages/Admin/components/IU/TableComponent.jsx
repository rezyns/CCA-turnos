import {OptionButtons} from "./OptionButtons";
import {CreateButton} from "./CreateButton";

export const TableComponent = ({title, headers, data}) => {
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
                    <td className="border-b border-t border-neutral-700 text-center">
                    <OptionButtons />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>

    )
}

export default TableComponent;