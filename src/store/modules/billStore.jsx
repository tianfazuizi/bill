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
    },
    // 增加数据
    addBill (state,action) {
      state.billList.push(action.payload)
    }
  }
})

const{setBillList,addBill} = billStore.actions
// 异步请求
const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:8888/ka')
    // 触发同步reducer
    dispatch(setBillList(res.data))
  }
}

// 增加账单数据的异步请求
const addBillList = (data) => {
  return async (dispatch) => {
    const res = await axios.post('http://localhost:8888/ka', data)
    // 触发同步reducer
    dispatch(addBill(res.data))
  }
}

export {getBillList, addBillList}
const reducer = billStore.reducer
export default reducer