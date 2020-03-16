import { useState, useCallback, useMemo, memo } from 'react'
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
import SidebarItem from './components/Sidebar/SidebarItem'
import useDataModel from './models/useDataModel'
import { useHistory, Route, Switch } from 'react-router-dom'
import NoPage from './components/NotFound/NoPage'
import useShortKey from './lib/useShortKey'

/* -------------------------- App -------------------------- */

const App = props => {
  const { theme } = useThemeModel()
  const history = useHistory()

  // 文章Data
  const { data, deleteByIndex } = useDataModel()

  // 侧栏
  const [showSidebar, setShowSidebar] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  // 侧栏快捷键
  useShortKey('cmd', 'b', ()=>{
    setShowSidebar(!showSidebar)
  })

  // app catagory 切换
  const [catagory, setCatagory] = useState(0)

  const handleCatagorySwitch = useCallback(
    active => {
      setCatagory(active)
    },
    [setCatagory]
  )

  const catagoryParam = useMemo(() => (catagory === 0 ? 'note' : 'todo'), [
    catagory
  ])

  // 侧栏导航
  const handleClickItem = (contentId, index) => {
    history.push(`/${catagoryParam}/${contentId}`) // 切换导航
    setActiveIndex(index) // 激活index对应侧栏item
  }

  // 创建文章
  const handleTapCreate = ()=>{
    // do something to create a note
  }

  return (
    <StyledApp theme={theme}>
      <AppSwitch />
      <Container>

        <Header>
          {/* <MenuBtn initial={true} onSwitch={handleMenuBtnSwitch} /> */}
          <MenuBtn initial={true} on={showSidebar} onTap={()=>setShowSidebar(!showSidebar)} />
          <AppSwitch initial={0} onSwitch={handleCatagorySwitch} />
          <CreateBtn onTap={handleTapCreate}>写文章</CreateBtn>
        </Header>

        <Switch>
          <Route path='/note'>
            <MainBody>
              <Sidebar show={showSidebar}>
                {data.map((item,i) => {
                  return item.catagory==='note' && (
                    <SidebarItem
                      key={item.id}
                      title={item.content.title}
                      descrition={item.content.body[0]['content']}
                      date={item.createdTime}
                      timeBefore='3小时前'
                      active={i === activeIndex}
                      onTap={() => handleClickItem(item.contentId,i)}
                      onClickDelBtn={()=> deleteByIndex(i)}
                    />
                  )
                })}
              </Sidebar>
              {/* <Route path='/note/:Contentid'>
                <Content></Content>
              </Route> */}
            </MainBody>
          </Route>
          <Route component={NoPage} />
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
