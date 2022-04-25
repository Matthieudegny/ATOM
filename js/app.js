const API_KEY = 'zyfjvcZ14V0Pyci44WYJv9G8yLAGTUEed2wQJI2C'
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`

const app = {

    picture : document.querySelector("#container-picture"),
    texteContainor : document.querySelector("#container-texte"),
    title : document.querySelector("#title-img"),
    dateSelected : document.querySelector("#date-selected"),
    rocket : document.getElementById("img-rocket"),
    
    /*lanch mains methods when the js file is load*/
    init: function () {
        app.modificationValuesInputDate();
        app.addListenerToActions();
    },

    /*two listeners for two differents actions*/ 
    addListenerToActions: function () {
        /*listener for the photo of the day*/
        document.querySelector("#search").addEventListener("click", () => {
            /*clear the page in case already one request before*/
            app.clearPage()
            /*launch request*/
            app.requestActions.sendApiRequest()   
        });  
        /*listener for the selected photo*/
        document.querySelector("#search-date-selected").addEventListener("click", () => {
            app.clearPage()
            /*the value of the date selected in the input is saved*/
            let date = app.dateSelected.value
            /*launch request*/
            app.requestActions.sendApiRequestWithDate(date)  
        }); 
        /*listner to go back at input selection after request is done*/
        app.rocket.addEventListener("click", app.launchRocket)
    },
    
    /*two differents requests for two differents results*/
    requestActions: {
        /*first request for the photo of the day*/
        sendApiRequest: async function () {
            let response = await fetch (API_URL);
            let data = await response.json();
            app.useApiData(data);   
        },
        /*second request is the same than the first one with a request date added,
        the date is receive with the call back from the listener*/
        sendApiRequestWithDate: async function (date){
            let response = await fetch (API_URL + `&date=${date}`);
            let data = await response.json();
            app.useApiData(data);
        }
    },

    useApiData:function(data) {
        /*  title from data added*/
        app.title.innerHTML = data.title
        /*rocket added*/
        app.rocket.style.display = "block"
        /* img from data added*/
        app.picture.innerHTML += ` <img src="${data.url}" alt="">`
        app.addH2()
        /*explanation added*/
        app.texteContainor.innerHTML += `<p>${data.explanation}</p>`
        app.centerPage()
    },

    clearPage:function() {
        document.getElementById("particles-js").style.backgroundImage="none"
        document.getElementById("container-picture").style.height="70vh"
        app.title.innerHTML = ""
        app.texteContainor.innerHTML = ""
        app.picture.innerHTML = ""
        /*reset setting of the rocket*/
        app.reloadRocket()
    },
    
    centerPage:function() {
        app.title.scrollIntoView({behavior:"smooth",block:"start"});
    },

    addH2: function () {
        const h2 = document.createElement("h2");
        h2.innerText = "Explanations :"
        app.texteContainor.appendChild(h2)
    },

    launchRocket: function () {
        app.rocket.classList.add("animation-rocket")
        setTimeout(timeOut,1000);
        function timeOut () {
            document.getElementById("photo-day").scrollIntoView({behavior:"smooth",block:"start"})
        }
    },

    reloadRocket: function () {
        app.rocket.classList.remove("animation-rocket")
        app.rocket.style.display = "none"
    },
    /*setting add to the input date:
    min date year 1995 (Nase API guidelines) in the css
    and the value of the day as placeholder is added*/
    modificationValuesInputDate:function() {
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
        app.dateSelected.setAttribute("value", today);
        app.dateSelected.setAttribute("max", today);
    }
}

// when the loading is finish i launch app.init
document.addEventListener('DOMContentLoaded', app.init );


