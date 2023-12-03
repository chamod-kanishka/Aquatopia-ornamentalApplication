// ----------Inbuilt components and modules----------
// ----------Inbuilt components and modules----------
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';


import {useContext, useState, useEffect} from 'react';

// ----------Custom components and modules----------
import {TextBox} from '../components/cells';
import AxiosService from '../libraries/AxiosService';
import {TitleImage, IconButton, Tag} from '../components/tissues';
import {ProductCard} from '../components/organs';
import {UrlContext, AuthContext} from '../contexts';
import {UseHttpRequest, UseAsyncStorage} from '../hooks';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Routes, Images} from '../constants/';

// ---------Third-party components & modules---------
import {useIsFocused} from '@react-navigation/native';

const Seller = ({navigation, route}) => {

  console.log(route.params.fishCode);

   // Focus
 const isFocused = useIsFocused();

 // Tag status
 const [tag, setTag] = useState(0);

 // Products state
 const [Products, SetProducts] = useState([]);

  // Http success actionstate
  const [HttpSuccessAction, SetHttpSuccessAction] = useState(0);

  // Urls context
  const {Urls} = useContext(UrlContext);

  // Auth context
  const {AuthData, ClearAuthData} = useContext(AuthContext);

  // Http request custom hook
  const {IsLoading, ResponseData, RequestError, SendRequest} = UseHttpRequest();

  // Async storage custom hook for auth info
  const {Values, SaveValues, ClearValues} = UseAsyncStorage('auth');

  // All sellers and bes seller
  useEffect(() => {
    if (tag == 0) {
      LoadProducts();
    } else {
      BestSeller();
    }
  }, [tag]);

  // Handle navigation based on auth data
  useEffect(() => {
    if (isFocused) {
      if (tag == 0) {
        LoadProducts();
      } else {
        BestSeller();
      }
    }
  }, [isFocused]);

  useEffect(() => {
    // When fail
    if (RequestError) {
      console.log(RequestError);
      // Alert.alert('Error', RequestError.error.message);
    }

    // When success
    if (ResponseData) {
      if (HttpSuccessAction == 1) {
        
        SetProducts(ResponseData.sellers);
      }

      // if (HttpSuccessAction == 2) {
      //   const recommendedSeller = parseInt(JSON.parse(response.data.result).recommended_seller);
      //   console.log(recommendedSeller);
      //   BestSellerInfo(recommendedSeller);
       
      // }

      if (HttpSuccessAction == 3) {
        console.log(ResponseData.seller.fullName);
      }
    }
  }, [ResponseData, RequestError]);

  // Function to load sellers By Product
  const LoadProducts = () => {
    // Send request
    SendRequest({
      method: 'GET',
      url: `${Urls.baseUrl}sellers/all/${route.params.fishCode}`,
      headers: {
        'content-type': 'application/json',
      },
      data: {},
    });

    SetHttpSuccessAction(1);
  };

  const BestSeller = () => {
    const config = {
      method: 'GET',
      url: `${Urls.reenUrl}recommend?productid=${route.params.fishCode}&productcount=6&sellercount=25`,
      headers: {
        'content-type': 'application/json',
      },
      data: {},
    };
  
    AxiosService(config)
      .then((response) => {
        console.log('BestSeller Response:', response);
  
        if (response && response.result) {
          const resultObject = JSON.parse(response.result);
          const recommendedSeller = parseInt(resultObject.recommended_seller);
          console.log('Recommended Seller:', recommendedSeller);
          BestSellerInfo(recommendedSeller);
          SetHttpSuccessAction(3);
        } else {
          console.error('Invalid response format from the server');
        }
      })
      .catch((error) => {
        console.error('BestSeller Error:', error);
      });
  };

  // const BestSeller = () => {
  //   // Send request
  //   SendRequest({
  //     method: 'GET',
  //     url: `${Urls.reenUrl}recommend?productid=${route.params.fishCode}&productcount=6&sellercount=25`,
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     data: {},
  //   })
  //   .then(response => {
  //     console.log('BestSeller Response:', response);
  
  //     if (response && response.data && response.data.result) {
  //       const resultObject = JSON.parse(response.data.result);
  //       const recommendedSeller = resultObject.recommended_seller;
  //       console.log('Recommended Seller:', recommendedSeller);
  //       BestSellerInfo(recommendedSeller);
  //       // SetHttpSuccessAction(2);  // Set action after processing data
  //     } else {
  //       console.error('Invalid response format from the server');
  //     }
  //   })
  //   .catch(error => {
  //     console.error('BestSeller Error:', error);
  //   });
  // };
  
  

  // Function to get best seller information
  
  
  const BestSellerInfo = id => {
    console.log(id);
    // SetSellerId(id);
    // Send request
    SendRequest({
      method: 'GET',
      url: `${Urls.baseUrl}sellers/one/${id}`,
      headers: {
        'content-type': 'application/json',
      },
      data: {},
    })
    // .then(result => {
    //   if (result) {
    //     console.log(result);
    //     SetHttpSuccessAction(3);
    //   } else {
    //     console.error('Invalid response format from the server');
    //   }
    // })
    // .catch(error => {
    //   console.error('Error in BestSellerInfo:', error);
    // });
  
  };



  return (
    <SafeAreaView style={GlobalStyles.mainContainer}>
      <ScrollView
        style={GlobalStyles.scrollContainer}
        contentContainerStyle={[
          GlobalStyles.scrollContentContainer,
          {justifyContent: 'flex-start'},
        ]}>
        <View
          style={[GlobalStyles.titleContainer, {justifyContent: 'flex-start'}]}>
          <IconButton
            iconName="arrow-back-outline"
            bgColor={Colors.primary}
            iconColor={Colors.dark}
            iconSize={20}
            btnFunc={() => navigation.goBack()}
          />
          {/* <View style={Styles.iconBtnContainer}>
            <IconButton
              iconName="cart"
              bgColor={Colors.primary}
              iconColor={Colors.dark}
              iconSize={20}
            />
            <IconButton
              iconName="star-outline"
              bgColor={Colors.primary}
              iconColor={Colors.dark}
              iconSize={20}
              btnFunc={() => navigation.navigate(Routes.REWARD, route.params)}
            />
          </View> */}
        </View>
        <View style={Styles.categoryContainer}>
          {!IsLoading ? (
            <>
              <Tag
                bgColor={tag == 0 ? Colors.primary : Colors.gray}
                tagName="All Sellers"
                tagFunc={() => setTag(0)}
              />
              <Tag
                bgColor={tag == 1 ? Colors.primary : Colors.gray}
                tagName="Best Seller"
                tagFunc={() => setTag(1)}
              />
            </>
          ) : null}
        </View>
        {tag == 0 ? (
          <View style={Styles.productContainer}>
            {IsLoading ? (
              <Text className="text-center">Retrieving...</Text>
            ) : Products?.length > 0 ? (
              Products.map((item, index) => (
                <ProductCard
                  key={index}
                  // fish={item.sellerName}
                  imgPath={Images.seller}
                  title={item.fullName}
                  // price={150}
                  seller={item.sellerCode}
                  btnFunc={() =>
                    navigation.navigate(Routes.ORNAMENTS, {
                      // sellerCount: Sellers.length,
                      sellerCode:item.sellerCode,
                      // userCount: 150,
                      // recommendedSeller: item.sellerCode,
                    })
                  }
                />
              ))
            ) : (
              <Text className="text-center">
                No sellers available right now!
              </Text>
            )}
          </View>
        ) : (
          <View style={Styles.productContainer}>
            {IsLoading ? (
              <Text className="text-center">Retrieving...</Text>
            ) : HttpSuccessAction == 3 ? (
              <ProductCard
                seller={ResponseData.seller.fullName}
                imgPath={Images.seller}
                btnFunc={() =>
                  navigation.navigate(Routes.ORNAMENTS, {
                    
                    sellerCode: ResponseData.seller.sellerCode,
                    // userCount: 150,
                    // recommendedSeller: ResponseData.seller.sellerCode,
                  })
                }
              />
            ) : (
              <Text className="text-center">
                No best seller available right now!
              </Text>
            )}
          </View>
        )}
        {/* <View style={Styles.productContainer}>
          <ProductCard
            imgPath={Images.seller}
            title="Air Pump"
            price={150}
            seller="jhones_dane"
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  iconBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  categoryContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 20,
  },
  productContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: Colors.light,
    marginTop: 20,
    borderRadius: 15,
  },
});
export default Seller;
