const API_KEY = 'zyfjvcZ14V0Pyci44WYJv9G8yLAGTUEed2wQJI2C'
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`

const requests = {

    /*request for the photo of the day*/
    photoOfTheDay: async function () {
        try{
            let response = await fetch (API_URL);
            if(response.status === 200) {
                let data = await response.json();
                modificationsDom.photoDateSuccess(data);
            }else{
                modificationsDom.requestFailed()
            }
        }catch(err){               
            modificationsDom.requestFailed()
            console.error(err)
        }
    },

    /*request for the photo with a date selected, the date object is recieved in the call back function*/
    photoDateSelected:async function (date){
        try{
            let response = await fetch (API_URL + `&date=${date}`);
            if(response.status === 200){
                let data = await response.json();
                /*particles animation is set off after request*/
                modificationsDom.photoDateSuccess(data);
            }else{
                modificationsDom.requestFailed()
            }
        }catch(err){
            modificationsDom.requestFailed()
            console.error(err)
        }
    },

    /*request pictures with the input research*/
    photosInputResearch:async function (API,resultInput) {
        try{

            let response = await fetch (API);
            if(response.status === 200) {
            let data = await response.json();
                if(data.collection.items.length === 0) modificationsDom.requestFailed()
                else{
                    modificationsDom.photosInputSuccess(data,resultInput);
                }
            }
            else{
                modificationsDom.requestFailed()
                console.log("problem with request")} 
        }catch(err){
            modificationsDom.requestFailed()
            console.error(err)
        }
    }
}
