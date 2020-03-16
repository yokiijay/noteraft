import React, { memo, useState } from 'react'

const Test = ({getOn, effect}) => {
  const [trigger, setTrigger] = useState(0)
  effect(()=>{
    setTrigger(trigger+1)
    console.log( getOn() )
  })

  return(
    <div>
      {getOn()?'on':'off'}
    </div>
  )
}

export default Test