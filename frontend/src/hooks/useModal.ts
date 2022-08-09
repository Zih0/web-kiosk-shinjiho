import { useState } from 'react'

const useModal = () => {
  const [open, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
  }

  const onOpen = () => {
    setOpen(true)
  }

  return { open, onOpen, onClose }
}

export default useModal
