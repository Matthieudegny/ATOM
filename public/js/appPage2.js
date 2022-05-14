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
            app2.requestAction2.sendApiRequestInput(API)
        })

         /*listner on the rocket -> to go back at input selection after request is done*/
         app2.rocket.addEventListener("click", app2.rocketLaunch)
    },

    requestAction2:{
        sendApiRequestInput: async function (API) {
            try{

                let response = await fetch (API);
                if(response.status === 200) {
                let data = await response.json();
                    if(data.collection.items.length === 0) app2.problemRequest()
                    else{
                        apps.deleteAnimationParticles();
                        app2.useAPIdata2(data);
                    }
                }
                else{
                    console.log("problem with request")} 
            }catch(err){
                console.error(err)
            }
        }
    },

    useAPIdata2:async function (data) {
        /*i select a max lenght of 12 pictures*/
        for(let i = 0; i < 12; i++){
            try{
                /*after my first request i obtain an other json object, so i add an other request to this second json object, and i target directly the images*/
                let response = await fetch(data.collection.items[i].href)
                if(response.status === 200){
                    let data = await response.json();
                    console.log(data)                                                       
                        for(let image of data){ 
                            if(image.includes("small")) {
                                /*creation of the elemnts*/
                                let newImage = document.createElement("div");
                                let newContainerPicture = document.createElement("div");
                                newImage.classList.add("images");
                                newContainerPicture.classList.add("container-one-picture");
                                newImage.style.backgroundImage = `url(${image})` 
                                newContainerPicture.appendChild(newImage)
                                document.getElementById("container-pictures").appendChild(newContainerPicture)
                                /*make appear the rocket, none->block*/
                                app2.rocket.style.display = "block";
                            }else{
                                app2.problemRequest
                            }
                        }
                }else{
                    console.log(error)
                    app2.problemRequest
                }
            }catch(err){
                console.error(err)
            }
        }
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
