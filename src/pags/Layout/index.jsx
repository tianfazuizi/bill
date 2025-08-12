import { Outlet, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getBillList } from "../../store/modules/billStore"
import { TabBar } from "antd-mobile"
import './index.scss'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline
} from 'antd-mobile-icons'

const tabs = [
  {
    key: '/month',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
]

const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  },[])
  // 点击路由跳转
  const navigate = useNavigate()
  const changeRouter = (path) => {
    navigate(path)
    
  }
  return (
    <div className="layout">
      <div className="container">
        {/* 二级路由出口 */}
        <Outlet />
      </div>
      <div className="footer">
        <TabBar onChange={changeRouter}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Layout