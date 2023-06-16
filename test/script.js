let googleApi = require("googleapi-translate")

let googleTranslation = new googleApi({token: 'This is token'})

googleTranslation.translate("hello", "en", "ja").then((res)=>{
    console.log(res);
})

googleTranslation.detect("hello").then((res)=>{
    console.log(res);
})

googleTranslation.getLanguages().then((res)=>{
    console.log(res);
})