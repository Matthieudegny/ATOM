const modificationsDom = {

    picture : document.querySelector("#container-picture"),
    texteContainor : document.querySelector("#container-texte"),
    title : document.querySelector("#title-img"),
    dateSelected : document.querySelector("#date-selected"),
    rocket : document.getElementById("img-rocket"),


    /*all informatiosn are receieved from data(request photo of the day and date selected),
    i use some of those informations to manipulate the DOM*/
    photoDateSuccess:function(data) {
        apps.deleteAnimationParticles();
        modificationsDom.picture.style.height = "70vh";
        /*in case there is a video in data*/
        if(data.media_type === "video") {
            console.log("ceci est une video")
            app.picture.innerHTML = `<iframe width="100%" height="100%"
            src="${data.url}">
            </iframe>`
        }
        /*title from data added*/
        modificationsDom.title.innerHTML = data.title
        /*rocket added*/
        modificationsDom.rocket.style.display = "block"
        /*img from data added*/
        modificationsDom.picture.innerHTML += ` <img src="${data.url}" alt="">`
        apps.addH2()
        /*explanation added*/
        modificationsDom.texteContainor.innerHTML += `<p>${data.explanation}</p>`
        apps.centerPage()
    },

    /*for this case after my first request i obtain an other list of json object,
    each json object contains 4 pictures with differents photos sizes,
    i limite this second request at 12,
    so after the second request i obtain 12*4 pictures,
    and i select only the small size so a max of 12 pictures( -> efficiency download)*/
    photosInputSuccess:async function (data,resultInput) {
        apps.deleteAnimationParticles();
        /*i select a max lenght of 12 pictures*/
            try{
                modificationsDom.title.textContent = `Images corresponding to "${resultInput}"`;
                for(let i = 0; i < 12; i++){
                    let response = await fetch(data.collection.items[i].href)
                    if(response.status === 200){
                        let data = await response.json();                                                         
                            for(let image of data){ 
                                if(image.includes("small")) {
                                    /*creation of the elemnts*/
                                    modificationsDom.picture.style.height = "100%";
                                    let newImage = document.createElement("div");
                                    let newContainerPicture = document.createElement("div");
                                    newImage.classList.add("images");
                                    newContainerPicture.classList.add("container-one-picture");
                                    newImage.style.backgroundImage = `url(${image})` 
                                    newContainerPicture.appendChild(newImage)
                                    document.getElementById("container-picture").appendChild(newContainerPicture)  
                                    /*rocket added*/
                                    modificationsDom.rocket.style.display = "block"
                                                  
                                } 
                            }
                    }else{
                        console.log(error)
                        modificationsDom.requestFailed()
                    }
                    /*function centerPage occur only one time*/
                    if(i===0)apps.centerPage();
                }
            }catch(err){
                console.log(err)
                modificationsDom.requestFailed()
            }
    },

    requestFailed: function(){
        apps.deleteAnimationParticles();
        modificationsDom.title.innerHTML = "Houston we have a problem, do you copy?"
        modificationsDom.rocket.style.display = "block"
        /* img from data added*/
        /*Photo by NASA on Unsplash*/
        modificationsDom.picture.innerHTML += ` <img src="/images/houston.jpg" alt="photo astronaut">`
        // modificationsDom.addH2()
        apps.addH2();
        /*explanation added*/
        modificationsDom.texteContainor.innerHTML += `<p> The research you did, seems to doesn't work, please select something else</p>`
        console.log("problem with request")
        apps.centerPage()
    },

}
