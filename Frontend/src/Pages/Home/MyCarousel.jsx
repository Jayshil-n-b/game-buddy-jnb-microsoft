import { Center, Image, Space, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { useNavigate } from 'react-router-dom'
import apiEndpoint from '../../Interfaces/Axios'

export default function MyCarousel({user}) {
    const [img, setImg] = useState([])

    const navigate = useNavigate()

    const fetchImage = async () => {
        const response = await apiEndpoint.get('/carouselApps')
        setImg(response.data)
        console.log(response.data);
    }

    useEffect(() => {
      console.log("My Carousel");
      fetchImage()
    }, [])
    
  return (
    <Carousel infiniteLoop showThumbs={false} showArrows={true} interval={2000} autoPlay autoFocus>
        {user?.history.length ? <><Title key={-1}>Continue Playing...</Title><Space key={1} mb={10}/><Image key={0} onClick={() => navigate(`/game/${user?.history[user?.history.length-1].appid}`)} width={600} src={user?.history[user?.history.length-1].header_image}/></> : <Center><Title>Welcome To The World Of Gaming</Title></Center>}
        {img?.map(c => <><Title key={c[0]?.appid}>{c[0]?.name}</Title><Space key={2} mb={10}/><Image key={c[0]?.appid+1} onClick={() => navigate(`/game/${c[0]?.appid}`)} width={600} src={c[0]?.header_image}/></>)}
    </Carousel>
    // <Text>{JSON.stringify(user?.history)}</Text>
  )
}
