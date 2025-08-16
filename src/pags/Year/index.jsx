import { NavBar, DatePicker } from 'antd-mobile'
import '@/pags/Year/index.scss'
import { useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'

const Month = () => {
  // 控制弹框关闭开启
  const [dateShow, setDateShow] = useState(false)
  const [dateConfirm, setDateConfirm] = useState(() => dayjs().format("YYYY"))
  // 弹框确认时
  const onConfirm = (date) => {
    setDateShow(false)
    setDateConfirm(dayjs(date).format('YYYY'))
  }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backIcon={false}>
        年度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">
              {/* 不能直接使用date 对象，需要转为字符串 */}
              {dateConfirm + '' } 年账单
            </span>
            {/* <span className='arrow expand' onClick={() => setDateShow(true)}></span> */}
            <span className={classNames('arrow',{expand:dateShow})} onClick={() => setDateShow(!dateShow)}></span>
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
            title="年度账单"
            precision="year"
            visible={dateShow}
            max={new Date()}
          />
        </div>
      </div>
    </div >
  )
}

export default Month