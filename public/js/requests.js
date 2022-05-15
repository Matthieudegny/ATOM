const requests = {

    /*request for the photo of the day*/
    photoOfTheDay: async function () {
        try{
            let response = await fetch (API_URL);
            if(response.status === 200) {
                let data = await response.json();
                /*particles animation is set off after request*/
                apps.deleteAnimationParticles();
                domModifications.photoDateSuccess(data);
                console.log("done")
            }else{
                app.problemWithRequest()
            }
        }catch(err){               
            app.problemWithRequest()
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
                apps.deleteAnimationParticles();
                modificationsDom.photoDateSuccess(data);
            }else{
                app.problemWithRequest()
            }
        }catch(err){
            app.problemWithRequest()
            console.error(err)
        }
    },

    photosInputResearch:async function (API) {
        try{

            let response = await fetch (API);
            if(response.status === 200) {
            let data = await response.json();
                if(data.collection.items.length === 0) app2.problemRequest()
                else{
                    apps.deleteAnimationParticles();
                    modificationsDom.photosInputSuccess(data);
                }
            }
            else{
                console.log("problem with request")} 
        }catch(err){
            console.error(err)
        }
    }
}
