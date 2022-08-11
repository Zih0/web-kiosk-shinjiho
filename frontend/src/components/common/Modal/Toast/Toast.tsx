import styled from 'styled-components'

import { useToastFactory } from 'src/contexts/ToastContext'

import ToastItem from './ToastItem'

import Portal from '../../Portal/Portal'

const Toast = () => {
  const { toastList } = useToastFactory()

  return (
    <Portal elementId="toast">
      <Wrapper>
        {toastList.map((toast) => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            status={toast.status}
            message={toast.message}
            timeout={toast.timeout}
          />
        ))}
      </Wrapper>
    </Portal>
  )
}

export default Toast

const Wrapper = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  z-index: 2000;
`
