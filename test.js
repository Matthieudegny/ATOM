const API_KEY = 'zyfjvcZ14V0Pyci44WYJv9G8yLAGTUEed2wQJI2C'
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`

const app = {

    picture : document.querySelector("#container-picture"),
    texte : document.querySelector("#container-texte"),
    title : document.querySelector("#title-img"),
    dateSelected : document.querySelector("#date-selected"),
    
    init: function () {
        app.modificationValuesInputDate();
        app.addListenerToActions();
    },

    addListenerToActions: function () {
        document.querySelector("#search").addEventListener("click", () => {
            app.clearPage()
            app.requestActions.sendApiRequest()   
        });  

        document.querySelector("#search-date-selected").addEventListener("click", () => {
            app.clearPage()
            app.picture.scrollIntoView();
            let date = app.dateSelected.value
            app.requestActions.sendApiRequestWithDate(date)
        }); 
    },

    requestActions: {
        sendApiRequest: async function () {
            let response = await fetch (API_URL);
            let data = await response.json();
            app.useApiData(data);   
        },

        sendApiRequestWithDate: async function (date){
            let response = await fetch (API_URL + `&date=${date}`);
            let data = await response.json();
            app.useApiData(data);
        }
    },

    useApiData:function(data) {
        app.title.innerHTML = data.title
        app.texte.innerHTML = data.explanation
        app.picture.innerHTML = ` <img src="${data.url}" alt="">` 
        app.picture.addEventListener('DOMContentLoaded', app.centerPage() )
    },

    clearPage:function() {
        app.title.innerHTML = ""
        app.texte.innerHTML = ""
        app.picture.innerHTML = ""
    },

    centerPage:function() {
        app.title.scrollIntoView({behavior:"smooth",block:"start"});
    },

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

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );