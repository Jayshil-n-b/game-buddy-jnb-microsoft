import { Tabs, Title, Space } from '@mantine/core'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Heart, History, InfoCircle, Man, MessageCircle, Photo, Settings } from 'tabler-icons-react'
import Personal from './Personal'
import Favourites from './Favourites'
import MyHistory from './MyHistory'

export default function User() {
  const {username} = useParams()
  return (
    <>
      <Title>Hello {username}</Title>
      <Space mb={10}/>
      <Tabs grow>
        <Tabs.Tab label="Personal" icon={<InfoCircle size={20} />}><Personal username={username}/></Tabs.Tab>
        <Tabs.Tab label="Favourites" icon={<Heart size={20} />}><Favourites /></Tabs.Tab>
        <Tabs.Tab label="History" icon={<History size={20} />}><MyHistory username={username}/></Tabs.Tab>
      </Tabs>
    </>
  )
}
