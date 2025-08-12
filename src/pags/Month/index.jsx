import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState } from 'react'
import classNames from 'classnames'

const Month = () => {
  const [dateShow, setDateShow] = useState(false)
  // 弹框确认时
  const onConfirm = () => {
    setDateShow(false)
  }
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backIcon={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateShow(true)}>
            <span className="text">
              2023 | 3月账单
            </span>
            {/* expand类名存在箭头朝上，否则朝下 */}
            <span className={classNames('arrow',{expand:dateShow})}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            onClose={() => setDateShow(false)}
            onConfirm={onConfirm}
            title="记账日期"
            precision="month"
            visible={dateShow}
            max={new Date()}
          />
        </div>
      </div>
    </div >
  )
}

export default Month