/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { motion } from 'framer-motion'
import useThemeModel from '../../models/useThemeModel'
import { memo } from 'react'

const CreateBtn = ({ children = '写文章', onTap, onClick }) => {
  const { theme } = useThemeModel()

  return (
    <motion.div
      onTap={onTap || onClick}
      css={css`
        border-radius: 20px;
        background: ${theme.button.background};
        color: ${theme.button.color};
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 1.1 }}
        css={css`
          padding: 10px 28px;
        `}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default memo(CreateBtn)
