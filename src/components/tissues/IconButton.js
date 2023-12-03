// ----------Inbuilt components and modules----------
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

// ----------Third-party components and modules----------
import Icon from 'react-native-vector-icons/Ionicons';

// ----------Constants----------
import {Colors} from '../../constants';

const IconButton = ({iconName, bgColor, iconColor, iconSize, btnFunc}) => {
  return (
    <TouchableOpacity
      style={[Styles.iconBtn, {backgroundColor: bgColor}]}
      onPress={() => btnFunc()}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
  },
});

export default IconButton;
