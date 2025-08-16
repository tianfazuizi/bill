import { NavBar, DatePicker } from 'antd-mobile'
import '@/pags/Year/index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import MonthBill from './components/month'

const Month = () => {
  const billList = useSelector(state => state.biller.billList)
  // 按年分组
  const yearGroup = useMemo(() => {
    return _.groupBy(billList,(item) => dayjs(item.date).format('YYYY'))
  },[billList])
  // 当前年的账单数据
  const [current, setCurrent] = useState([])

  useEffect(() => {
    const nowYear = dayjs().format('YYYY')
    if(yearGroup){
      setCurrent(yearGroup[nowYear])
    }
    setDateConfirm(nowYear)
  },[yearGroup])

  // 当前年按照月来分组
  const monthGroup = useMemo(() => {
    const groupDate = _.groupBy(current,(item) => dayjs(item.date).format('YYYY-MM'))
    return {
      keys:Object.keys(groupDate),
      groupDate
    }
  },[current])

  const yearReasults = useMemo(() => {
    if(!current || current.length === 0){
      return {pay: 0,income: 0, total: 0}
    }

    const pay = current.filter(item => item.type === 'pay').reduce((a,b) => a + b.money, 0)
    const income = current.filter(item => item.type === 'income').reduce((a,b) => a + b.money, 0)
    return {
      pay,
      income,
      total : pay + income
    }
})
  // 控制弹框关闭开启
  const [dateShow, setDateShow] = useState(false)
  const [dateConfirm, setDateConfirm] = useState(() => dayjs().format("YYYY"))
  // 弹框确认时
  const onConfirm = (date) => {
    setDateShow(false)
    const newDate = dayjs(date).format('YYYY')
    setDateConfirm(newDate)
    setCurrent(yearGroup[newDate])
  }

  return (
    <div className="yearlyBill">
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
              <span className="money">{yearReasults.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{yearReasults.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{yearReasults.total}</span>
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
        {/* 每月列表统计 */}
        {
          monthGroup.keys.map(key => {
            return <MonthBill key={key} date={key} billList={monthGroup.groupDate[key]}/>
          })
        }
      </div>
    </div >
  )
}

export default Month