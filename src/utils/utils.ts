import axios from "axios";

export async function isLoggedIn() {
    try {
        const response = await fetch('http://localhost:3001/api/session/check', {
            method: 'GET', // Make sure this matches your backend route method
            credentials: 'include', // Needed to include cookies
        });

        if (response.ok) {
            console.log("Session is valid.");
            return true;
        } else if (response.status === 401) {
            // Here we read the response text which contains our custom message
            const errorMessage = await response.text(); // Use .json() if you're sending JSON
            console.error("Error verifying session:", errorMessage);
            return false;
        } else {
            console.error("Unexpected response from server:", response);
            return false;
        }

    } catch (error) {
        console.error("Error in isLoggedIn function:", error);
        return false;
    }
}

export async function getUser(username: string){
    
    axios.get(`/api/user?username=${encodeURIComponent(username)}`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error fetching user:', error);
    });

}