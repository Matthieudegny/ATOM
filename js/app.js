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

    /*every listeners in one method*/ 
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
            /*launch request with the date as callback*/
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
            if(data){
                app.deleteAnimationParticles();
                app.useApiData(data) 
               
            }else{
                app.problemWithRequest()
                console.log("problem with request")} 
        },
        /*second request is the same than the first one with a request date added,
        the date is receive with the call back from the listener*/
        sendApiRequestWithDate: async function (date){
            let response = await fetch (API_URL + `&date=${date}`);
            let data = await response.json();
            if(data){
                app.deleteAnimationParticles();
                app.useApiData(data);
                
            }else{
                app.problemWithRequest()
                console.log("problem with request")}
        }
    },

    /*creation of the article*/
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

    deleteAnimationParticles: function(){
        //setting off animation particles
        document.getElementById("particles-js").style.height = "0%"
        /*remove the NASA logo when the request is done*/
        document.getElementById("particles-js").style.backgroundSize = "0%"
        document.getElementById("particles-js").classList.remove("addLogoNasa")
    },

    clearPage:function() {
        /*creation of a container to receive the picture, indeed the container 
        make the method centerPage works in case the request (for the picture) take some time to load
        and make lagg the scroll*/
        document.getElementById("container-picture").style.height="70vh"
        app.title.innerHTML = ""
        app.texteContainor.innerHTML = ""
        app.picture.innerHTML = ""
        /*reset setting of the rocket*/
        app.reloadRocket()
    },

    problemWithRequest:function(){
        app.title.innerHTML = "There is someone?"
        app.rocket.style.display = "block"
        /* img from data added*/
        app.picture.innerHTML += ` <img src="/houston.jpg" alt="photo astronaut">`
        app.addH2()
        /*explanation added*/
        app.texteContainor.innerHTML += `<p>This photo seem to be unavailable, please select an other photo.</p>`
        app.centerPage()
    },
    
    centerPage:function() {
        /*when the request is done a scroll to the title is done*/
        app.title.scrollIntoView({behavior:"smooth",block:"start"});
    },

    addH2: function () {
        const h2 = document.createElement("h2");
        h2.innerText = "Explanations :"
        app.texteContainor.appendChild(h2)
    },

    launchRocket: function () {
        app.rocket.classList.add("animation-rocket")
        /*after rockect is launched the screen go back to the form at the top of the page*/
        setTimeout(timeOut,1000);
        function timeOut () {
            document.getElementById("photo-day").scrollIntoView({behavior:"smooth",block:"start"})
        }
        setTimeout(rocketDisappear,2300)
        function rocketDisappear () {
            app.rocket.style.opacity = "0"
            app.clearPage()
            //Reload animation particles + logo nasa 
            //setting on animation particles
            document.getElementById("particles-js").style.height = "100%"
            /*put back the NASA logo */
            document.getElementById("particles-js").classList.add("addLogoNasa")
        }
    },

    reloadRocket: function () {
        app.rocket.style.opacity = "1"
        app.rocket.classList.remove("animation-rocket")
        app.rocket.style.display = "none"
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


