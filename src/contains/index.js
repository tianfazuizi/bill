export const billListData = {
  pay: [
    {
      type: 'foods',
      name: '餐饮',
      list: [
        { type: 'canfei', name: '餐费' },
        { type: 'jiushui', name: '酒水饮料' },
        { type: 'tianpin', name: '甜品零食' },
      ],
    },
    {
      type: 'taxi',
      name: '出行交通',
      list: [
        { type: 'chuzuche', name: '打车租车' },
        { type: 'lvhang', name: '旅行票费' },
      ],
    },
    {
      type: 'recreation',
      name: '休闲娱乐',
      list: [
        { type: 'yundongjianshen', name: '运动健身' },
        { type: 'xiuxianwanle', name: '休闲玩乐' },
        { type: 'meitiyingyin', name: '媒体影音' },
        { type: 'lvyou', name: '旅游度假' },
      ],
    },
    {
      type: 'daily',
      name: '日常支出',
      list: [
        { type: 'huabanfuben', name: '衣服裤子' },
        { type: 'xiemao', name: '鞋帽包包' },
        { type: 'xuexi', name: '知识学习' },
        { type: 'nenglitisheng', name: '能力提升' },
        { type: 'jiazhuang', name: '家装布置' },
      ],
    },
    {
      type: 'other',
      name: '其他支出',
      list: [{ type: 'shequjiaofei-01', name: '社区缴费' }],
    },
  ],
  income: [
    {
      type: 'professional',
      name: '其他支出',
      list: [
        { type: 'qianbao', name: '工资' },
        { type: 'jiaban', name: '加班' },
        { type: 'wode-wodejiangjin', name: '奖金' },
      ],
    },
    {
      type: 'other',
      name: '其他收入',
      list: [
        { type: 'jingzichanshouyishuai', name: '理财收入' },
        { type: 'lijinshouru', name: '礼金收入' },
      ],
    },
  ],
}

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
  billListData[key].forEach(bill => {
    bill.list.forEach(item => {
      prev[item.type] = item.name
    })
  })
  return prev
}, {})