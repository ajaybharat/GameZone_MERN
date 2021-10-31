import { createStore,applyMiddleware } from "redux"
import rootreducer from "./rootReducer"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

const store = createStore(rootreducer, composeWithDevTools(applyMiddleware(logger, thunk)))

export default store