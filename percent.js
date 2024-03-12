let list = new Map();

// rip getCeleryYum function my beloved o7
let netMonthlyIncome = 0;
function cbttn(e) {
    let grossMoney = e;
    document.getElementById(`inputGross`).value = grossMoney;
    document.getElementById("fed").innerHTML = `$` + Math.floor(grossMoney * 0.12);
    let fed = Math.floor(grossMoney * 0.12)
    document.getElementById("state").innerHTML = `$` + Math.floor(grossMoney * 0.07);
    let state = Math.floor(grossMoney * 0.07)
    document.getElementById("social").innerHTML = `$` + Math.floor(grossMoney * 0.062);
    let social = Math.floor(grossMoney * 0.062)
    document.getElementById("medicare").innerHTML = `$` + Math.floor(grossMoney * 0.0145);
    let medicare = Math.floor(grossMoney * 0.0145)
    document.getElementById("stateDis").innerHTML = `$` + Math.floor(grossMoney * 0.01);
    let stateDis = Math.floor(grossMoney * 0.01)
    document.getElementById("retire").innerHTML = `$` + Math.floor(grossMoney * 0.05);
    let retire = Math.floor(grossMoney * 0.05)
    document.getElementById("outputGross").innerHTML = `$` + grossMoney;
    document.getElementById("outputLost").innerHTML = `$` + (fed + state + social + medicare + stateDis + retire + 180);
    let lost = fed + state + social + medicare + stateDis + retire + 180
    document.getElementById("afterSam").innerHTML = `$` + (grossMoney - lost);
    netMonthlyIncome = grossMoney - lost;
}

document.addEventListener("DOMContentLoaded", function () {
 let elementsArray = document.querySelectorAll(".needsI");
    elementsArray.forEach(function(elem) {
        elem.addEventListener("change", function() {
            let totalNeeds = 0;
            console.log(typeof(totalNeeds));
            console.log(typeof(Number(elem.value)))// for some reason this value is a string not a number
            totalNeeds= totalNeeds+(Number(elem.value));
            console.log(totalNeeds)
            document.getElementById("totalNeeds").innerHTML = `Total %: ${Math.floor((totalNeeds/netMonthlyIncome)*100)}%`
        });
    });

    let wants = document.querySelectorAll(".wantsI");
 
    wants.forEach(function(wants) {
        wants.addEventListener("change", function() {
            let totalWants = 0;
            console.log(typeof(totalWants));
            console.log(typeof(Number(wants.value)))
            totalWants= totalWants+(Number(wants.value));
            console.log(totalWants)
            document.getElementById("totalWants").innerHTML = `Total %: ${Math.floor((totalWants/netMonthlyIncome)*100)}%`
        });
    });

    let debts = document.querySelectorAll(".debtI");
 
    debts.forEach(function(debts) {
        debts.addEventListener("change", function() {
            let totalDebts = 0;
            console.log(typeof(totalDebts));
            console.log(typeof(Number(debts.value)))
            totalDebts= totalDebts+(Number(debts.value));
            console.log(totalDebts)
            document.getElementById("totalDebts").innerHTML = `Total %: ${Math.floor((totalDebts/netMonthlyIncome)*100)}%`
            console.log(leftover);
        });
    });
    



});
let debtOut = document.getElementById("totalDebts");
let needsOut = document.getElementById("totalNeeds");
let wantsOut = document.getElementById("totalWants");
let leftover = document.getElementById("leftover");
leftover = `Money Left Over: ${netMonthlyIncome-debtOut-needsOut-wantsOut}`
















let utils = {}; //create a namespace for our utility functions

//get function to make an HTTP GET request
utils.get = (url) => {

    //start promise object
    return new Promise(function (resolve, reject) {

        //create a new XMLHttpRequest object
        let request = new XMLHttpRequest();

        //initialize the request
        request.open('GET', url);

        request.onload = function () {
            //resolve on success
            if (request.status == 200) { // HTTP: OK
                console.log('Response OK');
                resolve(request.response);
            }
            //reject on error
            else {
                reject(Error(`promise error with ${request.status}`))
            }
        };
        //handle network errors
        request.onerror = function (error) {
            reject(Error(`Network Error with ${url}: ${error}`))
        };
        //send the request
        request.send();
    }); //end Promise Object
}

//getJSON function to get JSON data from the server
utils.getJSON = async function (url) {
    let string = null;
    //get the JSON string from the server
    try {
        string = await utils.get(url);
    }
    catch (error) {
        console.log(error)
    }
    //parse the JSON string and return the data
    let data = JSON.parse(string);
    return data;
}

async function init() {
    //get the root element of the web page
    let root = document.querySelector('#career2electricboogaloo');

    //create a variable to hold the URL of the JSON data source
    let url = 'https://eecu-data-server.vercel.app/data/2024';

    //create a variable to hold the JSON data
    let occupations = null;

    //try to retrieve the JSON data from the server
    try {
        //retrieve the JSON data from the server
        occupations = await utils.getJSON(url);
    }
    //catch any errors and display them in the root element
    catch (error) {
        root.style.color = 'red';
        root.textContent = `error: ${error}`;
    }

    //show JSON data on the html page
    root.innerHTML = buildList(occupations);
}

function buildList(jobs) {
    //create an empty string to hold the HTML
    let html = '';

    //loop through the array of job objects retrieved from the JSON data
    for (let job of jobs) {

        //start an HTML section for each job
        html += `<button class = "bttn" onclick="cbttn(${job.salary})">${job.occupation}</button>`


        /* An alternative way of looping through each item in the data, not as useful for this assignment but something to keep in mind for a story? ... */
        //loop through each entry and create a div for each key:value pair
        // for (let key in job) {
        //     html += `<div><strong>${key}</strong>: ${job[key]}</div > `;
        // }

        //create a div element for the job title
  
        //create a div element for the salary and format it as currency

        // document.getElementById(`inputGross`).value = job.salary;//.toLocaleString('en-US');
        // html += `<div><strong>Salary</strong>: $${job.salary.toLocaleString('en-US')}</div>`; AGAHGAGHAHGAHGJAWGUHJAWHJABGVDWHJ poop



        //close the section
       
    }

    //return the completed html
    return html;
}
//initialize the web page when the DOM is ready
document.addEventListener('DOMContentLoaded', init);