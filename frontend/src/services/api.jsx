const apiUrl = `${import.meta.env.VITE_API_URL}`;

export const getModules = async ()=> {
    try {
        const response = await fetch(`${apiUrl}/modules/`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        return data.data;

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }

}

export const getServices = async () =>{
    try {
        const response = await fetch(`${apiUrl}/services/`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        return data.data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}

export const getWaitingShifts = async () =>{
    try {
        const response = await fetch(`${apiUrl}/shifts/waiting-shifts/`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        return data.upcoming_shifts;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}

export const createShift = async (serviceId) => {
    try {
        const response = await fetch(`${apiUrl}/shifts/${serviceId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
};