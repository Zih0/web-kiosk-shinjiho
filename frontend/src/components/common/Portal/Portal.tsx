import ReactDOM from 'react-dom'

interface Props {
  children: React.ReactNode
  elementId?: string
}

const Portal = ({ children, elementId = 'modal' }: Props) => {
  const el = document.getElementById(elementId) as Element
  return ReactDOM.createPortal(children, el)
}

export default Portal
