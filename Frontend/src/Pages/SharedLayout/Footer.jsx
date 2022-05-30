import { Center, Container, Space, Box, Text } from '@mantine/core'
import React from 'react'
import { Heart, Coffee } from 'tabler-icons-react'

export default function Footer() {
  return (
    <Box>
      <Space h="md"/>
      <Center style={{backgroundColor: 'purple'}} weight={1000}>
          Made with <Space w="xs"/> <Heart /> <Space w="xs"/> and <Space w="xs"/> <Coffee /> <Space w="xs"/> by Jayshil N. Buddhadev
      </Center>
    </Box>
    // <Text>Hii</Text>
  )
}
