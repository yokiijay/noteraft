/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Link } from 'react-router-dom'
import useThemeModel from '../../models/useThemeModel'

const NoPage = () => {
  const {theme} = useThemeModel()

  return(
    <div css={css`
      font-size: 4rem;
      align-self: center;
      flex: 1;
      display: flex;
      align-items: center;
      color: ${theme.color.hint};
      transform: translateY(-8%);

      a {
        color: ${theme.primary.base};
        text-decoration: none;
      }
    `}>
      没找到你想要的,&nbsp;<Link to='/note'> 点击回首页</Link>
    </div>
  )
}

export default NoPage