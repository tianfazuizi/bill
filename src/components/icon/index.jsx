import '../font_4936267_14zd0wgvcq2/iconfont.css'

const Icon = ({ type}) => {
  // 将类型转换为符合 iconfont 类名的格式（前缀+驼峰转连字符）
  const iconClassName = `iconfont icon-${type}`;
  
  return (
    <i 
      className={[iconClassName].filter(Boolean).join(' ')}
      style={{
        width: 20,
        height: 20,
        display: 'inline-block', // 确保宽高生效
        textAlign: 'center'
      }}
    />
  )
}

export default Icon
