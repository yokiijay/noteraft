// import { useParams } from 'react-router-dom'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import useThemeModel from '../../models/useThemeModel'
import useShortKey from '../../lib/useShortKey'
import AddText from './AddText'

const Note = () => {
  // const params = useParams()
  const { theme } = useThemeModel()

  const handleTextStyle = headline =>{
    switch (headline) {
      case 1:
        document.execCommand('insertHTML', null, `<h1></h1>`)
        break
      case 2:
        document.execCommand('insertHTML', null, `<h2></h2>`)
        break
      case 3:
        document.execCommand('insertHTML', null, `<h3></h3>`)
        break
    
      default:
        break
    }
  }

  return (
    <div
      spellCheck='false'
      css={css`
        padding: 20px 40px;
        width: 800px;
        margin: 0 auto;
        outline: none;

        .title {
          word-break: break-all;
          min-height: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid ${theme.color.divider};
        }

        .time {
          text-align: center;
          color: ${theme.color.disabled};
          font-size: 12px;
        }
      `}
    >
      <AddText />
      <h1 contentEditable suppressContentEditableWarning className='title'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit
      </h1>
      <div className='time'>最后编辑 2020-03-22</div>

      <div
        contentEditable
        suppressContentEditableWarning
        className='body'
        css={css`
          outline: none;
          margin-top: 20px;

          h1,h2,h3 {
            min-height: 30px;
            min-width: 30px;
          }
        `}
      >
        dsada
      </div>
    </div>
  )
}

export default Note
