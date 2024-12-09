import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { cardContext } from '../../components/ContextAPI/ContextAPI';
import ChooseQuantity from '../ChooseQuantity/ChooseQuantity';

const FoodItems = () => {
  const [food, setFood] = useState({});
  const { setFoodCardDetail, filteredFood, sortByRatingFoodItems, sortByTypeFoodItems } =
    useContext(cardContext);
  const [foodOrderDetail, setFoodOrderDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/cuisine', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setFood(resInJson);
          setFoodCardDetail(resInJson);
          setError(false);
        } else {
          setFood({});
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className='spinner-border text-success invisible' data-test-id='spinner'></div>;
  }

  if (error) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }

  const { cart } = useContext(cardContext);

  const handleAddToCart = (foodItem) => {
    cart.cartDispatch({
      type: 'ADD_TO_CART',
      payload: foodItem
    });
    setFoodOrderDetail(foodItem);
  };
  // console.log(modal);
  const foodItem = (food) => {
    return (
      <div className='col-lg-4 col-md-4 col-sm-6' key={food.id}>
        <div className='card p-2 shadow mb-4 bg-body-tertiary rounded'>
          <div className='position-relative'>
            <a href='/cuisine-details'>
              <img
                src={food.cuisineImg}
                className='card-img-top rounded-4'
                alt={food.cuisineName}
                height={200}
              />
            </a>
            <p
              className='bg-primary  p-1 py-sm-0 p-md-1 text-center rounded-1 ms-2 text-light position-absolute bottom-0 start-0'
              style={{ fontSize: 12 }}>
              {food.offer}% OFF
            </p>
          </div>
          <div className='card-body'>
            <div className='d-flex justify-content-between align-items-center mb-2'>
              <div className='card-title fs-5 product-title text-decoration-none text-start mb-0'>
                {food.hotelName}
              </div>
              <div className='d-flex bg-success rounded text-light px-1 text-end'>
                {food.rating}
                <FontAwesomeIcon
                  icon='fa-solid fa-star'
                  className='fs-n1 text-light mt-2 ms-1'
                  style={{ fontSize: 9 }}
                />
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <div className='text-secondary text-start'>{food.cuisineName}</div>
              <p className='card-text text-secondary m-0 text-end'>₹{food.price} for one</p>
            </div>
            <div className='d-flex justify-content-between align-items-center border-bottom border-body-secondary pb-3'>
              <button
                className='btn bg-transparent border-danger btn-sm shadow-sm text-start'
                type='button'
                data-bs-toggle='modal'
                data-bs-target='#ChooseQuantityModal'
                onClick={handleAddToCart.bind(this, food)}>
                Add Item
              </button>
              <span className='text-secondary text-end'>{food.timeTaken} min</span>
            </div>
            <div className='d-flex my-3 ms-3'>
              <img
                src='https://b.zmtcdn.com/data/o2_assets/695598f38d29d0e5d3f8ffe57cfdb94c1613145422.png'
                alt='PrepareGuideLines'
                height={18}
              />
              <div>
                <p className='m-0 ms-2 text-secondary' style={{ fontSize: 13 }}>
                  Restaurant partner follows WHO protocol
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='ms-2 row product-cards'>
        {filteredFood.length > 0
          ? filteredFood &&
            filteredFood?.map((food) => {
              return foodItem(food);
            })
          : sortByRatingFoodItems.length > 0
            ? sortByRatingFoodItems &&
            sortByRatingFoodItems?.map((food) => {
              return foodItem(food);
            })
            : sortByTypeFoodItems.length > 0
              ? sortByTypeFoodItems &&
            sortByTypeFoodItems?.map((food) => {
              return foodItem(food);
            })
              : food.foodItems?.map((food) => {
                return foodItem(food);
              })}
      </div>
      <ChooseQuantity OrderDetail={foodOrderDetail} />
    </>
  );
};

export default FoodItems;
