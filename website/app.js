/* Global Variables */
//Declare constans to hold the api key and the url .
const apiKey = "&appid=c37432691da77768cb4ac27d9933ef6d&units=imperial";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS.
let d = new Date();
let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();//add '1' to the month to get the correct date.

//getElement to check if it is click or not.
document.getElementById('generate').addEventListener('click', () => {
    const zip = document.getElementById('zip').value;
    console.log(zip);//try if the zipCode working in  the console.
    const userInput = document.getElementById('feelings').value;
    console.log(userInput);
    getData(baseUrl, zip, apiKey)//callback the function.
        .then(function (data) {
            postData('/addData', { temp: data.main.temp, date: newDate, feelings: userInput });
        }).then(() => {
            updateUi();
        });
});

//async get function
const getData = async (baseUrl, zip, apiKey) => {
    const res = await fetch(baseUrl + zip + apiKey);
    try {
        const myData = await res.json();
        console.log(myData);//to print it in the console for debugging.
        return myData;
    } catch (err) {
        console.log("the error is :", err);//Handle if there an error.
    }

};
//async postData function.
const postData = async (url = "", data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        "method": "POST",
        "credentials": "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // Body data type must match "Content-Type" header   
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (err) {
        console.log("the error is :", err)//Handling the error.
    }

};

//asunc updateUi function.
const updateUi = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        //update the Html with the data that get from `allData`.
        document.getElementById('temp').innerHTML = `Temperature:${allData.Temperature}`;
        document.getElementById('date').innerHTML = `Date:${allData.Date}`;
        document.getElementById('content').innerHTML = `Feelings:${allData.Feelings}`;
    }

    catch (err) {
        console.log("the error is :", err); //Handling the error


    }

};
