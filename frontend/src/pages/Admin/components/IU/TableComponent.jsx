
export const TableComponent = ({title}) => {
    return(
        <div className="w-full h-max flex flex-col items-center mt-5 p-3 text-white">
            <h2 className="font-bold w-full text-left text-2xl"> {title} </h2>

            <table className="border border-white lg:h-92 w-11/12 mt-3 rounded-2xl">
                <thead>
                    <tr className=" rounded-xs border border-white">
                        <th colspan="6" className="py-5 bg-neutral-800">Header 1</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td className="p-2 bg-neutral-900 opacity-90"> Info 1</td>
                        <td className="p-2 bg-neutral-900 opacity-90"> Info 1</td>
                        <td className="p-2 bg-neutral-900 opacity-90"> Info 1</td>
                        <td className="p-2 bg-neutral-900 opacity-90"> Info 1</td>
                        <td className="p-2 bg-neutral-900 opacity-90"> Info 1</td>
                        <td className="p-2 bg-neutral-900 opacity-90"> Info 1</td>

                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent;