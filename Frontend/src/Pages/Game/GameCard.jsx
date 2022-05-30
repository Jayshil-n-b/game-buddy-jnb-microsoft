import { Image, Card, Text, SimpleGrid, Group } from '@mantine/core'
import React from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import useUserStore from '../../Interfaces/userStore'

export default function GameCard({id, src, name}) {
    const usertoken = sessionStorage.getItem('gameBuddyToken')

    const navigate = useNavigate()
    const location = useLocation()

    const handelNav = () => {
        navigate(`/game/${id}`, {replace: true})
        if(location.pathname.startsWith('/game')) navigate(0)
    }

  return (
        <Card shadow='xs' p='md' onClick={handelNav} sx={{
            '&:hover': {
                backgroundColor: '#3e4048',
            }
        }} style={{padding: 20}}>
            <Card.Section>
                <Image id={id} src={src}/>
            </Card.Section>
            <Card.Section>
                 <Group position='center'>{name}</Group>
            </Card.Section>
        </Card>
  )
}
