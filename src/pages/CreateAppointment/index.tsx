import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { Platform, Alert } from 'react-native';
import { format } from 'date-fns';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderImage,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  SectionContent,
  SectionTitle,
  Section,
  Hour,
  HourText,
  DateTimePickerCalendar,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';

interface RouteParams {
  providerId: string;
}

export interface Providers {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack, navigate } = useNavigation();
  const { providerId } = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0)
  const [providers, setProviders] = useState<Providers[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data)
    })
  }, []);

  useEffect(() => {
    api.get(`providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      }
    })
    .then((response) => {
      setAvailability(response.data);
    });
  }, [selectedDate, selectedProvider]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectedProvider = useCallback((idProvider: string) => {
    setSelectedProvider(idProvider);
  }, []);

  const handleOpenDatePicker = useCallback(() => {
    setShowDatePicker(prevState => !prevState);
  }, []);

  const handleDateChange = useCallback((_, date) => {
    if (Platform.OS === 'android') setShowDatePicker(prevState => !prevState)
    if (date) {
      setSelectedDate(date)
    }
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigate('AppointmentCreated', {
        date: date.getTime()
      });
    } catch (err) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao tentar criar um agendamento'
      )
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return availability.filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  const afternoonAvailability = useMemo(() => {
    return availability.filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }}/>
      </Header>

      <Content>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                selected={provider.id === selectedProvider}
                onPress={() => handleSelectedProvider(provider.id)}
              >
                <ProviderImage source={{ uri: provider.avatar_url}}/>
                <ProviderName
                  selected={provider.id === selectedProvider}
                >
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Calendar>
          <Title>Escolha a data</Title>

          <OpenDatePickerButton onPress={handleOpenDatePicker}>
              <OpenDatePickerButtonText>Selecionar Data</OpenDatePickerButtonText>
          </OpenDatePickerButton>

          {showDatePicker && (
            <DateTimePickerCalendar
              onChange={handleDateChange}
              mode="date"
              display="calendar"
              value={selectedDate}
            />
          )}
        </Calendar>

        <Schedule>
        <Title>Escolha o Horário</Title>
        <Section>
          <SectionTitle>Manhã</SectionTitle>
        </Section>
        <SectionContent>
        {
          morningAvailability.map(({ hourFormatted, hour, available }) => (
            <Hour
              selected={selectedHour === hour && available}
              available={available}
              key={hourFormatted}
              onPress={() => handleSelectHour(hour)}
            >
              <HourText
                selected={selectedHour === hour && available}
                available={available}
              >{hourFormatted}</HourText>
            </Hour>
          ))
        }
        </SectionContent>

        <Section>
          <SectionTitle>Tarde</SectionTitle>
        </Section>
        <SectionContent>
        {
          afternoonAvailability.map(({ hourFormatted, hour, available }) => (
            <Hour
              enabled={available}
              selected={selectedHour === hour && available}
              available={available}
              key={hourFormatted}
              onPress={() => handleSelectHour(hour)}
            >
              <HourText
                selected={selectedHour === hour && available}
                available={available}
              >{hourFormatted}</HourText>
            </Hour>
          ))
        }
        </SectionContent>
      </Schedule>

      <CreateAppointmentButton onPress={handleCreateAppointment}>
        <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
      </CreateAppointmentButton>
      </Content>
    </Container>
  )
};

export default CreateAppointment;
