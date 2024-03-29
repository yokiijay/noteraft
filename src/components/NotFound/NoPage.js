/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import useThemeModel from '../../models/useThemeModel'
import { Link } from 'react-router-dom'

const NoPage = ({redirectTo}) => {
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
      没找到你想要的
      ,&nbsp;<Link to={`/${redirectTo}`}> 点击回首页</Link>
    </div>
  )
}

export default NoPage