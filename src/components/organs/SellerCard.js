// ----------Inbuilt components and modules----------
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

// ----------Constants----------
import {Colors, Images} from '../../constants';


const imagePaths = {
  gurami: require('../../../assets/images/gurami.png'),
  carp: require('../../../assets/images/carp.png'),
  goldfish: require('../../../assets/images/goldfish.png'),
  molly: require('../../../assets/images/molly.png'),
  fighters: require('../../../assets/images/fighter.png'),
  angelfish: require('../../../assets/images/angel.png'),
  // Add more fish and their respective image paths here
};

const SellerCard = ({ fish, btnFunc }) => {
  const imagePath = imagePaths[fish] || require('../../../assets/images/carp.png');

  return (
    <TouchableOpacity
      style={Styles.productCardContainer}
      onPress={() => btnFunc()}
    >
      <Image style={Styles.productImg} source={imagePath} />
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: '30%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <Text style={Styles.productTitle}>{fish}</Text>
      </View>
    </TouchableOpacity>
  );
};




// Internal styles
const Styles = StyleSheet.create({
  productCardContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    padding: 10,
  },
  productImg: {
    width: '100%',
    height: '75%',
    resizeMode: 'cover',
    marginTop: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  productPrice: {
    fontSize: 15,
    color: Colors.dark,
    marginTop: 5,
  },
  addToCartBtnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 12,
  },
  productSeller: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.primary,
    color: Colors.dark,
  },
});
export default SellerCard;
