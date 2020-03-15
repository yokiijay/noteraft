/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { between } from 'polished'
import { motion, AnimatePresence } from 'framer-motion'
import useThemeModel from '../../models/useThemeModel'
import { memo } from 'react'

const Sidebar = ({ show, children }) => {
  const { theme } = useThemeModel()

  const variants = {
    show: {
      x: '0',
      width: between('80px', '168px'),
    },
    hide: {
      width: 0,
      x: '-30px',
      transition: {
        ease: 'circOut',
        duration: 0.3
      }
    }
  }

  return (
    <motion.div
      css={css`
      height: 100%;
      width: ${between('150px', '240px')};
      border-right: 1px solid ${theme.color.divider};
      background: ${theme.background.backdrop};
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 2px;
        z-index: 999;
        display: ${show ? 'block' : 'none'};
        /* background: ${theme.color.shadow}; */
      }
      &::-webkit-scrollbar-thumb {
        z-index: 999;
        border-radius: 10px;
        background: ${theme.color.shadow};
      }
    `}
      variants={variants}
      animate={show ? 'show' : 'hide'}
    >
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </motion.div>
  )
}

export default memo(Sidebar)
