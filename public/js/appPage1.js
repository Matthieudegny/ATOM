const API_KEY = 'zyfjvcZ14V0Pyci44WYJv9G8yLAGTUEed2wQJI2C'
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`

const app = {

    picture : document.querySelector("#container-picture"),
    texteContainor : document.querySelector("#container-texte"),
    title : document.querySelector("#title-img"),
    dateSelected : document.querySelector("#date-selected"),
    rocket : document.getElementById("img-rocket"),
    elements : document.querySelectorAll(".elements"),
    
    /*lanch mains methods when the js file is load*/
    init: function () {
        app.modificationValuesInputDate();
        app.addListenerToActions();
    },

    /*every listeners in one method*/ 
    addListenerToActions: function () {
        /*listener for the photo of the day*/
        document.querySelector("#search").addEventListener("click", () => {
            /*clear the page in case already one request before*/
            app.clearPage()
            /*launch request*/
            requests.photoOfTheDay()   
        });  
        /*listener for the date selected*/
        document.querySelector("#search-date-selected").addEventListener("click", () => {
            app.clearPage()
            /*the value of the date selected in the input is saved*/
            let date = app.dateSelected.value
            /*launch request with the date as callback*/
            requests.photoDateSelected(date)  
        }); 
        /*listner to go back at input selection after request is done with rocket animation and then nasa logo + particles animation set on back*/
        app.rocket.addEventListener("click", app.rocketLaunch)
    },
    
    problemWithRequest:function(){
        app.title.innerHTML = "There is someone?"
        app.rocket.style.display = "block"
        /* img from data added*/
        /*Photo by NASA on Unsplash*/
        app.picture.innerHTML += ` <img src="/public/images/problem.jpg" alt="photo astronaut">`
        app.addH2()
        /*explanation added*/
        app.texteContainor.innerHTML += `<p>This photo seem to be unavailable, please select an other photo.</p>`
        console.log("problem with request")
        app.centerPage()
    },
    
    centerPage:function() {
        /*when the request is done a scroll to the title is activated*/
        app.title.scrollIntoView({behavior:"smooth",block:"start"});
    },

    addH2: function () {
        const h2 = document.createElement("h2");
        h2.innerText = "Explanations :"
        app.texteContainor.appendChild(h2)
    },

    rocketLaunch: function(){
        apps.launchRocket(app,"photo-day");
    },

    clearPage: function(){
        apps.clearPage(app)
    },

    /*setting add to the input date:
    min date year 1995 (Nase API guidelines) in the css
    max date setted at today
    and the value of the day as placeholder is added*/
    modificationValuesInputDate:function() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;}
         
        if (mm < 10) {
            mm = '0' + mm;} 

        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("date-today").setAttribute("value", today);
        app.dateSelected.setAttribute("max", today);
    }
}

// when the loading is finish i launch app.init
document.addEventListener('DOMContentLoaded', app.init );


