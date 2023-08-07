import { type FC, type ReactNode, useEffect, useCallback, useState, type MutableRefObject, useRef } from 'react'
import { Portal } from '../Portal/Portal'
import styles from './Modal.module.scss'
import classNames from 'classnames'
import close from '../../../assets/images/modal-close.svg'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

const ANIMATION_DELAY = 200

export const Modal: FC<ModalProps> = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen = false,
    onClose,
    lazy
  } = props

  const [isClosing, setIsClosing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }
    return () => {
      setIsMounted(false)
    }
  }, [isOpen])

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, ANIMATION_DELAY)
    }
  }, [onClose])

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler()
    }
  }, [closeHandler])

  useEffect(() => {
    if (isOpen) {
      timerRef.current = setTimeout(() => {
        setIsOpening(true)
      }, 0)
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      clearTimeout(timerRef.current)
      setIsOpening(false)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  const mods: Record<string, boolean> = {
    [styles.opened]: isOpening,
    [styles.closed]: isClosing
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div className={classNames(styles.Modal, mods, [])}>
        <div className={styles.overlay} onClick={closeHandler}>
          <div
            className={classNames(styles.content, mods,[className])}
            onClick={onContentClick}
          >
            {children}
            <img src={close} alt='' className={styles.close_btn} onClick={onClose}/>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default Modal
