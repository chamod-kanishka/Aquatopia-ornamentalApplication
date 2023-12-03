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
import {useIsFocused} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import mime from 'mime';

// ----------Custom components and modules----------
import {TitleImage, IconButton, PrimaryButton} from '../components/tissues';
import {UrlContext, AuthContext} from '../contexts';
import {UseHttpRequest, UseAsyncStorage} from '../hooks';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Routes} from '../constants/';

const FishIdentification = ({navigation}) => {
  // Focus
  const isFocused = useIsFocused();

  // Http success actionstate
  const [HttpSuccessAction, SetHttpSuccessAction] = useState(0);

  // Urls context
  const {Urls} = useContext(UrlContext);

  // Image file state
  const [ImageFile, SetImageFile] = useState('');
  console.log(ImageFile);

  // Image source state
  const [ImageSource, SetImageSource] = useState('');

  // Result state
  const [Result, SetResult] = useState('');

  // Auth context
  const {AuthData, ClearAuthData} = useContext(AuthContext);

  // Http request custom hook
  const {IsLoading, ResponseData, RequestError, SendRequest} = UseHttpRequest();

  // Async storage custom hook for auth info
  const {Values, SaveValues, ClearValues} = UseAsyncStorage('auth');

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
        SetResult(ResponseData.result);
        SetImageFile('');
        SetImageSource('');
      }
    }
  }, [ResponseData, RequestError]);

  // Clear states on focus
  useEffect(() => {
    if (isFocused) {
      SetResult('');
      SetImageFile('');
      SetImageSource('');
    }
  }, [isFocused]);

  // Handle camera
  const handleCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 250,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        SetImageFile(image.path);
        SetImageSource('camera');
      })
      .catch(err => {
        if (err.code === 'E_PICKER_CANCELLED') {
          // here the solution
          return false;
        }
      });
  };

  // Handle gallery
  const handleGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 250,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        SetImageFile(image.path);
        SetImageSource('gallery');
      })
      .catch(err => {
        if (err.code === 'E_PICKER_CANCELLED') {
          // here the solution
          return false;
        }
      });
  };

  // Function to submit image
  const SubmitImage = () => {
    if (!ImageFile) {
      Alert.alert('Error', 'Please capture or select an image!');
      return;
    }

    // Setup form data
    const formData = new FormData();
    formData.append('file', {
      uri: ImageFile,
      type: mime.getType(ImageFile),
      name: ImageFile.split('/').pop(),
    });

    // Send request
    SendRequest({
      method: 'POST',
      url: `${Urls.fishIdUrl}predict`,
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formData,
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
            Fish Identification
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
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <IconButton
              iconName="camera-outline"
              bgColor={ImageSource == 'camera' ? Colors.primary : Colors.dark}
              iconColor={ImageSource == 'camera' ? Colors.dark : Colors.light}
              iconSize={40}
              btnFunc={() => handleCamera()}
            />
            <View style={{marginLeft: 20}}>
              <IconButton
                iconName="file-tray-outline"
                bgColor={
                  ImageSource == 'gallery' ? Colors.primary : Colors.gray
                }
                iconColor={
                  ImageSource == 'gallery' ? Colors.dark : Colors.light
                }
                iconSize={40}
                btnFunc={() => handleGallery()}
              />
            </View>
          </View>
          <PrimaryButton
            bgColor={Colors.primary}
            txtColor={Colors.light}
            fullWidth={false}
            btnTxt="Identify"
            btnFunc={() => SubmitImage()}
          />
          {Result ? (
            <Text style={{marginTop: 20, fontSize: 20, fontWeight: 'bold'}}>
              This is {Result}
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
export default FishIdentification;
