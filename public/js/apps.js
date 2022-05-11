const apps = {

    deleteAnimationParticles: function(){
        //setting off animation particles
        document.getElementById("particles-js").style.height = "0%"
        /*remove the NASA logo when the request is done*/
        document.getElementById("particles-js").style.backgroundSize = "0%"
        document.getElementById("particles-js").classList.remove("addLogoNasa")
    },

    reloadRocket: function () {
        app.rocket.style.opacity = "1"
        app.rocket.classList.remove("animation-rocket")
        app.rocket.style.display = "none"
    },
}

