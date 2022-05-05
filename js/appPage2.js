
// var myHeaders = new Headers();
// var myInit = { method: 'GET',
//                headers: myHeaders,
//                mode: 'cors',
//                cache: 'default' };
const app2 = {

    objects:{
        result : document.getElementById("inputResearch"),
        button : document.getElementById("button")
    },

    init:function () {
        app2.listener()
    },

    listener: function(){
        button.addEventListener("click", async () => {
            let {result} = app2.objects
            result = result.value
            const API =`https://images-api.nasa.gov/search?q=${result}&media_type=image`
            let response = await fetch ("https://images-api.nasa.gov/search?q=sun&media_type=image");
            let data = await response.json();
            if(data){
                console.log(data);}
            
            else{
                console.log("problem with request")} 

        })
    },

   


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
