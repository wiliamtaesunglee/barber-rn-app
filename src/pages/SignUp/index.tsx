import React, { useCallback, useRef } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  CreateAccountButton,
  CreateAccountButtonText,
 } from './styles';
import { useNavigation } from '@react-navigation/native';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback((data: object) => {
    console.log(data)
  }, [])
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleSignUp}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
              />
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
              />
              <Input
                name="Senha"
                icon="lock"
                placeholder="Senha"
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>

      </KeyboardAvoidingView>

      <CreateAccountButton
        onPress={() => navigation.navigate('SignIn')}
      >
        <Icon name="log-in" size={20} color="#ff9000"/>
        <CreateAccountButtonText>Fazer logon</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  )
}

export default SignIn;
