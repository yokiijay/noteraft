/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import useThemeModel from './models/useThemeModel'
import { normalize } from 'polished'
import { BrowserRouter as Router } from 'react-router-dom'
import Container from './components/Container'
import Header from './components/Header/Header'
import MenuBtn from './components/Header/MenuBtn'
import AppSwitch from './components/Header/AppSwitch'
import CreateBtn from './components/Header/CreateBtn'

/* -------------------------- App -------------------------- */

const App = ({ color }) => {
  const { theme } = useThemeModel()

  return (
    <StyledApp theme={theme}>
      <Router>

        <Container>
          <Header>
            <MenuBtn initial={true} />
            <AppSwitch initial={0} />
            <CreateBtn onTap={()=>console.log( 'create' )}>写文章</CreateBtn>
          </Header>
        </Container>

      </Router>
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
        background: ${theme.mode === 'dark' ? '#111B1F' : theme.background.base};
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

export default App
