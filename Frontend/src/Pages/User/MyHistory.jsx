import { Title, Image, Group, Text, Paper, Space } from '@mantine/core'
import React, {useState, useEffect} from 'react'
import { Container } from 'tabler-icons-react'
import apiEndpoint from '../../Interfaces/Axios'

export default function MyHistory({username}) {

  const [history, setHistory] = useState([])

  const fetchHistory = async () => {
    try {
      const response = await apiEndpoint.get(`getUser/${username}`)
      setHistory(response.data.history)
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <Paper>
      {history?.map(h => <><Group align={'center'} spacing={'lg'}><Image width={200} src={h.header_image}></Image><Text>Time Played: {h.time} Mins</Text></Group><Space mb={10}/></>)}
    </Paper>
  )
}
