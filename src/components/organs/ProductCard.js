// ----------Inbuilt components and modules----------
import {StyleSheet, View, Text, Image,TouchableOpacity} from 'react-native';

// ----------Custom components and modules----------
import {IconButton} from '../tissues';

// ----------Constants----------
import {Colors} from '../../constants';

const ProductCard = ({imgPath, title, price, seller,btnFunc}) => {
  return (
    <TouchableOpacity style={Styles.productCardContainer}
    onPress={() => btnFunc()}>
      <Image style={Styles.productImg} source={imgPath} />
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: '30%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 20,
        }}>
        <Text style={Styles.productTitle}>{title}</Text>
        {/* <View style={Styles.addToCartBtnContainer}>
          <IconButton
            iconName="add-circle"
            bgColor={Colors.light}
            iconColor={Colors.dark}
            iconSize={25}
            btnFunc={() => console.log('Add to cart')}
          />
        </View> */}
      </View>
      <Text
        style={Styles.productSeller}
        onTouchStart={() => console.log('hello')}>
        {seller}
      </Text>
    </TouchableOpacity>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  productCardContainer: {
    position: 'relative',
    width: '100%',
    height: 270,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  productImg: {
    width: '70%',
    height: '70%',
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
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
});
export default ProductCard;
