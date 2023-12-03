// ----------Inbuilt components and modules----------
import {SafeAreaView, Text, View, ScrollView, Alert} from 'react-native';
import {useContext, useState, useEffect} from 'react';

// ----------Custom components and modules----------
import {TextBox} from '../components/cells';
import {PrimaryButton, TitleImage} from '../components/tissues';
import {UrlContext} from '../contexts';
import {UseHttpRequest} from '../hooks';
import {ValidateForm} from '../validations';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Routes} from '../constants';

const Register = ({navigation}) => {
  // Http success actionstate
  const [HttpSuccessAction, SetHttpSuccessAction] = useState(0);

  // Register state
  const [RegisterData, SetRegisterData] = useState({
    fullName: '',
    emailAddress: '',
    password: '',
  });

  // Urls context
  const {Urls} = useContext(UrlContext);

  // Http request custom hook
  const {IsLoading, ResponseData, RequestError, SendRequest} = UseHttpRequest();

  // Handle http responses and errors
  useEffect(() => {
    // When fail
    if (RequestError) {
      Alert.alert('Error', RequestError.error.message);
    }

    // When success
    if (ResponseData) {
      if (HttpSuccessAction == 1) {
        Alert.alert('Success', ResponseData.success.message);

        // Navigate to login screen
        navigation.navigate(Routes.LOGIN);
      }
    }
  }, [ResponseData, RequestError]);

  // Function to handle register
  const HandleRegister = () => {
    // Validate form inputs
    const formError = ValidateForm(RegisterData);

    if (formError) {
      Alert.alert('Error', formError);
      return;
    }

    // Send request
    SendRequest({
      method: 'POST',
      url: `${Urls.baseUrl}users/register`,
      headers: {
        'content-type': 'application/json',
      },
      data: RegisterData,
    });

    SetHttpSuccessAction(1);
  };

  return (
    <SafeAreaView style={GlobalStyles.mainContainer}>
      <ScrollView
        style={GlobalStyles.scrollContainer}
        contentContainerStyle={GlobalStyles.scrollContentContainer}>
        <View style={GlobalStyles.titleContainer}>
          <Text style={GlobalStyles.titleTxt}>Register</Text>
          <TitleImage />
        </View>
        <TextBox
          password={false}
          placeTxt="Enter Full Name"
          bgColor={Colors.lightGray}
          txtColor={Colors.dark}
          setInput={txt => SetRegisterData(prev => ({...prev, fullName: txt}))}
        />
        <TextBox
          password={false}
          placeTxt="Enter Email Address"
          bgColor={Colors.lightGray}
          txtColor={Colors.dark}
          setInput={txt =>
            SetRegisterData(prev => ({...prev, emailAddress: txt}))
          }
        />
        <TextBox
          password={true}
          placeTxt="Enter Password"
          bgColor={Colors.lightGray}
          txtColor={Colors.dark}
          setInput={txt => SetRegisterData(prev => ({...prev, password: txt}))}
        />
        <View style={GlobalStyles.btnContainer}>
          <PrimaryButton
            bgColor={Colors.primary}
            txtColor={Colors.light}
            fullWidth={true}
            btnTxt="Register"
            btnFunc={() => HandleRegister()}
          />
          <PrimaryButton
            bgColor={Colors.secondary}
            txtColor={Colors.light}
            fullWidth={true}
            btnTxt="Login"
            btnFunc={() => navigation.navigate(Routes.LOGIN)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
