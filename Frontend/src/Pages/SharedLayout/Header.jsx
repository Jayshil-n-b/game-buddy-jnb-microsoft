import { Autocomplete, Group, Avatar, Image, SimpleGrid, Title, Container, Grid } from '@mantine/core'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Search } from 'tabler-icons-react'
import { data } from '../../resources/searchArray'
import logo from '../../resources/logo.png'
import MyMenu from './MyMenu'
// import { DeviceGamepad } from ''

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const [value, setValue] = useState('')

  const handleChange = (val) => {
    navigate(`/game/${val.appid}`)
    setValue('')
    if(location.pathname.startsWith('/game')) navigate(0)
  }
  
  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'xs' }]}>
      <Image onClick={() => navigate('/')} src={logo} width={200}/>
        <Group position='right'>
          <Autocomplete
            onItemSubmit={handleChange}
            icon = {<Search />}
            placeholder="Search game..."
            limit={6}
            data={data}
            value={value}
            onChange={setValue}
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
          <MyMenu />
        </Group>
      </SimpleGrid>
  )
}
