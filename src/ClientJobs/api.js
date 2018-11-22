import request from "../Services/apiServices";

const JOBAPI = "/api/jobs/";
const JOBEMPLOYEES = JOBAPI + "employees";

export async function getJobs() {
    return request({
         url: JOBAPI,
         method: 'GET'
    })
}
export async function deleteJob(input) {
    let address = JOBAPI + input.toString();
    return request({
        url: address,
        method: "DELETE",
    })
} 

export async function editJob(input) {
    let id = input.id.toString();
    let siteName = input.siteName;
    let description = input.description;
    let address = (JOBAPI + id + "?siteName=" + siteName + "&description=" + 
                description);
    return request({
        url: address,
        method: "PUT",
    })
}

export async function createJob(input) {
    return request({
        url: JOBAPI,
        method: "POST",
        body: JSON.stringify({...input})
    })
    
}

export async function getEmployeesFromJob(input) {
    return fetch(JOBEMPLOYEES, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({...input})
    })
    .then(resp => {return ValidateHTTPStatus(resp)})
}

function ValidateHTTPStatus(resp) {
    if (!resp.ok) {
        if(resp.status >= 400 && resp.status < 500) {
            return resp.json().then(data => {
                let err = {errorMessage : data.message};
                throw err;
            });
        } else {
            let err = {errorMessage: "Server is not responding!"}
            throw err;
        }
    }
    return resp.json();
}