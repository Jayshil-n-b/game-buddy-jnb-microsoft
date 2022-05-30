import { Button, Text, Space } from '@mantine/core';
import React, { useState, useEffect } from 'react'
// import CountUp from 'react-countup'

export default function GameModal({gameid, time, setTime}) {
    
    useEffect(() => {
      const interval = setInterval(() => {
          setTime((prev) => prev+1)
      }, 1000);
      return (()=>clearInterval(interval))
    }, [])

    const getTimeString = (sec) => {
        return new Date(sec * 1000).toISOString().substr(11, 8);
    }
    
  return (
    <div>
        <Text>Time played: {getTimeString(time)}</Text>
        <Space mb={20}/>
        <Button onClick={() => setTime(p => p+600)}>
          <Text>Add 10 Mins</Text>
        </Button>
    </div>
  )
}
