const app2 = {

    result : document.getElementById("inputResearch"),
    button : document.getElementById("button"),
    containerPictures : document.getElementById("container-pictures"),
    rocket : document.getElementById("img-rocket"),

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
            app2.clearPage()
            let resultInput = app2.result.value
            const API =`https://images-api.nasa.gov/search?q=${resultInput}&media_type=image`
            requests.photosInputResearch(API)
        })

         /*listner on the rocket -> to go back at input selection after request is done*/
         app2.rocket.addEventListener("click", app2.rocketLaunch)
    },

    problemRequest: function () {
        window.alert("please write something else")
        app2.rocketLaunch()
    },

    rocketLaunch: function(){
        apps.launchRocket(app2,"particles-js");
    },

    clearPage: function(){
        apps.clearPage(app2)
    },
}

// when the loading is finish i launch app.init
document.addEventListener('DOMContentLoaded', app2.init );
