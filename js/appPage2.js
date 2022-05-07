const app2 = {

    objects:{
        result : document.getElementById("inputResearch"),
        button : document.getElementById("button"),
        containerPictures : document.getElementById("container-pictures"),
        rocket : document.getElementById("img-rocket")
    },

    init:function () {
        app2.listener()
    },

    listener: function(){
        app2.objects.result.addEventListener("click", () => {
            app2.objects.result.value = ""
        })

        app2.objects.button.addEventListener("click", () => {
            app2.clearContainerPictures()
            let {result} = app2.objects
            result = result.value
            const API =`https://images-api.nasa.gov/search?q=${result}&media_type=image`
            app2.requestAction2.sendApiRequestInput(API)
        })

         /*listner to go back at input selection after request is done*/
         app2.objects.rocket.addEventListener("click", app2.launchRocket)
    },

    requestAction2:{
        sendApiRequestInput: async function (API) {
            let response = await fetch (API);
            let data = await response.json();
            if(data){
                console.log(data)
                    if(data.collection.items.length === 0) app2.problemRequest()
                    else{
                        app2.deleteAnimationParticles();
                        app2.useAPIdata2(data);
                        }
                    }
            
            else{
                console.log("problem with request")} 
        }
    },

    useAPIdata2:function (data) {
        for(let i = 0; i < 15; i++){

            fetch(data.collection.items[i].href)
            .then(res=>{
                if(res.ok){
        
                    res.json().then(data=>{
                        
                        for(let image of data){ 
                            if(image.includes("small")) {
                                let newImage = document.createElement("div");
                                let newContainerPicture = document.createElement("div");
                                newImage.classList.add("images");
                                newContainerPicture.classList.add("container-one-picture");
                                // newImage.innerHTML = `<img src="${image}" alt="">`
                                newImage.style.backgroundImage = `url(${image})` 
                                newContainerPicture.appendChild(newImage)
                                document.getElementById("container-pictures").appendChild(newContainerPicture)
                                app2.objects.rocket.style.display = "block";
                            }else{
                                app2.problemRequest
                            }

                        }
                    })
                }else{
                    console.log(error)
                    app2.problemRequest
                }
            })
        }
    },

    //commun
    deleteAnimationParticles: function(){
        //setting off animation particles
        document.getElementById("particles-js").style.height = "0%"
        /*remove the NASA logo when the request is done*/
        document.getElementById("particles-js").style.backgroundSize = "0%"
        document.getElementById("particles-js").classList.remove("addLogoNasa")
    },

    clearContainerPictures: function() {
        app2.objects.containerPictures.innerHTML = ""
    },

    problemRequest: function () {
        window.alert("please write something else")
    },

    //commun
    launchRocket: function () {
        app2.objects.rocket.classList.add("animation-rocket")
        /*after rockect is launched the screen go back to the form at the top of the page*/
        setTimeout(timeOut,1000);
        function timeOut () {
            document.getElementById("particles-js").scrollIntoView({behavior:"smooth",block:"start"})
        }
        setTimeout(rocketDisappear,2300)
        function rocketDisappear () {
            app2.objects.rocket.style.opacity = "0"
            app2.clearPage2()
            //Reload animation particles + logo nasa 
            //setting on animation particles
            document.getElementById("particles-js").style.height = "100%"
            /*put back the NASA logo */
            document.getElementById("particles-js").classList.add("addLogoNasa")
            console.log("ok")
        }
    },

    reloadRocket: function () {
        app2.objects.rocket.style.opacity = "1"
        app2.objects.rocket.classList.remove("animation-rocket")
        app2.objects.rocket.style.display = "none"
    },

    clearPage2: function(){
        document.getElementById("container-pictures").innerHTML = "";
        app2.reloadRocket()
    }
}

// when the loading is finish i launch app.init
document.addEventListener('DOMContentLoaded', app2.init );

// button.addEventListener("click", () => {
//    const researchToDo = result.value
//    const API =`https://images-api.nasa.gov/search?q=sun&media_type=image`
   
   
// .then(res=>res.json())
// .then(data => console.log(data))

// .then(res => {
//     if(res.ok){
//         res.json().then(data=> {
            
            
//             for(let i = 0; i < 10; i++){

//                 fetch(data.collection.items[i].href)
//                 .then(res=>{
//                     if(res.ok){
//                     res.json().then(data=>{
//                         for(let image of data){ //{console.log(image)}
//                         if(image.includes("small")) {
//                             let newDiv = document.createElement("div");
//                             newDiv.classList.add("images")
//                             newDiv.innerHTML = `<img src="${image}" alt="">`
//                             document.getElementById("body").appendChild(newDiv)
//                         }
//                         }
//                         console.log("espace")
//                     })
//                 }
//             })
//             }

            
           
//         })
//     }
// })
