// ----------Inbuilt components and modules----------
import {StyleSheet, View, ScrollView, Image, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useContext, useEffect} from 'react';

// ---------Third-party components & modules---------
import {useIsFocused} from '@react-navigation/native';

// ---------Custom components & modules---------
import {AuthContext} from '../contexts';
import {UseAsyncStorage} from '../hooks';
import {PrimaryButton} from '../components/tissues';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Images, Routes} from '../constants';

const Welcome = ({navigation}) => {
  // Focus
  const isFocused = useIsFocused();

  // Auth context
  const {SaveAuthData} = useContext(AuthContext);

  // Async storage custom hook for auth info
  const {Values, SaveValues, ClearValues} = UseAsyncStorage('auth');

  // Set auth data from async storage to context
  useEffect(() => {
    if (Values) {
      SaveAuthData(Values);
    }
  }, [Values, isFocused]);

  return (
    <SafeAreaView style={GlobalStyles.mainContainer}>
      <ScrollView
        style={GlobalStyles.scrollContainer}
        contentContainerStyle={GlobalStyles.scrollContentContainer}>
        <View style={Styles.topContainer}>
          <Image style={Styles.img} source={Images.logo} />
        </View>
        <View style={Styles.bottomContainer}>
          <Text style={Styles.titleTxt}>Aquatopia</Text>
          <Text style={Styles.subTitleTxt}>Your one an only fish portal!</Text>
          <View style={Styles.btnContainer}>
            <PrimaryButton
              bgColor={Colors.primary}
              txtColor={Colors.light}
              btnTxt="Get Started"
              btnFunc={() => navigation.navigate(Routes.LOGIN)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  topContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: '100%',
    resizeMode: 'contain',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.dark,
  },
  subTitleTxt: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.gray,
  },
  btnContainer: {
    width: '60%',
  },
});

export default Welcome;
