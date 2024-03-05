const API_KEY = "YKC93GCPS3gNdG00NOUU2AWHNAg";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

// async function to post the form data using FORM DATA INTERFACE
async function postForm(e) {
    const form = new FormData(document.getElementById("checksform"));
    // entries method returns an iterator allowing to go through all elements in this object
    for (let e of form.entries()) {
        console.log(e);
    }
}


// async function to display the status of the API    
async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    // getting data back
    const data = await response.json();


    if (response.ok) {
        console.log(data);
    } else {
        throw new Error(data.error);
    }
}

// func to display the status of the API
function displayStatus(data) {
    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}