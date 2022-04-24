const app = {
    test : "ok",
    API_KEY : 'zyfjvcZ14V0Pyci44WYJv9G8yLAGTUEed2wQJI2C',
    
}



const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${app.API_KEY}`

// &date=2021-02-05
console.log(app.test)
//Add en event listener to the button that runs the function sendApiRequest when it is clicked
const searchButton = document.querySelector("#search")
const searchButtonRange = document.querySelector("#search-photo-range")
const valueDate =document.querySelector("#start")
const picture = document.querySelector("#container-picture")
const texte = document.querySelector("#container-texte")
const title = document.querySelector("#title-img")
const dateSelected = document.querySelector("#date-selected")



searchButton.addEventListener("click", () => {
    clearPage()
    sendApiRequest()
    title.scrollIntoView({behavior:"smooth"});
   
})

searchButtonRange.addEventListener("click", () => {
    clearPage()
    picture.scrollIntoView();
    let date = dateSelected.value
    sendApiRequestRange(date)
    
    
})

async function sendApiRequest(){
    let response = await fetch (app.API_URL);
    let data = await response.json();
    useApiData(data);
    setTimeout(centerPage,100);
   
}

async function sendApiRequestRange(date){
    let response = await fetch (app.API_URL + `&date=${date}`);
    let data = await response.json();
    useApiData(data);
}

function useApiData(data) {
    centerPage();
    title.innerHTML = data.title
    texte.innerHTML = data.explanation
    picture.innerHTML = ` <img src="${data.url}" alt="">` 
    if (picture){
        setTimeout(centerPage,400);
    }
}

function clearPage(){
    centerPage();
    title.innerHTML = ""
    texte.innerHTML = ""
    picture.innerHTML = ""
}

function centerPage(){
    title.scrollIntoView({behavior:"smooth",block:"start"});
}

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();

if (dd < 10) {
   dd = '0' + dd;
}

if (mm < 10) {
   mm = '0' + mm;
} 
    
today = yyyy + '-' + mm + '-' + dd;
dateSelected.setAttribute("value", today);
dateSelected.setAttribute("max", today);