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

// ----------Custom components and modules----------
import {PrimaryButton, IconButton, Tag} from '../components/tissues';
import {UrlContext, AuthContext} from '../contexts';
import {UseHttpRequest, UseAsyncStorage} from '../hooks';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Routes, Images} from '../constants/';

const Reward = ({navigation, route}) => {
  // Http success actionstate
  const [HttpSuccessAction, SetHttpSuccessAction] = useState(0);
  console.log(route.params);

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
        Alert.alert('Success', ResponseData.result);
        setTimeout(() => {
          navigation.navigate(Routes.HOME);
        }, 1000);
      }
    }
  }, [ResponseData, RequestError]);

  // Function to submit reward
  const SubmitReward = r => {
    // Send request
    SendRequest({
      method: 'GET',
      url: `${Urls.reenUrl}update?productid=${parseInt(route.params.fishId)}&productcount=6&sellercount=25&recommendedseller=${parseInt(route.params.sellerId)}&reward=${r}`,
      headers: {
        'content-type': 'application/json',
      },
      data: {},
    });

    SetHttpSuccessAction(1);
  };

  return (
    <SafeAreaView style={GlobalStyles.mainContainer}>
      <ScrollView
        style={GlobalStyles.scrollContainer}
        contentContainerStyle={[
          GlobalStyles.scrollContentContainer,
          {justifyContent: 'flex-start'},
        ]}>
        <View
          style={[GlobalStyles.titleContainer, {justifyContent: 'flex-start'}]}>
          <IconButton
            iconName="arrow-back-outline"
            bgColor={Colors.primary}
            iconColor={Colors.dark}
            iconSize={20}
            btnFunc={() => navigation.goBack()}
          />
        </View>
        <View style={Styles.productContainer}>
          <PrimaryButton
            bgColor={Colors.primary}
            txtColor={Colors.light}
            fullWidth={true}
            btnTxt="Good"
            btnFunc={() => SubmitReward(1)}
          />
          <PrimaryButton
            bgColor={Colors.dark}
            txtColor={Colors.light}
            fullWidth={true}
            btnTxt="Bad"
            btnFunc={() => SubmitReward(-1)}
          />
          <PrimaryButton
            bgColor={Colors.gray}
            txtColor={Colors.light}
            fullWidth={true}
            btnTxt="Neutral"
            btnFunc={() => SubmitReward(0)}
          />
          {IsLoading ? (
            <Text style={{marginTop: 10}}>
              Wait to finish the reward submission...
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  iconBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  categoryContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 20,
  },
  productContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: Colors.light,
    marginTop: 20,
    borderRadius: 15,
  },
});
export default Reward;
