import { useRef } from "react"


// this state won't re-fresh current Component
function useRefState(initState){
  let state = useRef.current = initState
  let effect

  const setState=(newState)=>{
    state = newState
    effect&&effect()
  }

  function useRefEffect(cb){
    effect=cb
  }

  return [state, setState, useRefEffect]
}

export default useRefState