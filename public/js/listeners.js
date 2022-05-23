const listeners = {

    dateSelected : document.querySelector("#date-selected"),
    result : document.getElementById("inputResearch"),

    init: function () {
        listeners.listsListeners();
    },

    listsListeners: function () {

        /*listener for the input research*/
        if(document.getElementById("button")){
            document.getElementById("button").addEventListener("click", () => {
                apps.clearPage()
                let resultInput = listeners.result.value
                const API =`https://images-api.nasa.gov/search?q=${resultInput}&media_type=image`
                requests.photosInputResearch(API,resultInput)   
            });

             /*in case the user want write something else in the input (after the first request), 
            at the click on it, the imput is emptied*/
            listeners.result.addEventListener("click", () => {
                listeners.result.value = "",
                apps.reloadRocket()
            });
        }else{
            /*listeners picture -> date*/
            /*listener for the photo of the day*/
            document.querySelector("#search").addEventListener("click", () => {
                /*clear the page in case already one request before*/
                apps.clearPage()
                /*launch request*/
                requests.photoOfTheDay()   
            });  

            /*listener for the date selected*/
            document.querySelector("#search-date-selected").addEventListener("click", () => {
                apps.clearPage()
                /*the value of the date selected in the input is saved*/
                let date = listeners.dateSelected.value
                /*launch request with the date as callback*/
                requests.photoDateSelected(date)  
            }); 

             /*setting add to the input date:
            min date year 1995 (Nase API guidelines) in the css
            max date setted at today
            and the value of the day as placeholder is added*/
            (function modificationValuesInputDate() {
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
                listeners.dateSelected.setAttribute("max", today);
            })

        }
            
        /*listner to go back at the header with rocket animation and then nasa logo + particles animation set on back*/
        apps.rocket.addEventListener("click", apps.launchRocket)       
    },
    
}

// when the loading is finish i launch listeners.init
document.addEventListener('DOMContentLoaded', listeners.init );