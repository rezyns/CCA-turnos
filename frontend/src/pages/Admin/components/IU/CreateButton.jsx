export const CreateButton = () => {
    
    const handleClick = () => {
        console.log("click");
        const card = document.getElementById("card");
        card.style.display = "flex";
    }

    return(
        <>
            <button onClick={handleClick} className="bg-[#007bff] font-bold text-white px-4 py-2 rounded-md mx-2 cursor-pointer hover:bg-[#0056b3] ">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 1 .5.5v4h4a.5.5 0 0 1 0 1h-4v4a.5.5 0 0 1-1 0v-4h-4a.5.5 0 0 1 0-1h4v-4a.5.5 0 0 1 .5-.5z"/>
                </svg>
            </button>
        </>
    )
}

export default CreateButton;