import { useRef } from 'react'

class RefState {
  constructor(initState){
    this.state = useRef().current = initState
  }

  getState(){
    return this.state
  }

  setState(newState){
    if(typeof newState === 'function'){
      newState && newState(this.state)
    }else {
      this.state = newState
    }

    this.effect && this.effect()
  }

  useRefEffect(cb){
    this.effect = cb
  }
}

function useRefState(initState){
  const s = new RefState(initState)
  const getState = s.getState.bind(s)
  const setState = s.setState.bind(s)
  const useRefEffect = s.useRefEffect.bind(s)

  return [getState, setState, useRefEffect]
}

export default useRefState