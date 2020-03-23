// import { useParams } from 'react-router-dom'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import useThemeModel from '../../models/useThemeModel'
import AddText from './AddText'
import { useState } from 'react'

const Note = () => {
  // const params = useParams()
  const { theme } = useThemeModel()

  // 控制显示+按钮
  const [displayAdd, setDisplayAdd] = useState(false)
  // 控制+按钮位置
  const [pos, setPos] = useState({x:0,y:0})

  // 点击TS时处理
  const handleClickTS = behave => {
    console.log(behave)
  }

  // 光标移动时处理
  const handleSelect = () => {
    const selection = getSelection()
    const { anchorNode, focusNode } = selection

    // anchor和focus必须是同一个元素
    if (anchorNode === focusNode) {
      anchorNode.length ? setDisplayAdd(false) : setDisplayAdd(true)
    }

    // 如果当前元素是block则设置+按钮位置
    !anchorNode.length && setPos({
      x: anchorNode.offsetLeft - 30,
      y: anchorNode.offsetTop,
    })
  }

  // 输入时处理
  const handleInput = (ev)=>{
    
  }

  return (
    <div
      spellCheck='false'
      css={css`
        position: relative;
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
      <AddText
        css={css`
          /* display: ${displayAdd ? 'block' : 'none'}; */
          opacity: ${displayAdd ? 1 : 0};
          transition: opacity .2s;
          pointer-events: ${displayAdd ? 'initial' : 'none'};
          top: ${pos.y}px;
          left: ${pos.x}px;
        `}
        onClickTS={handleClickTS}
      />
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

          h1,
          h2,
          h3 {
            min-height: 30px;
            min-width: 30px;
          }
        `}
        onInput={handleInput}
        onSelect={handleSelect}
      >
        dsada
      </div>
    </div>
  )
}

export default Note
