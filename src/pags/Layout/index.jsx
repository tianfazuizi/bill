import { Button } from "antd-mobile"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getBillList } from "../../store/modules/billStore"

const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  },[])
  return (
    <div>
      {/* 二级路由出口 */}
      <Outlet/>
      this is Layout
      <Button color='primary'>测试全局</Button>
    </div>
  )
}

export default Layout