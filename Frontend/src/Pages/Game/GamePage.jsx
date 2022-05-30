import { Paper, Group, Text, Image, Container, Divider, Tabs, Stack, Title, Skeleton, Loader } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import apiEndpoint from '../../Interfaces/Axios'
import ScrollView from './ScrollView';
import Game from './Game';

export default function GamePage() {
  // const navigate = useNavigate()
  const { gameid } = useParams()
  const [game, setGame] = useState({})
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   navigate(`/game/${gameid}`)
  // }, [gameid])
  

  const fetchData = async () => {
    try {
      const response = await apiEndpoint.get(`/info/${gameid}`)
      setGame(response.data)
      console.log(game);
      setLoading(false)
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  
  if (loading) return (
    <Skeleton visible={loading} style={{
      height: "100vh",
    }}></Skeleton>
  )

  return (
    <Paper style={{
      backgroundImage: `url('${game.background}')`,
      maxWidth: "100vw",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}> 
      <Stack justify="space-around">
      {/* <Skeleton visible={loading}> */}
        <Game data={game} />
      {/* </Skeleton> */}
        <Title ml={20}>Recommendations</Title>
      <Divider size="sm" />
        <ScrollView url={`/recommend/${gameid}`} />
      <Divider size="sm" />
      </Stack>
    </Paper>
  )
}
