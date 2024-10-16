import React from 'react'
import { ChatBar } from './ChatBar'
import { Massage } from './Massage'

export const Chat = () => {
  return (
    <div className='flex w-full mx-auto'>
        <Massage />
        <ChatBar />
    </div>
  )
}
