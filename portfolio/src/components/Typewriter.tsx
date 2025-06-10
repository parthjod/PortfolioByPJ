'use client'
import { useState,useEffect } from 'react'

export default function Typewriter({phrases}:{phrases:string[]}) {
  const [text,setText]=useState('')
  const [index,setIndex]=useState(0)
  useEffect(()=>{
    const current=phrases[index%phrases.length]
    let i=0
    const id=setInterval(()=>{
      setText(current.slice(0,++i))
      if(i===current.length){clearInterval(id);setTimeout(()=>setIndex(v=>v+1),1200)}
    },80)
    return()=>clearInterval(id)
  },[index,phrases])
  return <p className="text-2xl text-muted-foreground h-8">{text}</p>
}
