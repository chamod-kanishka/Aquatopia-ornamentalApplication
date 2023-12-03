// ----------Inbuilt components and modules----------
import {StyleSheet, View, Image} from 'react-native';

// ----------Constants----------
import {Images} from '../../constants';

const TitleImage = () => {
  return (
    <View style={Styles.imgContainer}>
      <Image style={Styles.img} source={Images.logo} />
    </View>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  imgContainer: {
    width: 40,
    height: 40,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default TitleImage;
