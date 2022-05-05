// "https://images-api.nasa.gov/search?q=pesquet&media_type=image"
// var myHeaders = new Headers();
// var myInit = { method: 'GET',
//                headers: myHeaders,
//                mode: 'cors',
//                cache: 'default' };
const app = {

    objects:{
        
    }



}
const result = document.getElementById("inputResearch")
const button = document.getElementById("button")

button.addEventListener("click", () => {
   const researchToDo = result.value
   const API =`https://images-api.nasa.gov/search?q=${researchToDo}&media_type=image`
   
   fetch(API)
// .then(res=>res.json())
// .then(data => console.log(data))

.then(res => {
    if(res.ok){
        res.json().then(data=> {
            
            
            for(let i = 0; i < 10; i++){

                fetch(data.collection.items[i].href)
                .then(res=>{
                    if(res.ok){
                    res.json().then(data=>{
                        for(let image of data){ //{console.log(image)}
                        if(image.includes("small")) {
                            let newDiv = document.createElement("div");
                            newDiv.classList.add("images")
                            newDiv.innerHTML = `<img src="${image}" alt="">`
                            document.getElementById("body").appendChild(newDiv)
                        }
                        }
                        console.log("espace")
                    })
                }
            })
            }

            
           
        })
    }
})
})