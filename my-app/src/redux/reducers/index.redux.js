import { combineReducers } from "redux"
import { i18nReducer } from "react-redux-i18n"
import comments from "./"

 const rootReducer = combineReducers({i18n: i18nReducer,
    
})