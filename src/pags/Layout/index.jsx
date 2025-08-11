import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <div>
      {/* 二级路由出口 */}
      <Outlet/>
      this is Layout
    </div>
  )
}

export default Layout