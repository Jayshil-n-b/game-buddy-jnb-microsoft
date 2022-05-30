import React, { useState, useEffect } from 'react'
import { Menu, Avatar, Button, Title } from '@mantine/core'
import { Logout, Settings, SettingsAutomation, SettingsOff } from 'tabler-icons-react'
import useUserStore from '../../Interfaces/userStore'
import { useNavigate } from 'react-router-dom'
import apiEndpoint from '../../Interfaces/Axios'

export default function MyMenu() {
  const navigate = useNavigate()

  const setUserName = useUserStore(state => state.setUserName)
  const setUserToken = useUserStore(state => state.setUserToken)
  const usertoken = sessionStorage.getItem('gameBuddyToken')
  const username = useUserStore(state => state.username)
  // const [username, setUsernameState] = useState('')

  const getUsername = async () => {
    try {
      const response = await apiEndpoint.get('/getUsername')
      setUserName(response.data.username)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    if (usertoken) getUsername()
  }, [])
  

  const handleLogout = () => {
    console.log("Logout!!");
    setUserName("")
    setUserToken(null)
    sessionStorage.clear('gameBuddyToken')
    navigate('/')
  }

  if (!username) return <Button onClick={() => navigate('/login')}>Login</Button>
  else return (
    <Menu control={<Avatar size={50} />}>
        <Menu.Item onClick={() => navigate(`/user/${username}`)} icon={<SettingsAutomation size={14} />}>Account</Menu.Item>
        <Menu.Item onClick={()=>handleLogout()} icon={<Logout size={14} color='red' />}>Logout</Menu.Item>
    </Menu>
  )
}
