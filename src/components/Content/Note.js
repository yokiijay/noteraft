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
  // 保存最后一次range
  const [range, setRange] = useState(null)

  // 点击TS时处理
  const handleClickTS = behave => {
    switch(behave){
      case 'h1':
        document.execCommand('formatBlock', false, '<h1>')
        break
      case 'h2':
        document.execCommand('formatBlock', false, '<h2>')
        console.log( 'h2' )
        break
      case 'h3':
        document.execCommand('formatBlock', false, '<h3>')
        break
      case 'body':
        document.execCommand('formatBlock', false, '<div>')
        break
      case 'link':
        const url = prompt('请输入链接地址', '如: www.baidu.com') || '空链接'
        document.execCommand('createLink', false, url)
        break
      default: break
    }
  }

  // 光标移动时处理
  const handleSelect = () => {
    const selection = getSelection()
    const { anchorNode, focusNode } = selection

    setRange(selection.getRangeAt(0))

    // 控制+按钮显示 anchor和focus必须是同一个元素
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
    <div className="scroll-wrapepr" css={css`
      width: 100%;
      padding-bottom: 40px;
      overflow-y: auto;
    `}>
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
            margin-bottom: 10px;
            outline: none;
            transition: .2s;
            box-sizing: content-box;

            &:focus {
              padding: 30px 10px;
              background: ${theme.background.backdrop};
              border-bottom: none;
            }
          }

          .time {
            color: ${theme.color.disabled};
            font-size: 12px;
          }
        `}
      >
        <AddText
          css={css`
            opacity: ${displayAdd ? 1 : 0};
            transition: opacity .2s;
            pointer-events: ${displayAdd ? 'initial' : 'none'};
            top: ${pos.y}px;
            left: ${pos.x}px;
          `}
          onClickTS={handleClickTS}
        />
        <h1 contentEditable suppressContentEditableWarning className='title'>
          Lorem ipsum dolor sit.
        </h1>
        <div className='time'>最后编辑 2020-03-22</div>

        <div
          contentEditable
          suppressContentEditableWarning
          className='body'
          css={css`
            outline: none;
            margin-top: 40px;

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
    </div>
  )
}

export default Note
