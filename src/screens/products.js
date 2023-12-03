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

// ---------Third-party components & modules---------
import {useIsFocused} from '@react-navigation/native';

// ----------Custom components and modules----------
import {TextBox} from '../components/cells';
import {TitleImage, IconButton, Tag} from '../components/tissues';
import {SellerCard} from '../components/organs';
import {UrlContext, AuthContext} from '../contexts';
import {UseHttpRequest, UseAsyncStorage} from '../hooks';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Routes} from '../constants';

const Products = ({navigation}) => {
  // Focus
  const isFocused = useIsFocused();

  // Tag status
  const [tag, setTag] = useState(0);

  // Products state
  const [Products, SetProducts] = useState([]);

  // Seller id state
  const [ProductId, SetProductId] = useState(0);

  // Search query state
  const [SearchQuery, SetProductQuery] = useState('');

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

  // Filter sellers
  useEffect(() => {
    if (SearchQuery === '') {
      LoadProducts();
    } else {
      SearchProducts();
    }
  }, [SearchQuery]);

  // Handle http responses and errors
  useEffect(() => {
    // When fail
    if (RequestError) {
      console.log(RequestError);
      // Alert.alert('Error', RequestError.error.message);
    }

    // When success
    if (ResponseData) {
      if (HttpSuccessAction == 1) {
        console.log(ResponseData.success.message);
        console.log(ResponseData)
        SetProducts(ResponseData.products);
      }

      if (HttpSuccessAction == 2) {
        if (ResponseData.result > 0) {
          BestSellerInfo(ResponseData.result);
        }
      }

      if (HttpSuccessAction == 3) {
        console.log(ResponseData.seller.fullName);
      }
    }
  }, [ResponseData, RequestError]);

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

  // Function to load sellers
  const LoadProducts = () => {
    // Send request
    SendRequest({
      method: 'GET',
      url: `${Urls.baseUrl}products/all`,
      headers: {
        'content-type': 'application/json',
      },
      data: {},
    });

    SetHttpSuccessAction(1);
  };

  // Function to load users
  // const LoadUsers = () => {
  //   // Send request
  //   SendRequest({
  //     method: 'GET',
  //     url: `${Urls.baseUrl}users/all`,
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     data: {},
  //   });

  //   SetHttpSuccessAction(0);
  // };

  // Function to search all sellers
  // const SearchSellers = () => {
  //   let x = ${encodeURIComponent(
  //     SearchQuery,
  //   )}
  //   console.log(x);
  //   // Send request
  //   SendRequest({
  //     method: 'GET',
  //     url: `${Urls.baseUrl}sellers/all/search/${encodeURIComponent(
  //       SearchQuery,
  //     )}`,
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     data: {},
  //   });

  //   SetHttpSuccessAction(1);
  // };
  const SearchProducts = () => {
    let x = encodeURIComponent(SearchQuery);
    console.log(x);
  
    // Send request
    SendRequest({
      method: 'GET',
      url: `${Urls.baseUrl}products/all/search/${x}`,
      headers: {
        'content-type': 'application/json',
      },
      data: {},
    });
  
    SetHttpSuccessAction(1);
  };

  // Function to get best seller
  const BestSeller = () => {
    // Send request
    SendRequest({
      method: 'GET',
      url: `${Urls.reenUrl}recommend?userid=${AuthData.user.userCode}&usercount=150&sellercount=${Sellers.length}`,
      headers: {
        'content-type': 'application/json',
      },
      data: {},
    });

    SetHttpSuccessAction(2);
  };

  // Function to get best seller information
  const BestSellerInfo = id => {
    console.log(id);
    SetSellerId(id);
    // Send request
    SendRequest({
      method: 'GET',
      url: `${Urls.baseUrl}sellers/one/${id}`,
      headers: {
        'content-type': 'application/json',
      },
      data: {},
    });

    SetHttpSuccessAction(3);
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
          <Text style={[GlobalStyles.titleTxt, {fontSize: 20}]}>
            Fish Ornaments
          </Text>
          <TitleImage />
          <View style={Styles.iconBtnContainer}>
            {/* <IconButton
              iconName="cart"
              bgColor={Colors.primary}
              iconColor={Colors.dark}
              iconSize={20}
            /> */}
            <IconButton
              iconName="power"
              bgColor={Colors.primary}
              iconColor={Colors.dark}
              iconSize={20}
              btnFunc={() =>
                Alert.alert('Logout!', 'You want to logout!', [
                  {
                    text: 'OK',
                    onPress: () => {
                      ClearValues()
                        .then(() => {
                          ClearAuthData();
                          navigation.navigate(Routes.LOGIN);
                        })
                        .catch(error => console.log(error));
                    },
                  },
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                  },
                ])
              }
            />
          </View>
        </View>
        {tag == 0 ? (
          <TextBox
            password={false}
            placeTxt="Search Fish"
            bgColor={Colors.lightGray}
            txtColor={Colors.dark}
            setInput={txt => SetProductQuery(txt)}
          />
        ) : null}
        <View style={Styles.categoryContainer}>
          {!IsLoading ? (
            <>
              <Tag
                bgColor={tag == 0 ? Colors.primary : Colors.gray}
                tagName="All Fishes"
                tagFunc={() => setTag(0)}
              />
              {/* <Tag
                bgColor={tag == 1 ? Colors.primary : Colors.gray}
                tagName="Best Seller"
                tagFunc={() => setTag(1)}
              /> */}
            </>
          ) : null}
        </View>
        {tag == 0 ? (
          <View style={Styles.productContainer}>
            {IsLoading ? (
              <Text className="text-center">Retrieving...</Text>
            ) : Products?.length > 0 ? (
              Products.map((item, index) => (
                <SellerCard
                  key={index}
                  fish={item.fishName}
                  code={item.fishCode}
                  btnFunc={() =>
                    navigation.navigate(Routes.SELLER, {
                      fishCode: item.fishCode
                      // sellerCount: Sellers.length,
                      // userId: AuthData.user.userCode,
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
              <SellerCard
                seller={ResponseData.seller.fullName}
                btnFunc={() =>
                  navigation.navigate(Routes.SELLER, {
                    // sellerCount: Sellers.length,
                    // userId: AuthData.user.userCode,
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
export default Products;
