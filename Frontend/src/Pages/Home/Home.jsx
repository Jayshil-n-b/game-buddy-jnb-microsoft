import { Divider, LoadingOverlay, Tabs, Text, Title } from '@mantine/core';
import { GlobeIcon, MixIcon } from '@modulz/radix-icons';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Heart, Planet, TestPipe } from 'tabler-icons-react';
import apiEndpoint from '../../Interfaces/Axios';
import useUserStore from '../../Interfaces/userStore';
import ScrollView from '../Game/ScrollView';
import MyCarousel from './MyCarousel';
import Recommendations from './Recommendations';
import FavouriteRec from './FavouriteRec';

export default function Home() {
  const userToken = sessionStorage.getItem('gameBuddyToken')
  const [user, setUser] = useState(null)
  const setUserName = useUserStore(state => state.setUserName)
  const setUserToken = useUserStore(state => state.setUserToken)
  const username = useUserStore(state => state.username)

  const [visible, setVisible] = useState(false)

  const getUser = async () => {
    try {
      setUserToken('userToken')
      console.log("user call", userToken)
      const response = await apiEndpoint.get('/getUsername')
      setUserName(response.data.username)
      const userName = response.data.username
      const userDataResponse = await apiEndpoint.get(`/getUser/${userName}`)
      setUser(userDataResponse.data)
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    console.log("Home");
    setVisible(true)
    if (userToken) getUser()
    setVisible(false)
  }, [userToken])

  if (!userToken) return <Navigate to="/login" />
  else return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={visible} />
        <Tabs grow>
          <Tabs.Tab label="My Dashboard" icon={<MixIcon size={20} />}>
            <MyCarousel user={user}/>
            <Recommendations user={user}/>
          </Tabs.Tab>
          <Tabs.Tab label="Based On Favourites" icon={<Heart size={20} />}>
            <ScrollView url={`/favouriteRecs`}/>
          </Tabs.Tab>
          <Tabs.Tab label="Average Recommendations" icon={<TestPipe size={20} />}>
            <ScrollView url={`/userAverageRecommendations`}/>
          </Tabs.Tab>
        </Tabs>
    </div>
  )
}

