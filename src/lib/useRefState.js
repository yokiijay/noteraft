import { useRef } from "react"

export class RefState {
  constructor(initState){
    this.state = initState
  }

  setState(val){
    if(typeof val === 'function'){
      val(this.state)
    }else {
      this.state = val
    }
    this.useREffect()
  }

  useREffect(cb){
    // this.useEffectCallback = 0
    cb&&cb()
  }
}

// this state won't re-fresh current Component
function useRefState(initState){
  const ref = useRef.current = initState
  const s = new RefState(ref)
  const {state,setState,useREffect} = s

  return [state, setState, useREffect]
}

export default useRefState

// // this state won't re-fresh current Component
// function useRefState(initState){
//   const current = useRef.current = initState
//   const state = current
//   const setState = (value)=>{
//     if(typeof value==='function') return value(state)
//     return value
//   }

//   return [state, setState]
// }

// export default useRefState