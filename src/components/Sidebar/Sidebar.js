/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { between } from 'polished'
import { motion, AnimatePresence } from 'framer-motion'
import useThemeModel from '../../models/useThemeModel'
import { memo } from 'react'
import useDataModel from '../../models/useDataModel'
import SidebarItem from './SidebarItem'
import { useParams, useHistory } from 'react-router-dom'
import useShortKey from '../../lib/useShortKey'

const Sidebar = ({ show, catagory }) => {
  const { theme } = useThemeModel()
  const {data, deleteByContentId} = useDataModel()
  const params = useParams()
  const history = useHistory()

  const variants = {
    show: {
      x: '0',
      width: between('80px', '168px')
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

  const handleClickDelBtn = (contentId, i)=>{
    deleteByContentId(contentId)
    const nextIndex = i + 1
    if(nextIndex < data.length){
      history.push(`${data[i+1].contentId}`)
    }else {
      history.push(`nocontent`)
    }
  }

  const currentContentId = params.contentId

  useShortKey('','Backspace',(key)=>{
    deleteByContentId(currentContentId)
    history.push('nocontent')
  })

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
      <AnimatePresence initial={false}>
        {data.map((item, i) => {
          return (
            item.catagory === catagory && (
              <SidebarItem
                key={item.id}
                title={item.content.title}
                descrition={item.content.body[0]['content']}
                date={item.createdTime}
                timeBefore='3小时前'
                active={item.contentId === params.contentId}
                onTap={() => history.push(`/${catagory}/${item.contentId}`)}
                onClickDelBtn={() => handleClickDelBtn(item.contentId, i)}
              />
            )
          )
        })}
      </AnimatePresence>
    </motion.div>
  )
}

export default memo(Sidebar)
