// ----------Inbuilt components and modules----------
import {StatusBar} from 'react-native';

// ----------Third-party components and modules----------
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ----------Custom components and modules----------
import {Welcome, Login, Register, Seller, Reward, Ornaments} from './src/screens';
import {BottomNavigator} from './src/navigation';
import {UrlProvider, AuthProvider} from './src/contexts';

// ----------Constants----------
import {Colors, Routes} from './src/constants';

// Create main navigation stack
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UrlProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar backgroundColor={Colors.light} barStyle="dark-content" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              presentation: 'card',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}>
            <Stack.Screen name={Routes.WELCOME} component={Welcome} />
            <Stack.Screen name={Routes.LOGIN} component={Login} />
            <Stack.Screen name={Routes.REGISTER} component={Register} />
            <Stack.Screen name={Routes.HOME} component={BottomNavigator} />
            <Stack.Screen name={Routes.SELLER} component={Seller} />
            <Stack.Screen name={Routes.REWARD} component={Reward} />
            <Stack.Screen name={Routes.ORNAMENTS} component={Ornaments}/>
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </UrlProvider>
  );
};

export default App;
