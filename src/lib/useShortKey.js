import { useState, useEffect } from 'react'

const initState = false

function useShortKey(modifier, key, cb) {
  const [onoff, setOnoff] = useState(initState)

  const toggle = () => {
    setOnoff(onoff=>!onoff)
  }

  //  modifier: cmd-Meta option-Alt control-control
  const handleKeydown = ev => {
    const { metaKey, ctrlKey, shiftKey, altKey } = ev
    const keyname = ev.key

    switch (modifier) {
      case 'cmd':
      case 'command':
        if (keyname === key && metaKey) {
          ev.preventDefault()
          toggle()
          cb&&cb(onoff)
        }
        break
      case 'option':
      case 'alt':
        if (keyname === key && altKey) {
          ev.preventDefault()
          toggle()
          cb&&cb(onoff)
        }
        break
      case 'control':
      case 'ctrl':
        if (keyname === key && ctrlKey) {
          ev.preventDefault()
          toggle()
          cb&&cb(onoff)
        }
        break
      case 'shift':
        if (keyname === key && shiftKey) {
          ev.preventDefault()
          toggle()
          cb&&cb(onoff)
        }
        break
      default: return
    }

    if(!modifier&&key&&keyname===key){
      ev.preventDefault()
      toggle()
      cb&&cb(onoff)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return ()=>window.removeEventListener('keydown', handleKeydown)
  })
}

export default useShortKey
