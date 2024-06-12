import './input.scss'

interface Props {
  className?: string
  value: any
  onChange: any
  onBlur: any
  props?: any
}

const Input = ({className, value, onChange, onBlur, props}: Props) => {
  return (
    <input className={'input ' + className} {...props} />
  )
}

export default Input