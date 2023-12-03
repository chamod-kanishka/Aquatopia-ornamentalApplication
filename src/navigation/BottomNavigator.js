// ----------Third-party components and modules----------
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// ----------Custom components and modules----------
import {
  Ornaments,
  Products,
  FishIdentification,
  DiseaseIdentification,
  FindTreatments,
} from '../screens/';

// ----------Constants----------
import {Colors, Routes} from '../constants';

// Create bottom tabs navigator
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: Colors.light,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: Colors.dark,
          marginBottom: 5,
        },
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.dark,
      }}>
      <Tab.Screen
        name={Routes.PRODUCTS}
        component={Products}
        options={{
          tabBarIcon: ({color}) => <Icon name="card" color={color} size={28} />,
        }}
      />
      <Tab.Screen
        name={Routes.FISH_IDENTIFY}
        component={FishIdentification}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="color-filter" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.DISEASE_IDENTIFY}
        component={DiseaseIdentification}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="fitness" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.TREATMENTS}
        component={FindTreatments}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="rocket" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigator;
