import { useState, memo } from 'react'
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import useThemeModel from './models/useThemeModel'
import { normalize } from 'polished'
import Container from './components/Container'
import Header from './components/Header/Header'
import MenuBtn from './components/Header/MenuBtn'
import AppSwitch from './components/Header/AppSwitch'
import CreateBtn from './components/Header/CreateBtn'
import MainBody from './components/MainBody'
import Sidebar from './components/Sidebar/Sidebar'
import { useHistory, Route, Switch, Redirect } from 'react-router-dom'
import NoPage from './components/NotFound/NoPage'
import useShortKey from './lib/useShortKey'
import Note from './components/Content/Note'
import NoContent from './components/NotFound/NoContent'

/* -------------------------- App -------------------------- */

const App = props => {
  const { theme } = useThemeModel()
  const history = useHistory()

  // 侧栏
  const [showSidebar, setShowSidebar] = useState(true)

  // 侧栏快捷键
  useShortKey('cmd', 'b', ()=>{
    setShowSidebar(!showSidebar)
  })

  // app catagory 切换
  const [catagory, setCatagory] = useState(0)

  const handleCatagorySwitch = index => {
    history.push(`/${!index?'note':'todo'}`)
    setCatagory(index)
  }

  // app catagory 快捷键切换
  useShortKey('', 'ArrowLeft', ()=>{
    history.push(catagory?'/note':'/todo')
    setCatagory((catagory+1)%2)
  })
  useShortKey('', 'ArrowRight', ()=>{
    history.push(catagory?'/note':'/todo')
    setCatagory((catagory+1)%2)
  })
  
  // 创建文章
  const handleTapCreate = ()=>{
    // do something to create a note
  }


  return (
    <StyledApp theme={theme}>
      <Container>

        <Header>
          <MenuBtn initial={true} on={showSidebar} onTap={()=>setShowSidebar(!showSidebar)} />
          <AppSwitch activeIndex={catagory} onSwitch={handleCatagorySwitch} />
          <CreateBtn onTap={handleTapCreate}>写文章</CreateBtn>
        </Header>

        <Route exact path='/' render={()=><Redirect to='/note' />} />
        <Switch>

          <Route path='/note'>
            <MainBody>

                <Route exact path='/note'>
                  <Sidebar catagory='note' show={showSidebar} />
                  <NoContent />
                </Route>

                <Switch>
                  <Route path='/note/nocontent'>
                    <Sidebar catagory='note' show={showSidebar} />
                    <NoContent />
                  </Route>
                  <Route path='/note/:contentId'>
                    <Sidebar catagory='note' show={showSidebar} />
                    <Note></Note>
                  </Route>
                </Switch>

            </MainBody>
          </Route>
          
          <Route>
            <NoPage redirectTo={!catagory?'note':'todo'} />
          </Route>

        </Switch>

      </Container>
    </StyledApp>
  )
}

/* -------------------------- style for App -------------------------- */

const StyledApp = ({ theme, children }) => {
  return (
    <div
      css={css`
        height: 100vh;
        display: grid;
        place-items: center;
        background: ${theme.mode === 'dark'
          ? '#111B1F'
          : theme.background.base};
      `}
    >
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }
          ${normalize()};
        `}
      />
      {children}
    </div>
  )
}

export default memo(App)
