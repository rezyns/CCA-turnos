import ccaLogo from "../../assets/imgs/cca.png"
import ccaVideo from "../../assets/video/cca.mp4"
import { getWaitingShifts } from "../../services/api"
import { useState, useEffect, use } from "react"

export const ShiftWindowComponent = () => {

    const [shiftsToShow, setShiftsToShow] = useState([]);

    useEffect(() => {
        const fetchWaitingShifts = async () => {
            try {
                const data = await getWaitingShifts();
                const shiftsToShow = [];
                for (let i = 0; i < 7; i++) {
                    if (data[i]) {
                        shiftsToShow.push(data[i]);
                    }                    
                }
                setShiftsToShow(shiftsToShow);
            } catch (error) {
                console.error("Error fetching waiting shifts:", error);
            }
        };

        fetchWaitingShifts();
    }, []);

    return(
        <div className=" w-dvw h-dvh bg-neutral-200 p-3">
            <header className="bg-white w-full h-max p-3 flex flex-row ">
                <div className="flex items-center">
                    <img className="size-24 bg-black rounded-md" src={ccaLogo} alt="CCA Logo" />
                    <div className="mx-3 ">
                        <h2 className="uppercase font-bold text-2xl "> Cooperativa de Caficultores de antioquia</h2>
                        <aside>Abejorral, Antioquia </aside>
                    </div>
                </div>
                <div>

                </div>
            </header>
            <div className="flex flex-row p-5 gap-2 justify-between">
                <div id="showNextShits" className="basis-1/6  ">
                    <aside className="bg-[#20C05C] text-white text-4xl font-black p-5 text-center rounded-t-md"> Proximos Turnos</aside>
                    <div className=" h-full flex flex-col text-white text-7xl font-bold ">
                        {shiftsToShow.map((shift) => (
                            <div key={shift.id} className="bg-white text-black text-center  p-3 border-b-2 border-neutral-100 flex-col">
                                <h2 className="text-5xl font-bold basis-1/2"> {shift.shift} </h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="showMedia" className="basis-7/12"> 
                    <div className="w-full h-full ">
                        <video src={ccaVideo} autoPlay loop muted className="w-full h-full rounded-md ">

                        </video>
                    </div>
                </div>
                <div id="showCurrentShits" className="basis-1/4 ">
                    <table className="w-full"> 
                        <thead>
                            <tr className="bg-blue-800 text-white text-3xl font-bold">
                                <th className="p-4">Asesor</th>
                                <th className="p-4">Turno</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <footer className="col-start-1 col-end-4 fixed bottom-0 w-dvw">
                <div className="bg-white w-full h-max p-3 flex justify-center items-center">
                    <h2 className="text-black"> Cooperativa de Caficultores de Antioquia - CCA © 2024</h2>
                </div>
            </footer>
        </div>
    )
}

export default ShiftWindowComponent;