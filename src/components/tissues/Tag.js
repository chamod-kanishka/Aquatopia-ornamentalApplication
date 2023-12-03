// ----------Inbuilt components and modules----------
import {StyleSheet, View, Text} from 'react-native';

// ----------Constants----------
import {Colors} from '../../constants';

const Tag = ({bgColor, tagName, tagFunc}) => {
  return (
    <View
      style={[Styles.tagContainer, {backgroundColor: bgColor}]}
      onTouchStart={() => tagFunc()}>
      <Text style={Styles.tagTxt}>{tagName}</Text>
    </View>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  tagContainer: {
    borderRadius: 5,
    padding: 8,
    marginRight: 5,
  },
  tagTxt: {
    fontSize: 12,
    color: Colors.light,
  },
});

export default Tag;
