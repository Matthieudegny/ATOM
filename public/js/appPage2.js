const app2 = {

    result : document.getElementById("inputResearch"),
    button : document.getElementById("button"),

    init:function () {
        app2.listener()
    },

    listener: function(){
        /*in case the user want write something else in the input (after the first request), 
        at the click on it, the imput is emptied*/
        app2.result.addEventListener("click", () => {
            app2.result.value = ""
        })

        /*at the click on the button,
        -the page is emptied
        -logo nasa + particles animation are set off
        -the request is done
        -rocket is set visible at the bottom of the page*/
        app2.button.addEventListener("click", () => {
            apps.clearPage()
            let resultInput = app2.result.value
            const API =`https://images-api.nasa.gov/search?q=${resultInput}&media_type=image`
            requests.photosInputResearch(API,resultInput)
        })

         /*listner on the rocket -> to go back at input selection after request is done*/
         apps.rocket.addEventListener("click", apps.launchRocket)
    },
}

// when the loading is finish i launch app.init
document.addEventListener('DOMContentLoaded', app2.init );
