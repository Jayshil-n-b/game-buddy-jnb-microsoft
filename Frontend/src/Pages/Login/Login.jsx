import { Box, Button, Group, Paper, TextInput, PasswordInput, Title, Space, Text, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import apiEndpoint from '../../Interfaces/Axios';
import { showNotification } from '@mantine/notifications'
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons'
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../../Interfaces/userStore';

// TODO: Add error message when server is offline

export default function Login() {

  // const location = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // console.log(location);
    console.log("Login");
  }, [])

  const navigate = useNavigate()

  const setUserName = useUserStore((state) => state.setUserName);
  const setUserToken = useUserStore((state) => state.setUserToken)

  const loginForm = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.length ? null : 'Please Enter Username'),
      password: (value) => (value.length ? null : 'Please Enter Password'),
    },
  })

  const handleSubmit = async (values) => {
    setVisible(true)
    try {
      const response = await apiEndpoint.post('/login', {
        "username": values.username,
        "password": values.password 
      })
      const responseData = response.data;
      setUserName(values.username)
      showNotification({
        title: 'Login Success',
        message: 'Enjoy Gaming!!',
        color: "teal",
        icon: <CheckIcon />,
      })
      sessionStorage.setItem('gameBuddyToken', responseData.access_token)
      setUserToken(responseData.access_token)
      setVisible(false)
      navigate('/')
    } catch (error) {
      showNotification({
        title: 'Incorrect Credentials',
        message: 'Please try again!!',
        color: "red",
        icon: <Cross1Icon />,
      })
      console.log(error.response);
      setVisible(false)
    }
  }

  // style={{
  //   backgroundColor: "lightblue",
  //   padding: 12,
  //   borderRadius: 5,
  //   marginTop: 20
  // }}

  // style={{
  //   backgroundColor: "pink"
  // }}

  return (
    <Paper>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <Title>Welcome Back...</Title>
        <Space mb={20} />

        <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={visible} />
          <form onSubmit={loginForm.onSubmit(handleSubmit)} >
            <TextInput
              required
              label="Username"
              placeholder="Username"
              {...loginForm.getInputProps('username')}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Password"
              {...loginForm.getInputProps('password')}
            />
            
            <Group position="right" mt="md">
              <Text onClick={() => navigate('/register')} style={{textDecoration: 'underline'}}>New User ?</Text>
            </Group>

            <Group position="center" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </div>

      </Box>
    </Paper>
  );
} 