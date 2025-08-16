import classNames from 'classnames'
import './month.scss'
import { useMemo } from 'react'
import { billTypeToName } from '@/contains/index.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MonthBill = ({date,billList}) => {
  const monthResults = useMemo(() => {
      // 处理无数据情况
      if (!billList || billList.length === 0) {
      return { pay: 0, income: 0, total: 0 }; // 或 return {}; 视需求而定
      }
  
      const pay = billList.filter(item => item.type === 'pay').reduce((a,b) => a + b.money,0)
      const income = billList.filter(item => item.type === 'income').reduce((a,b) => a + b.money,0)
      return {
        pay,
        income,
        total:pay+income
      }
  },[billList])

  // 控制列表显示
  const [listShow, setListShow] = useState(false)

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span onClick={() => setListShow(!listShow)} className={classNames('arrow', {expand:listShow})}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{monthResults.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{monthResults.income}</span>
          </div>
          <div className="balance">
            <span className="money">{monthResults.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      <div className="billList" style={{display:listShow ? 'block' : 'none'}}>
        {billList.map(item => {
          return (
            
            <div className="bill" key={item.id}>
              <div className="detail">
                {/* billTypeToName中文适配 */}
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default MonthBill