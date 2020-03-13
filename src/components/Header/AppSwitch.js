import React, { useState, useEffect } from 'react'
import useThemeModel from '../../models/useThemeModel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

const AppSwitch = ({initial=0, onSwitch}) => {
  const { theme } = useThemeModel()
  const [active, setActive] = useState(initial)

   // 给组件暴露switch事件
  useEffect(()=>{
    onSwitch && onSwitch(active)
  }, [active, onSwitch])

  useEffect(() => {
    window.addEventListener('keydown', ev => {
      if (ev.key === 'ArrowLeft') setActive(prevActive => (prevActive + 1) % 2)
      if (ev.key === 'ArrowRight') setActive(prevActive => (prevActive + 1) % 2)
      return
    })
    return () =>
      window.removeEventListener('keydown', ev => {
        if (ev.key === 'ArrowLeft')
          setActive(prevActive => (prevActive + 1) % 2)
        if (ev.key === 'ArrowRight')
          setActive(prevActive => (prevActive + 1) % 2)
        return
      })
  }, [])

  return (
    <StyledAppSwitch theme={theme}>
      <StyledActive
        theme={theme}
        active={active}
        animate={{
          left: active ? '40%' : '0%',
        }}
      />
      <div
        onClick={() => setActive(0)}
        className={`item note ${active === 0 ? 'active' : null}`}
      >
        {active === 0 ? '笔记' : <FontAwesomeIcon icon={faBook} />}
      </div>
      <div
        onClick={() => setActive(1)}
        className={`item todo ${active === 1 ? 'active' : null}`}
      >
        {active === 1 ? '待办' : <FontAwesomeIcon icon={faCalendarCheck} />}
      </div>
    </StyledAppSwitch>
  )
}

const StyledActive = styled(motion.div)`
  position: absolute;
  z-index: 0;
  left: 0;
  /* left: ${({ active }) => (active ? '40%' : '0%')}; */
  width: 60%;
  height: 100%;
  background: ${({ theme }) => theme.button.background};
  border-radius: 50px;
`

const StyledAppSwitch = styled.div`
  position: relative;
  margin: 0 auto;
  min-width: 130px;
  height: 36px;
  background: ${({ theme }) => theme.background.backface};
  border-radius: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.color.caption};

  .item {
    padding: 10px;
    cursor: pointer;
    z-index: 2;
    transition: 0.2s;
  }

  .active {
    color: ${({ theme }) => theme.button.color};
  }
`

export default AppSwitch
