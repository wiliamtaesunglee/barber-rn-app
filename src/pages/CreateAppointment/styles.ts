import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { Providers } from './index';
import { RectButton } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  available: boolean;
  selected: boolean;
}

export const DateTimePickerCalendar = styled(DateTimePicker).attrs({
  textColor: '#f4ede8'
})``;

export const Container = styled.View`
  flex: 1;
`

export const Button = styled.Button``;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background-color: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f5ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View``

export const ProvidersList = styled(
  FlatList as new () => FlatList<Providers>
)`
  padding: 32px 24px;
`

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  background-color: ${({ selected }) => (
    selected
      ? '#ff9000'
      : '#3e3b47'
  )};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;

export const ProviderImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  margin-left: 8px;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: ${({ selected }) => (
    selected
      ? '#232129'
      : '#f4ede8'
  )};
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  border-radius: 10px;
  margin: 0 8px 24px 0;

  background-color: ${({selected}) => (
    selected
    ? '#ff9000'
    : '#3e3b47'
  )};

  opacity: ${({ available }) => (
    available
    ? 1
    : .3
  )};
`;

export const HourText = styled.Text<HourTextProps>`
  font-family: 'RobotoSlab-Medium';

  color: ${({selected}) => (
    selected
    ? '#3e3b47'
    : '#f4ede8'
  )};
`;

export const CreateAppointmentButton = styled(OpenDatePickerButton)`
  height: 50px;
`;

export const CreateAppointmentButtonText = styled(OpenDatePickerButtonText)`
  font-size: 18px;
`;

