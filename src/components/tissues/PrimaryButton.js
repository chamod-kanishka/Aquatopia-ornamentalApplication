// ----------Inbuilt components and modules----------
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

// ----------Constants----------
import {Colors} from '../../constants';

const PrimaryButton = ({bgColor, txtColor, btnTxt, btnFunc}) => {
  return (
    <TouchableOpacity
      style={[Styles.primaryBtn, {backgroundColor: bgColor}]}
      onPress={() => btnFunc()}>
      <Text style={[Styles.primaryBtnTxt, {color: txtColor}]}>{btnTxt}</Text>
    </TouchableOpacity>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  primaryBtn: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    marginTop: 20,
  },
  primaryBtnTxt: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default PrimaryButton;
