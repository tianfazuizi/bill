import { NavBar, DatePicker } from 'antd-mobile'
import '@/pags/Month/index.scss'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
// useMemo 用于缓存计算结果
import { useMemo } from 'react'
import _ from 'lodash'
// 导入单日账单
import DayBill from './components/DayBill/index'

const Month = () => {
  // 按月分组
  const billList = useSelector(state => state.biller.billList)
  // 新增账单的月份
  let month = useSelector(state => state.biller.monthDate)
  const monthGroup = useMemo(() => {
    return _.groupBy(billList,(item) => dayjs(item.date).format('YYYY-MM'))
  },[billList])

  // 当前月的数据
  const [monthData, setMonthData] = useState([])
  // 初始化时把当前月的统计数据显示出来
  useEffect(() => {
    // 初始化使用URL参数，没有就用当前月份
    const nowDate = month || dayjs().format('YYYY-MM')
    // 边界值控制
    if(monthGroup[nowDate]){
      setMonthData(monthGroup[nowDate])
    }
    // 同步更新显示的数据
    setCurrentDate(nowDate)
  },[monthGroup, month])
  const monthResults = useMemo(() => {
    // 处理无数据情况
    if (!monthData || monthData.length === 0) {
    return { pay: 0, income: 0, total: 0 }; // 或 return {}; 视需求而定
    }

    const pay = monthData.filter(item => item.type === 'pay').reduce((a,b) => a + b.money,0)
    const income = monthData.filter(item => item.type === 'income').reduce((a,b) => a + b.money,0)
    return {
      pay,
      income,
      total:pay+income
    }
  },[monthData])

  // 当前月中按照日来分组
  // const [dayData, setDayData] = useState([])
  const dayGroup = useMemo(() => {
    const groupDate = _.groupBy(monthData,(item) => dayjs(item.date).format('YYYY-MM-DD'))
    return {
      keys:Object.keys(groupDate),
      groupDate
    }
  },[monthData])


  // 控制弹框显示和关闭
  const [dateShow, setDateShow] = useState(false)
  // 时间显示
  const [currentDate, setCurrentDate] = useState(() => dayjs(new Date()).format('YYYY-MM'))
  // 弹框确认时
  const onConfirm = (date) => {
    setDateShow(false)
    const confirmDate = params.get('month') || dayjs(date).format('YYYY-MM')
    setMonthData(monthGroup[confirmDate])
    setCurrentDate(confirmDate)
    
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
              {currentDate + ''}账单
            </span>
            {/* expand类名存在箭头朝上，否则朝下 */}
            <span className={classNames('arrow',{expand:dateShow})}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResults.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResults.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResults.total}</span>
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
        {/* 单日列表统计 */}
        {
          dayGroup.keys.map(key => {
            return <DayBill key={key} date={key} billList={dayGroup.groupDate[key]}/>
          })
        }
       
      </div>
    </div >
  )
}

export default Month