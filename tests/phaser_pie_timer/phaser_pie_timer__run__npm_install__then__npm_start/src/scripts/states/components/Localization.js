import 'url-search-params-polyfill'

export default class{
    constructor(game){
        let {languageCode} = game.data
        const paramLanguage = (new URLSearchParams(window.location.search)).get('lang')

        if(paramLanguage){
            if(game.data.language.hasOwnProperty(paramLanguage)){
                languageCode = paramLanguage
            }else{
                console.error(`LoadingState.js: initLocalization: Language code localization not found, "${paramLanguage}"`)
            }
        }

        game.localize = key => {return game.data.language[languageCode][key]}
    }
}
