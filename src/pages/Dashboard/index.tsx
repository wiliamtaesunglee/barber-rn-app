import React from 'react';

import { Container, Text, Button } from './styles';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth()
  return (
    <Container>
      <Text>Dashboard</Text>
      <Button title="Sair" onPress={signOut}></Button>
    </Container>
  )
};

export default Dashboard;
