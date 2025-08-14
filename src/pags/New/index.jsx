import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import '../../components/font_4936267_14zd0wgvcq2/iconfont.css'
import Icon from 'D:/桌面/React/bill-react/src/components/icon/index.jsx'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '../../contains/index'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '../../store/modules/billStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()
  // 点击切换‘支出’和‘收入’的状态
  //'pay'- 支出，'income'-收入
  const [billType, setBillType] = useState('pay')  
  // 保存输入金额
  const [money, setMoney] = useState(0)
  const changeMoney = (value) => {
    setMoney(value)
  }
  // 保存的金额类型 - 什么样的图标
  const [iconType, setIconType] = useState('')
  const dispatch = useDispatch()

  // 收集保存时表单数据
  const saveBill = () => {
    const data = {
      type:billType,
      money:billType === 'pay' ? -money : +money,
      date: date,
      useFor:iconType
    }
    dispatch(addBillList(data))
    // 传递点击保存时的月份
    const month = dayjs(date).format('YYYY-MM')
    navigate(`/month?month=${month}`)
  }

  // 控制记账时间打开关闭
  const [dateBill, setDateBill] = useState(false)
  // 存储记账时间
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  // 记账时间确定
  const confirm = (value) => {
    setDateBill(false)
    setDate(value)    
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={() => setBillType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            onClick={() => setBillType('income')}
            shape="rounded"
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="rili" className="icon" />
              <span className="text" onClick={() => setDateBill(true)}>
                {dayjs(date).format('YYYY-MM-DD')}
              </span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateBill}
                onClose={() => setDateBill(false)}
                onConfirm={confirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={changeMoney}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    // 遍历图标
                    <div
                      className={classNames(
                        'item',
                        iconType === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setIconType(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New