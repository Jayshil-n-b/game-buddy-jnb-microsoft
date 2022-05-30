import { Divider, Title, Space } from '@mantine/core';
import React from 'react'
import apiEndpoint from '../../Interfaces/Axios';
import ScrollView from '../Game/ScrollView';

export default function Recommendations({user}) {
  return (
    <>
        <Space mb={20} />
        <Title>Recommendations</Title>
        <Divider size="sm" />
        <ScrollView url={'/getRecommendations'}/>
    </>
  )
}
