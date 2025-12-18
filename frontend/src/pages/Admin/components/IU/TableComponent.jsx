import {OptionButtons} from "./OptionButtons";
import {CreateButton} from "./CreateButton";

export const TableComponent = ({title, headers, data}) => {
    return(
        <div className="w-full h-max mt-5 p-3 text-white">
            <h2 className="font-bold w-full text-left text-3xl"> {title } <CreateButton /> </h2>
            <table className="border border-white  mt-3 rounded-2xl min-w-11/12">
                <thead>
                    <tr className="border border-white bg-neutral-800">
                        {headers.map((header, index) => (
                            <th key={index} className="border border-white p-2"> {header} </th>
                        ))}
                        <th> Acciones </th>
                    </tr>
                </thead>
                <tbody className="bg-neutral-900">
                    {data.map((item, index) => (
                        <tr key={index} className="">
                            <td className="border border-white text-center p-5"> {item.name} </td>
                            <td className="border border-white text-center p-5">{ item.role ? item.role : item.word}</td>
                            <td className="border border-white text-center">
                                <OptionButtons />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent;