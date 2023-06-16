# Node Google API Translation

## To translate languages with Google Translation API

- **[Installation](#installation)**
- **[Usage](#usage)**

## Installation
Install this package via [npm](https://npmjs.com/).

```
npm install googleapi-translate
```

## Usage
- import the package and create a new object by passing token 
```
let googleApi = require("googleapi-translate")

let googleTranslation = new googleApi({token: 'this is token'})
```

### Translate
```
googleTranslation.translate("hello", "en", "ja").then((res)=>{
    console.log(res);
})
```

### Detect the language
```
googleTranslation.detect("hello").then((res)=>{
    console.log(res);
})
```
### Get supported languages
```
googleTranslation.getLanguages().then((res)=>{
    console.log(res);
})
```
## Security

If you discover any security related issues, please email them to [waithawoocw@gmail.com](mailto:waithawoocw@gmail.com) instead of using the issue tracker.

## License

The MIT License (MIT). Please see the [License File](LICENSE) for more information.

