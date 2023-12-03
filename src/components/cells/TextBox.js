// ----------Inbuilt components and modules----------
import {StyleSheet, TextInput} from 'react-native';

const TextBox = ({bgColor, txtColor, placeTxt, password, setInput}) => {
  return (
    <TextInput
      secureTextEntry={password}
      style={[Styles.textInput, {backgroundColor: bgColor, color: txtColor}]}
      placeholder={placeTxt}
      onChangeText={txt => setInput(txt)}
    />
  );
};

// Internal styles
const Styles = StyleSheet.create({
  textInput: {
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    marginTop: 20,
  },
});

export default TextBox;
