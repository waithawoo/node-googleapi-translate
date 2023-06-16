const https = require('https');
const googleTranslateError = require('./googleTranslateError.js');

class googleApi {

    hostname = 'translation.googleapis.com';
    headers = {'Content-Type': 'application/json'};
    API_LANGUAGE_RESOURCE = 'languages';
    API_DETECT_RESOURCE = 'detect';
    API_VERSION = '2';

    #_token;
    #options;
    constructor(options) {
        this.#options = {
            hostname : this.hostname,
            ...options
        }
        this.hostname = this.#options.hostname;
        this.#_token = this.#options.token;
    }

    detect = async (text) => {
        let prefix = `/language/translate/v${this.API_VERSION}/${this.API_DETECT_RESOURCE}?key=${this.#_token}&`;
        let path = this.#buildPath(prefix, {q:text})
        try{
            const response = await this.#requestAPI(path)
            if(response.error) throw new googleTranslateError(JSON.stringify(response.error.message))
            if(response.data) return response.data.detections[0][0].language
        }catch(error){
            throw error
        }
    }
    translate = async (text, source_lang, target_lang, model = 'nmt') => {
        let prefix = `/language/translate/v${this.API_VERSION}?key=${this.#_token}&`;
        let path = this.#buildPath(prefix, {q:text,source:source_lang,target:target_lang,model:model})
        try{
            const response = await this.#requestAPI(path)
            if(response.error) throw new googleTranslateError(JSON.stringify(response.error.message))
            if(response.data) return response.data.translations[0].translatedText
        }catch(error){
            throw error
        }
    }

    getLanguages =  async (target = 'en') => {
        let prefix = `/language/translate/v${this.API_VERSION}/${this.API_LANGUAGE_RESOURCE}?key=${this.#_token}&`;
        let path = this.#buildPath(prefix, {target:target})
        try{
            const response = await this.#requestAPI(path)
            if(response.error) throw new googleTranslateError(JSON.stringify(response.error.message))
            if(response.data) return response.data.languages
        }catch(error){
            throw error
        }

    }

    #buildPath =(prefix, parameters) =>{
        let params = new URLSearchParams(parameters);
        let body = prefix+params.toString();

        return body;
    }

    #requestAPI = (path) =>{
        return new Promise((resolve, reject) => {
            const options = {
                hostname: this.hostname,
                port: 443,
                path: path,
                method: 'POST',
                headers: this.headers,
            }

            const req = https.request(options, res => {
                let data = [];

                res.on('data', chunk => {
                  data.push(chunk);
                });

                res.on('end', () => {
                  const result = JSON.parse(Buffer.concat(data).toString());
                  resolve(result);
                });
            })
            req.on('error', error => {
                throw new googleTranslateError(JSON.stringify(error))
            })
            req.end()
        });

    }
}


module.exports = googleApi
