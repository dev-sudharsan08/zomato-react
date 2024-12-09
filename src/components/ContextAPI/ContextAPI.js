import { createContext, useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import FoodCartReducer from '../reducers/FoodCartReducer';
// import { useEffect, useReducer } from 'react';

export const cardContext = createContext(null);
const ContextAPI = ({ children }) => {
  const PhoneNumber = localStorage.getItem('Ph.no');
  // console.log(PhoneNumber);
  const name = localStorage.getItem('signUpDetails');
  // console.log(name);
  // console.log(name.userName);
  const userInfoParsed = JSON.parse(name)
  // console.log(userInfoParsed.userName);

  const [cartState, cartDispatch] = useReducer(FoodCartReducer);
  // console.log(cartState);

  useEffect(() => {
    cart.cartDispatch({
      type: 'FETCH_CART'
    });
  }, []);

  const cart = {
    cartState,
    cartDispatch
  };

  const [foodCardDetail, setFoodCardDetail] = useState({});
  const [filteredFood, setFilteredFood] = useState([]);
  const [restaurantFoodCardDetail, setRestaurantFoodCardDetail] = useState({});
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [NightRestaurantCardDetail, setNightRestaurantFoodCardDetail] = useState({});
  const [filteredNightRestaurant, setFilteredNightRestaurant] = useState([]);
  const [sortByRatingFoodItems, setSortByRatingFoodItems] = useState([]);
  const [sortByTypeFoodItems, setSortByTypeFoodItems] = useState([]);
  const [sortByRestroTypeDiningOut, setSortByRestroTypeDiningOut] = useState([]);
  const [sortByRatingDiningOut, setSortByRatingDiningOut] = useState([]);
  const [sortBySeatingDiningOut, setSortBySeatingDiningOut] = useState([]);
  const [sortByServesDiningOut, setSortByServesDiningOut] = useState([]);
  const [sortByOpenStatusDiningOut, setSortByOpenStatusDiningOut] = useState([]);
  const [sortByDistanceNightLife, setSortByDistanceNightLife] = useState([]);
  const [sortByRestroTypeNightLife, setSortByRestroTypeNightLife] = useState([]);
  const [sortByRatingNightLife, setSortByRatingNightLife] = useState([]);
  const [sortByPubsNightLife, setSortByPubsNightLife] = useState([]);
  const [inputAddress, setInputAddress] = useState('');
  const [loginState, setLoginState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  return (
    <cardContext.Provider
      value={{
        loginState,
        setLoginState,
        PhoneNumber,
        userInfoParsed,
        foodCardDetail,
        setFoodCardDetail,
        filteredFood,
        setFilteredFood,
        restaurantFoodCardDetail,
        setRestaurantFoodCardDetail,
        filteredRestaurant,
        setFilteredRestaurant,
        NightRestaurantCardDetail,
        setNightRestaurantFoodCardDetail,
        filteredNightRestaurant,
        setFilteredNightRestaurant,
        sortByRatingFoodItems,
        setSortByRatingFoodItems,
        sortByTypeFoodItems,
        setSortByTypeFoodItems,
        sortByRestroTypeDiningOut,
        setSortByRestroTypeDiningOut,
        sortByRatingDiningOut,
        setSortByRatingDiningOut,
        sortBySeatingDiningOut,
        setSortBySeatingDiningOut,
        sortByServesDiningOut,
        setSortByServesDiningOut,
        sortByOpenStatusDiningOut,
        setSortByOpenStatusDiningOut,
        sortByDistanceNightLife,
        setSortByDistanceNightLife,
        sortByRestroTypeNightLife,
        setSortByRestroTypeNightLife,
        sortByRatingNightLife,
        setSortByRatingNightLife,
        sortByPubsNightLife,
        setSortByPubsNightLife,
        inputAddress,
        setInputAddress,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        cart
      }}>
      {children}
    </cardContext.Provider>
  );
};

ContextAPI.propTypes = {
  children: PropTypes.object
};
export default ContextAPI;
