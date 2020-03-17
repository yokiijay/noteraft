import React, { memo, useState } from 'react'

const Test = ({on, effect}) => {
  const [trigger, setTrigger] = useState(0)
  effect(()=>{
    setTrigger(trigger+1)
    console.log( on )
  })

  return(
    <div>
      {on?'on':'off'}
    </div>
  )
}

export default Test