/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLink } from '@fortawesome/free-solid-svg-icons'
import useThemeModel from '../../models/useThemeModel'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

const AddText = ({ ...props }) => {
  const [showList, setShowList] = useState(true)
  const addListRef = useRef()

  const handleClickAddBtn = () => {
    setShowList(true)
  }

  const handleClickBack = ()=>{
    setShowList(false)
  }

  return (
    <div
      css={css`
        position: absolute;
      `}
      {...props}
    >
      {showList ? (
        <AddList addListRef={addListRef} onClickBack={handleClickBack} />
      ) : (
        <AddBtn onClick={handleClickAddBtn} />
      )}
    </div>
  )
}

const AddBtn = ({ onClick }) => {
  const { theme } = useThemeModel()

  return (
    <motion.div
      css={css`
        width: 20px;
        height: 20px;
        background: ${theme.button.background};
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
        padding: 10px;
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <FontAwesomeIcon size='xs' icon={faPlus} />
    </motion.div>
  )
}

const AddList = ({ addListRef, onClickBack }) => {
  const { theme } = useThemeModel()

  const handleClickTS = behave => {}

  return (
    <div>
      <div
        className='back'
        css={css`
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        `}
        onClick={onClickBack}
      ></div>

      <div
        ref={addListRef}
        css={css`
          position: relative;
          /* padding: 1px 15px; */
          background: ${theme.background.base};
          box-shadow: 0 3px 4px ${theme.color.shadow};
          border-radius: 8px;
          overflow: hidden;
          user-select: none;
          z-index: 2;

          .link {
            color: ${theme.primary.base};
            font-weight: 500;
          }

          h1,
          h2,
          h3,
          p {
            cursor: pointer;
            padding: 12px;
            margin: 0;

            &:hover {
              background: ${theme.button.background};
              color: ${theme.button.color};
            }
          }
        `}
      >
        <h1 onClick={() => handleClickTS('h1')}>大标题</h1>
        <h2 onClick={() => handleClickTS('h2')}>次级标题</h2>
        <h3 onClick={() => handleClickTS('h3')}>小标题</h3>
        <p onClick={() => handleClickTS('body')}>正文</p>
        <p onClick={() => handleClickTS('link')} className='link'>
          链接
          <FontAwesomeIcon
            style={{ marginLeft: '6px' }}
            size='xs'
            icon={faLink}
          />
        </p>
      </div>
    </div>
  )
}

export default AddText
