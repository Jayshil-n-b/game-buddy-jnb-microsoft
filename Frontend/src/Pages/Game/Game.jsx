import React, {useState, useEffect} from 'react'
import { Box, Button, Center, Container, Grid, Group, Image, Space, Text, Title, Badge, Modal, Skeleton } from '@mantine/core'
import { DeviceGamepad2, HeartPlus } from 'tabler-icons-react'
import useUserStore from '../../Interfaces/userStore'
import GameModal from './GameModal'
import apiEndpoint from '../../Interfaces/Axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

export default function Game({data}) {

  const usertoken = sessionStorage.getItem('gameBuddyToken')
  const username = sessionStorage.getItem('username')
  const [playModalOpen, setPlayModalOpen] = useState(false)
  const [caraModalOpen, setCaraModalOpen] = useState(false)
  const [time, setTime] = useState(0)
  const [favourite, setFavourite] = useState(false)

  const fetchFavourite = async () => {
    try {
        const response = await apiEndpoint.get('/getFavourites')
        response.data.includes(data.appid) ? setFavourite(true) : setFavourite(false)
    } catch (error) {
        console.log(error.response);
    }
  }

  useEffect(() => {
    fetchFavourite()
  }, [])
  
  const handleFav = async () => {
      console.log(`Added ${data.appid}`);
      try {
        const response = await apiEndpoint.post('/toggleFavourite', {
            "appid": data.appid,
            "name": data.name,
            "header_image": data.header_image
        })
        setFavourite(p => !p)
        console.log(response.data);
      } catch (error) {
          console.log(error.response);
      }
  }

  const sendTimeToServer = async (min) => {
    try {
        const response = await apiEndpoint.post('/addHistory', {
            "time": min,
            "appid": data.appid,
            "header_image": data.header_image
        })
        console.log(response.data);
    } catch (error) {
        console.log(error.response);
    }
  }

  const handlePlayModalClose = () => {
      setPlayModalOpen(false)
      const sessionTime = time
      setTime(0)
      console.log(sessionTime);
      sendTimeToServer(time/60)
  }

  return (
      <>
        <Modal opened={playModalOpen} onClose={handlePlayModalClose} title={`Playing ${data.name}`}>
            <GameModal gameid={data.appid} time={time} setTime={setTime} />
        </Modal>
        <Modal opened={caraModalOpen} onClose={()=>setCaraModalOpen(false)} title={`Photos of ${data.name}`}>
            <Carousel showArrows={true} showThumbs={false}>
                {data?.screenshots.map(ss => <Image key={ss.id} src={ss.path_full}/>)}
            </Carousel>
        </Modal>
        <Box >
            <Space mb={10} />
            <Title ml={20}>{data?.name}</Title>
            <Text ml={20}>{data?.developer}</Text>
            <Grid grow  style={{padding: 20, margin: 5}}>
                <Grid.Col md={6} lg={3}><Image onClick={() => setCaraModalOpen(true)} src={data?.header_image} width="100%" /></Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <Text>
                        {data?.short_description}
                    </Text>
                    <Space mb={10} />
                    <Box>
                        {data?.steamspy_tags?.map((c, i) => <Badge key={i} style={{marginRight: 10}}>{c}</Badge>)}
                    </Box>
                    <Space mb={20} />
                    {usertoken ? <Group position='center'>
                        <Button color={favourite ? "red" : "green"} onClick={() => handleFav(data.appid)}><HeartPlus style={{marginRight: 10}} />{favourite ? "Remove From Favourite" : "Add To Favourite"}</Button>
                        <Button color={'green'} onClick={() => setPlayModalOpen(true)}><DeviceGamepad2 style={{marginRight: 10}} />Play Now</Button>
                    </Group> : <Center style={{fontWeight: 500, color: "red"}}>Sign-in To Play</Center> }
                </Grid.Col>
            </Grid>
            {/* {usertoken ? <Group position='center'>
                <Button><HeartPlus style={{marginRight: 10}}/>Add To Favorite</Button>
                <Button onClick={()=>setPlayModalOpen(true)}><DeviceGamepad2 style={{marginRight: 10}} />Play Now</Button>
            </Group> : null } */}
        </Box>
    </>
  )
}
