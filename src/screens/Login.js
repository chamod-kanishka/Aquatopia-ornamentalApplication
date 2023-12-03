// ----------Inbuilt components and modules----------
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import {useContext, useState, useEffect} from 'react';

// ---------Third-party components & modules---------
import {useIsFocused} from '@react-navigation/native';

// ----------Custom components and modules----------
import {TextBox} from '../components/cells';
import {PrimaryButton, TitleImage} from '../components/tissues';
import {UrlContext, AuthContext} from '../contexts';
import {UseHttpRequest, UseAsyncStorage} from '../hooks';
import {ValidateForm} from '../validations';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Routes} from '../constants/';

const Login = ({navigation}) => {
  // Focus
  const isFocused = useIsFocused();

  // Http success actionstate
  const [HttpSuccessAction, SetHttpSuccessAction] = useState(0);

  // Login credentials state
  const [LoginData, SetLoginData] = useState({
    emailAddress: '',
    password: '',
  });

  // Urls context
  const {Urls} = useContext(UrlContext);

  // Auth context
  const {AuthData, SaveAuthData} = useContext(AuthContext);

  // Http request custom hook
  const {IsLoading, ResponseData, RequestError, SendRequest} = UseHttpRequest();

  // Async storage custom hook for auth info
  const {Values, SaveValues, ClearValues} = UseAsyncStorage('auth');

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
        // Save auth data to async storage
        SaveValues({
          auth: true,
          accessToken: ResponseData.accessToken,
          user: ResponseData.user,
        })
          .then(() => {
            // Save auth data to context
            SaveAuthData({
              auth: true,
              accessToken: ResponseData.accessToken,
              user: ResponseData.user,
            });

            // Navigate to home screen
            navigation.navigate(Routes.HOME);
          })
          .catch(error => console.log(error));
      }
    }
  }, [ResponseData, RequestError]);

  // Handle navigation based on auth data
  useEffect(() => {
    if (isFocused) {
      if (AuthData) {
        navigation.navigate(Routes.HOME);
      }
    }
  }, [isFocused]);

  // Function to handle login
  const HandleLogin = () => {
    // Validate form inputs
    const formError = ValidateForm(LoginData);

    if (formError) {
      Alert.alert('Error', formError);
      return;
    }

    // Send request
    SendRequest({
      method: 'POST',
      url: `${Urls.baseUrl}users/login`,
      headers: {
        'content-type': 'application/json',
      },
      data: LoginData,
    });

    SetHttpSuccessAction(1);
  };

  return (
    <SafeAreaView style={GlobalStyles.mainContainer}>
      <ScrollView
        style={GlobalStyles.scrollContainer}
        contentContainerStyle={GlobalStyles.scrollContentContainer}>
        <View style={GlobalStyles.titleContainer}>
          <Text style={GlobalStyles.titleTxt}>Login</Text>
          <TitleImage />
        </View>
        <TextBox
          password={false}
          placeTxt="Enter Email Address"
          bgColor={Colors.lightGray}
          txtColor={Colors.dark}
          setInput={txt => SetLoginData(prev => ({...prev, emailAddress: txt}))}
        />
        <TextBox
          password={true}
          placeTxt="Enter Password"
          bgColor={Colors.lightGray}
          txtColor={Colors.dark}
          setInput={txt => SetLoginData(prev => ({...prev, password: txt}))}
        />
        <View style={GlobalStyles.btnContainer}>
          <PrimaryButton
            bgColor={Colors.primary}
            txtColor={Colors.light}
            fullWidth={true}
            btnTxt="Login"
            btnFunc={() => HandleLogin()}
          />
          <PrimaryButton
            bgColor={Colors.secondary}
            txtColor={Colors.light}
            fullWidth={true}
            btnTxt="Register"
            btnFunc={() => navigation.navigate(Routes.REGISTER)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
