import { useState } from 'react';
// import { fetchApi } from '../../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmOrder from '../ConfirmOrder/ConfirmOrder';
import PropTypes from 'prop-types';

const ChooseQuantity = ({ OrderDetail }) => {
  const orderedItem = OrderDetail;
  // console.log(details);
  // console.log(details.addOn);
  // console.log(details.quantitySize)
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [addOnPrice, setAddOnPrice] = useState(0);
  const [foodQuantity, setFoodQuantity] = useState('');
  const [toggleAddOn, setToggleAddOn] = useState(false);
  // const [itemSize, setItemSize] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(true);
  // useEffect(() => {
  //   fetchApi('http://localhost:5000/chooseQuantity', 'GET')
  //     .then((resInJson) => {
  //       if (resInJson.statusCode !== 404) {
  //         setItemSize(resInJson);
  //         setError(false);
  //       } else {
  //         setItemSize({});
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setError(true);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return <div className='spinner-border text-success invisible' data-test-id='spinner'></div>;
  // }

  // if (error) {
  //   return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  // }
  const totalAmount = price + addOnPrice;
  const handleAddOn = (options) => {
    setToggleAddOn(!toggleAddOn);
    toggleAddOn ? setAddOnPrice(0) : setAddOnPrice(options.addOnPrice);
  };
  // console.log(addOnPrice);

  return (
    <>
      <div
        className='modal fade'
        id='ChooseQuantityModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-content'>
          <div className='modal-header border-0'>
            <div className='modal-title' id='exampleModalLabel'>
              <img
                src={orderedItem.cuisineImg}
                alt='foodItem'
                height={50}
                className='rounded me-4'
              />
              <span className='fs-5 text-dark fw-bold'>{orderedItem.cuisineName}</span>
            </div>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
          </div>
          <div className='modal-body bg-light rounded'>
            <div className='border border-secondary-subtle p-2 rounded shadow-sm bg-white'>
              <h5>QUANTITY</h5>
              <p className='pb-2 border-bottom'>Select only 1 option</p>
              {/* {itemSize.itemSize?.map((item) => { */}
              {/* return ( */}
              {orderedItem.quantitySize?.map((foodSize) => {
                return (
                  <div key={foodSize.id} className='d-flex justify-content-between'>
                    <p>{foodSize.size}</p>
                    <div>
                      <input
                        type='radio'
                        value='medium-price'
                        className='me-1'
                        onClick={() => {
                          setPrice(foodSize.price);
                          setFoodQuantity(foodSize.size);
                        }}
                      />
                      <span id='medium-price'>₹{foodSize.price}</span>
                    </div>
                  </div>
                );
              })}
              {/* <div className='d-flex justify-content-between'>
                <p>Large</p>
                <div>
                  <input
                    type='radio'
                    value='Max-price'
                    className='me-1'
                    onClick={() => setPrice(orderedItem.largePrice)}
                  />
                  <span id='max-price'>₹{orderedItem.largePrice}</span>
                </div>
              </div> */}
              {/* );
              })} */}
            </div>
            <div className='border border-secondary-subtle p-2 rounded shadow-sm bg-white my-3'>
              <h5>{orderedItem.addOnType}</h5>
              <p className='border-bottom pb-2'>Select upto 4 options</p>
              {orderedItem.addOn?.map((options) => {
                return (
                  <div key={options.id} className='d-flex justify-content-between mb-3'>
                    <div>
                      <FontAwesomeIcon
                        icon='fa-regular fa-circle-dot'
                        className='text-success me-2'
                      />
                      <span className='m-0'>{options.addOnName}</span>
                    </div>
                    <div>
                      <span className='me-2'>₹{options.addOnPrice}</span>
                      <input
                        type='checkbox'
                        value='addOnPrice'
                        onClick={handleAddOn.bind(this, options)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='d-flex justify-content-between border border-secondary-subtle p-2 rounded shadow-sm bg-white my-3'>
              <div className='border border-danger rounded shadow-sm'>
                <button className='fs-4' onClick={() => setQuantity(quantity - 1)}>
                  -
                </button>
                <span className='mx-3'>{quantity}</span>
                <button className='fs-4' onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
              <div>
                <button
                  className={price > 0 || addOnPrice > 0 ? 'btn btn-danger rounded' : 'btn btn-secondary rounded'}
                  // className='btn btn-transparent'
                  data-bs-toggle='modal'
                  data-bs-target='#ConfirmOrderModal'>
                  Add item
                  {price > 0 && (
                    <span className='m-0 ms-2'>
                      ₹{price > 0 && addOnPrice === 0 ? price : totalAmount}
                    </span>
                  )}
                  {/* {Price + addOnPrice} */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmOrder
        orderedItem={orderedItem}
        totalAmount={totalAmount}
        foodQuantity={foodQuantity}
      />
    </>
  );
};

ChooseQuantity.propTypes = {
  OrderDetail: PropTypes.array
};

export default ChooseQuantity;
