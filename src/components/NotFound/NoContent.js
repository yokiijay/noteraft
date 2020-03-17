import useThemeModel from '../../models/useThemeModel'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const NoContent = () => {
  const {theme} = useThemeModel()

  return(
    <div css={css`
      font-size: 4rem;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${theme.color.hint};
      transform: translateY(-8%);

      a {
        color: ${theme.primary.base};
        text-decoration: none;
      }
    `}>
      请从侧栏选择一篇文章或新建
    </div>
  )
}

export default NoContent