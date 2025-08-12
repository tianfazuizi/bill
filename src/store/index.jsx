import { configureStore } from "@reduxjs/toolkit"
import billReducer from './modules/billStore'

const store = configureStore({
  reducer: {
    biller : billReducer
  }
})

export default store