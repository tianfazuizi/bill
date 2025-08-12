import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const billStore = createSlice({
  name:'biller',
  initialState: {
    billList: []
  },
  reducers:{
    setBillList (state, action) {
      state.billList = action.payload
    }
  }
})

const{setBillList} = billStore.actions
// 异步请求
const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:8888/ka')
    // 触发同步reducer
    dispatch(setBillList(res.data))
  }
}

export {getBillList}
const reducer = billStore.reducer
export default reducer