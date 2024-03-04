const API_KEY = "YKC93GCPS3gNdG00NOUU2AWHNAg";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

// async function to display the status of the API    
async function getStatus(e) {

    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    // getting data back
    const data = await response.json();


    if (response.ok) {
        console.log(data.expiry);
    }

}