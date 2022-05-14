const apps = {

    deleteAnimationParticles: function(){
        //setting off animation particles
        document.getElementById("particles-js").style.height = "0%"
        /*remove the NASA logo */
        document.getElementById("particles-js").style.backgroundSize = "0%"
        document.getElementById("particles-js").classList.remove("addLogoNasa")
    },

    /*reload rockect means set rockect back as initial, so display none*/
    reloadRocket: function (appObject) {
        appObject.rocket.style.opacity = "1"
        appObject.rocket.classList.remove("animation-rocket")
        appObject.rocket.style.display = "none"
    },

    /*animation at the click on the rocket, it's a scroll top page*/
    launchRocket: function (appObject,targetScroll) {
        appObject.rocket.classList.add("animation-rocket")
        /* 1s after rockect is launched the screen go back at the top of the page*/
        apps.scrollBackTopPage(targetScroll);
        /*2.3s after the rocket launched the page is reload*/
        setTimeout(reloadPage,2300)
        /*reload page means set it at initial,so:
        -animation particles + logo nasa ON
        -rocket unvisible
        -page empty*/
        function reloadPage () {
            appObject.clearPage();
            //Reload animation particles + logo nasa 
            apps.animationParticlesSetOn();
        }
    },

    /*all the elements are emptied and the rocket is set as initial*/
    clearPage:function(appObject) {
        /*in case its not the first request, i clear out everything, to start a new request with an empty page*/ 
        document.querySelectorAll(".elements").forEach(element => {
            element.innerHTML=""
        });
        /*reset setting of the rocket, so block -> none, as it was at the initial page*/
        apps.reloadRocket(appObject)
    },

    animationParticlesSetOn: function (){
         //Reload animation particles + logo nasa 
          //setting on animation particles
          document.getElementById("particles-js").style.height = "98%"
          /*put back the NASA logo */
          document.getElementById("particles-js").classList.add("addLogoNasa")
    },

    scrollBackTopPage: function (target){
        setTimeout(timeOut,1000);
        function timeOut () {
            document.getElementById(target).scrollIntoView({behavior:"smooth",block:"start"})
        }
    }

}


