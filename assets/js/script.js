const API_KEY = "YKC93GCPS3gNdG00NOUU2AWHNAg";
const API_URL = "https://ci-jshint.herokuapp.com/api";

let resultsModal;

document.addEventListener("DOMContentLoaded", (e) => {
    resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));
});

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

// async function to post the form data using FORM DATA INTERFACE
async function postForm(e) {

    const form = new FormData(document.getElementById("checksform"));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });

    const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        throw new Error(data.error);
    }

}


// async function to display the status of the API    
async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    // getting data back
    const data = await response.json();


    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

// func to display the errors
function displayErrors(data) {
    console.log('displayErrors called with data:', data);
//  set content for the modal
    let results = "";

    let heading = `JSHint Results for ${data.file}`;
    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}:</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }
// set heading, results and show the modal
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
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