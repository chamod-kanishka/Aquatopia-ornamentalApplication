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

// ----------Third-party components and modules----------
import RadioButtonRN from 'radio-buttons-react-native';

// ----------Custom components and modules----------
import {TitleImage, IconButton, PrimaryButton} from '../components/tissues';
import {UrlContext, AuthContext} from '../contexts';
import {UseHttpRequest, UseAsyncStorage} from '../hooks';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Routes} from '../constants/';

const FindTreatments = ({navigation}) => {
  // Http success actionstate
  const [HttpSuccessAction, SetHttpSuccessAction] = useState(0);

  // Input state
  const [Inputs, SetInputs] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  });

  console.log(Inputs);

  // Urls context
  const {Urls} = useContext(UrlContext);

  // Auth context
  const {AuthData, ClearAuthData} = useContext(AuthContext);

  // Http request custom hook
  const {IsLoading, ResponseData, RequestError, SendRequest} = UseHttpRequest();

  // Async storage custom hook for auth info
  const {Values, SaveValues, ClearValues} = UseAsyncStorage('auth');

  // Radio button labels for symptoms
  const symptoms = [
    {
      label: 'Yes',
      value: 1,
    },
    {
      label: 'No',
      value: 0,
    },
  ];

  // Radio button labels for diseases
  const diseases = [
    {
      label: 'Dropsy',
      value: 0,
    },
    {
      label: 'Cloudy Eye',
      value: 1,
    },
    {
      label: 'Neurofibroma',
      value: 2,
    },
  ];

  // Handle http responses and errors
  useEffect(() => {
    // When fail
    if (RequestError) {
      console.log(RequestError);
      // Alert.alert('Error', RequestError.error.message);
    }

    // When success
    if (ResponseData) {
      if (HttpSuccessAction == 1) {
        console.log(ResponseData);
        Alert.alert('Treatment', ResponseData.result);
      }
    }
  }, [ResponseData, RequestError]);

  // Function check all properties of object have values
  const areAllPropertiesFilled = obj => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
          return false;
        }
      }
    }
    return true;
  };

  // Function to submit values
  const SubmitValues = () => {
    const result = areAllPropertiesFilled(Inputs);

    if (!result) {
      Alert.alert('Error', 'Please select all the options!');
      return;
    }

    const valuesArr = Object.values(Inputs);

    // Send request
    SendRequest({
      method: 'GET',
      url: `${Urls.fishTrIdUrl}predict?symptoms=${valuesArr}`,
      headers: {
        'content-type': 'multipart/form-data',
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
          <Text style={[GlobalStyles.titleTxt, {fontSize: 20}]}>
            Fish Treatments
          </Text>
          <TitleImage />
          <View style={Styles.iconBtnContainer}>
            {/* <IconButton
              iconName="cart"
              bgColor={Colors.primary}
              iconColor={Colors.dark}
              iconSize={20}
            /> */}
            <IconButton
              iconName="power"
              bgColor={Colors.primary}
              iconColor={Colors.dark}
              iconSize={20}
              btnFunc={() =>
                Alert.alert('Logout!', 'You want to logout!', [
                  {
                    text: 'OK',
                    onPress: () => {
                      ClearValues()
                        .then(() => {
                          ClearAuthData();
                          navigation.navigate(Routes.LOGIN);
                        })
                        .catch(error => console.log(error));
                    },
                  },
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                  },
                ])
              }
            />
          </View>
        </View>
        <View style={Styles.productContainer}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
            }}>
            <View style={{marginBottom: 10, marginLeft: 5, width: '80%'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                1) Loss of appetite
              </Text>
              <RadioButtonRN
                data={symptoms}
                selectedBtn={e =>
                  SetInputs(prev => ({...prev, input1: e.value}))
                }
              />
            </View>
            <View style={{marginBottom: 10, marginLeft: 5, width: '80%'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                2) Lethargic
              </Text>
              <RadioButtonRN
                data={symptoms}
                selectedBtn={e =>
                  SetInputs(prev => ({...prev, input2: e.value}))
                }
              />
            </View>
            <View style={{marginBottom: 10, marginLeft: 5, width: '80%'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                3) Abnormal body shape
              </Text>
              <RadioButtonRN
                data={symptoms}
                selectedBtn={e =>
                  SetInputs(prev => ({...prev, input3: e.value}))
                }
              />
            </View>
            <View style={{marginBottom: 10, marginLeft: 5, width: '80%'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                4) Foggy or bugling eyes
              </Text>
              <RadioButtonRN
                data={symptoms}
                selectedBtn={e =>
                  SetInputs(prev => ({...prev, input4: e.value}))
                }
              />
            </View>
            <View style={{marginBottom: 10, marginLeft: 5, width: '80%'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                5) Abnormal swimming patterns
              </Text>
              <RadioButtonRN
                data={symptoms}
                selectedBtn={e =>
                  SetInputs(prev => ({...prev, input5: e.value}))
                }
              />
            </View>
            <View style={{marginBottom: 10, marginLeft: 5, width: '80%'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>6) Disease</Text>
              <RadioButtonRN
                data={diseases}
                selectedBtn={e =>
                  SetInputs(prev => ({...prev, input6: e.value}))
                }
              />
            </View>
          </View>
          <PrimaryButton
            bgColor={Colors.primary}
            txtColor={Colors.light}
            fullWidth={false}
            btnTxt="Find"
            btnFunc={() => SubmitValues()}
          />
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
export default FindTreatments;
