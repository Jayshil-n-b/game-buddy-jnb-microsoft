import { Paper, Text, Badge } from '@mantine/core'
import React, {useState, useEffect} from 'react'
import apiEndpoint from '../../Interfaces/Axios'

export default function ({username}) {

  const [genres, setGenres] = useState([])

  const fetchGenres = async () => {
    try {
      const response = await apiEndpoint(`/getUser/${username}`)
      setGenres(response.data.genres)
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    fetchGenres()
  }, [])
  

  return (
    <Paper>
      <Text>Username: {username}</Text>
      <Text>Genres: {genres?.map(g => <Badge>{g}</Badge>)}</Text>
    </Paper>
  )
}
