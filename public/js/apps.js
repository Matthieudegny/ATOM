const apps = {

    rocket : document.getElementById("img-rocket"),

    /*all the elements are emptied and the rocket is set as initial*/
    clearPage:function() {
        modificationsDom.picture.style.height = "10vh";
        /*in case its not the first request, i clear out everything, to start a new request with an empty page*/ 
        document.querySelectorAll(".elements").forEach(element => {
            element.innerHTML=""
        });
    },

    /*reload rockect means set rockect back as initial, so display none*/
    reloadRocket: function () {
        apps.rocket.style.opacity = "1"
        apps.rocket.classList.remove("animation-rocket")
        apps.rocket.style.display = "none"
    },

    /*animation at the click on the rocket, it's a scroll top page*/
    launchRocket: function () {
        /*if the animation is activated on the page2, the input value is emptied*/
        if(document.getElementById("button")) listeners.result.value = "";
        apps.rocket.classList.add("animation-rocket")
        /* 1s after rockect is launched, the screen go back at the top of the page*/
        apps.scrollBackTopPage();
        /*2.3s after the rocket is launched, the page is reload*/
        setTimeout(reloadPage,2300)
        /*reload page means set it at initial,so:
        -page empty
        -rocket unvisible
        -animation particles + logo nasa ON*/
        function reloadPage () {
            apps.clearPage();
            /*reset setting of the rocket, so block -> none, as it was at the initial page*/
            apps.reloadRocket()
            //Reload animation particles + logo nasa 
            apps.animationParticlesSetOn();
        }
    },

    centerPage:function() {
        /*when the request is done a scroll to the title is activated*/
        modificationsDom.title.scrollIntoView({behavior:"smooth",block:"start"});
    },

    scrollBackTopPage: function (){
        setTimeout(timeOut,1000);
        function timeOut () {
            document.querySelector("header").scrollIntoView({behavior:"smooth",block:"start"})
        }
    },

    addH2: function () {
        const h2 = document.createElement("h2");
        h2.innerText = "Explanations :"
        modificationsDom.texteContainor.appendChild(h2)
    },

    animationParticlesSetOn: function (){
         //Reload animation particles + logo nasa 
          //setting on animation particles
          document.getElementById("particles-js").style.height = "98%"
          /*put back the NASA logo */
          document.getElementById("particles-js").classList.add("addLogoNasa")
    },

    deleteAnimationParticles: function(){
        //setting off animation particles
        document.getElementById("particles-js").style.height = "0%"
        /*remove the NASA logo */
        document.getElementById("particles-js").style.backgroundSize = "0%"
        document.getElementById("particles-js").classList.remove("addLogoNasa")
    },


}


