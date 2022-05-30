import React, { useEffect, useState } from 'react'
import apiEndpoint from '../../Interfaces/Axios'
import { Box, SimpleGrid, Skeleton } from '@mantine/core'
import GameCard from './GameCard'

export default function ScrollView({ url }) {
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchRecommendations = async () => {
        try {
          const response = await apiEndpoint.get(url)
          setRecommendations(response.data.recommendations)
          console.log(recommendations);
          setLoading(false)
        } catch (error) {
          console.log(error.response);  
        }
      }

    useEffect(() => {
      fetchRecommendations()
    }, [])
    

  return (
    <SimpleGrid
    spacing="sm"
    breakpoints={[
      { maxWidth: 2896, cols: 8, spacing: 'sm' },
      { maxWidth: 2534, cols: 7, spacing: 'sm' },
      { maxWidth: 2172, cols: 6, spacing: 'sm' },
      { maxWidth: 1810, cols: 5, spacing: 'sm' },
      { maxWidth: 1448, cols: 4, spacing: 'sm' },
      { maxWidth: 1086, cols: 3, spacing: 'sm' },
      { maxWidth: 724, cols: 2, spacing: 'sm' },
      { maxWidth: 362, cols: 1, spacing: 'sm' },
    ]}
    style={{padding: 10}}
    >
      {/* ScrollView of {JSON.stringify(recommendations)} */}
      {recommendations?.map(r => (<Skeleton visible={loading} key={r.appid}><GameCard width={300} name={r.name} key={r.appid} id={r.appid} src={r.header_image}/></Skeleton>))}
    </SimpleGrid>   
  )
}
