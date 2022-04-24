const API_KEY = 'zyfjvcZ14V0Pyci44WYJv9G8yLAGTUEed2wQJI2C'
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`

// &date=2021-02-05

//Add en event listener to the button that runs the function sendApiRequest when it is clicked
const searchButton = document.querySelector("#search")
const searchButtonRange = document.querySelector("#search-photo-range")
const valueDate =document.querySelector("#start")
const picture = document.querySelector("#container-picture")
const texte = document.querySelector("#container-texte")
const title = document.querySelector("#title-img")

console.log(searchButtonRange)

searchButton.addEventListener("click", () => {
    console.log("button presses")
    sendApiRequest()
})

searchButtonRange.addEventListener("click", () => {
    
    let date = start.value
    console.log(date)
    sendApiRequestRange(date)
})

async function sendApiRequest(){
    let response = await fetch (API_URL)
    console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)
}

async function sendApiRequestRange(date){
    console.log(date)
    let response = await fetch (API_URL + `&date=${date}`)
    console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)
}




function useApiData(data) {
    title.innerHTML = data.title
    texte.innerHTML = data.explanation
    picture.innerHTML += ` <img src="${data.url}" alt="">`
    
}
