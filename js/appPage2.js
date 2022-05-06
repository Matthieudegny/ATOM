const app2 = {

    objects:{
        result : document.getElementById("inputResearch"),
        button : document.getElementById("button"),
        containerPictures : document.getElementById("container-pictures")
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
    },

    requestAction2:{
        sendApiRequestInput: async function (API) {
            let response = await fetch (API);
            let data = await response.json();
            if(data){
                console.log(data)
                if(data.collection.items.length === 0) app2.problemRequest()
                app2.useAPIdata2(data);}
            
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

    clearContainerPictures: function() {
        app2.objects.containerPictures.innerHTML = ""
    },

    problemRequest: function () {
        window.alert("please write something else")
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
