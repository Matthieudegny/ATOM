const modificationsDom = {

    /*all informatiosn are receieved from data(request photo of the day and date selected),
    i use some of those informations to manipulate the DOM*/
    photoDateSuccess:function(data) {
        /*in case there is a video in data*/
        if(data.media_type === "video") {
            console.log("ceci est une video")
            app.picture.innerHTML = `<iframe width="100%" height="100%"
            src="${data.url}">
            </iframe>`
        }
        /*title from data added*/
        app.title.innerHTML = data.title
        /*rocket added*/
        app.rocket.style.display = "block"
        /*img from data added*/
        app.picture.innerHTML += ` <img src="${data.url}" alt="">`
        app.addH2()
        /*explanation added*/
        app.texteContainor.innerHTML += `<p>${data.explanation}</p>`
        app.centerPage()
    },

    /*for this case after my first request i obtain an other json object,
    the json object contains 4 pictures with differents photos sizes,
    so after the second request i obtain those four photos,
    i limite this second request at 12,
    and i select only the small size ( -> efficiency download)*/
    photosInputSuccess:async function (data) {
        /*i select a max lenght of 12 pictures*/
        for(let i = 0; i < 12; i++){
            try{
                let response = await fetch(data.collection.items[i].href)
                if(response.status === 200){
                    let data = await response.json();                                                      
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

}
console.log("ok")