import { Box, Button, Group, Paper, TextInput, PasswordInput, MultiSelect, Text, Title, Space } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'
import apiEndpoint from '../../Interfaces/Axios';
import { showNotification } from '@mantine/notifications'
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons'
import { useNavigate } from 'react-router-dom'
import { genresData } from './genresData';

// TODO: Add error message when server is offline

export default function Register() {
  const navigate = useNavigate()

  const registerForm = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      genres: [],
    },
    validate: {
      username: (value) => (value.length ? null : 'Please Enter Username'),
      password: (value) => (value.length ? null : 'Please Enter Password'),
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords did not match' : null),
      genres: (value) => (value.length != 3 ? 'Please select exactly 3 genres' : null),
    },
  })

  const handleSubmit = async (values) => {
    try {
      const response = await apiEndpoint.post('/register', {
        "username": values.username,
        "password": values.password,
        "genres": values.genres,
        "history": [],
        "favourites": [],
      })
      const responseData = response.data;
      console.log(responseData);
      showNotification({
        title: 'Register Success',
        message: 'Enjoy Gaming!!',
        color: "teal",
        icon: <CheckIcon />,
      })
      navigate('/login')
    } catch (error) {
      showNotification({
        title: 'Incorrect Credentials',
        message: 'Please try again!!',
        color: "red",
        icon: <Cross1Icon />,
      })
      console.log(error.response);
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
    
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Title>Get into Gaming...</Title>
      <Space mb={20} />
      <form onSubmit={registerForm.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Username"
          placeholder="Username"
          {...registerForm.getInputProps('username')}
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Password"
          {...registerForm.getInputProps('password')}
        />

        <PasswordInput
          required
          label="Confirm Password"
          placeholder="Confirm Password"
          {...registerForm.getInputProps('confirmPassword')}
        />

        <MultiSelect 
          data={ genresData }
          label="Your favorite genres"
          placeholder="Pick 3 that you like" 
          {...registerForm.getInputProps('genres')}
        />

          <Group position="right" mt="md">
            <Text onClick={() => navigate('/login')} style={{textDecoration: 'underline'}}>Have Account ?</Text>
          </Group>

        <Group position="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
} 