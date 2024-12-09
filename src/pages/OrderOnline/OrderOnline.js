import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import StarRating from '../../components/StarRating/StarRating';
import './OrderOnline.scss';

const OrderOnline = () => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/foodOrderOnlineExclusive', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setOrder(resInJson);
          setError(false);
        } else {
          setOrder({});
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
    return (
      <div
        className='spinner-border text-success position-absolute top-50 start-50 translate-middle'
        data-test-id='spinner'></div>
    );
  }

  if (error) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }

  return (
    <div className='container my-4 d-flex'>
      <div
        className='border-end me-md-3 me-lg-5 pe-md-2 pe-lg-5 rounded-0 list-group d-none d-md-flex'
        id='list-example'>
        {order.todaysMenuList?.map((menu) => {
          return (
            <a
              className='list-group-item list-group-item-action border-0'
              key={menu.id}
              href={menu.link}>
              {menu.menuTitle}
            </a>
          );
        })}
      </div>
      <div>
        <div className='d-flex justify-content-between'>
          <h4 className='my-2'>Order Online</h4>
          <form className='border border-secondary-subtle rounded shadow-sm d-none d-md-flex'>
            <button className='btn bg-white text-secondary focus-out' type='button'>
              <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
            </button>
            <input
              className='border-0 text-secondary p-2 search-input focus-out'
              type='search'
              placeholder='Search within menu'
            />
            <button className='btn bg-white text-secondary' type='button'>
              <FontAwesomeIcon icon='fa-solid fa-xmark' />
            </button>
          </form>
        </div>
        <span className='me-2 text-secondary'>
          <FontAwesomeIcon icon='fa-regular fa-compass' className='me-2' />
          Live track your order
        </span>
        <span className='border-end border-secondary'></span>
        <span className='ms-2 text-secondary'>
          <FontAwesomeIcon icon='fa-regular fa-clock' className='me-2' />
          32 min
        </span>
        <div className='my-4 d-flex flex-wrap'>
          {order.offerInfo?.map((offer) => {
            return (
              <div
                className='bg-primary text-light rounded px-2 me-2 mt-2'
                key={offer.id}
                style={{ fontSize: 12 }}>
                <p className='mb-0 mt-1 fw-bold'>{offer.offerPercentage}</p>
                <p className='mt-0'>{offer.offerStartsFrom}</p>
              </div>
            );
          })}
        </div>
        <div
          data-bs-spy='scroll'
          data-bs-target='#list-example'
          data-bs-smooth-scroll='true'
          className='scrollspy-example border-bottom my-3'
          tabIndex='0'>
          <h4 id='list-item-1'>Todays Exclusive Dishes</h4>
          <div className='my-3'>
            {order.orderData?.map((item) => {
              return (
                <>
                  <div className='d-flex mb-4' key={item.id}>
                    <img src={item.cuisineImgUrl} alt={item.alterText} className='rounded' />
                    <div className='ms-3'>
                      <h5>{item.foodName}</h5>
                      <div className='d-flex'>
                        <StarRating />
                        <p className='m-0 mt-1'>{item.noOfVotes}votes</p>
                      </div>
                      <p className='m-0'>₹{item.price}</p>
                      <p className='m-0 text-secondary'>{item.foodDescription}</p>
                    </div>
                  </div>
                  {item.id === 3 && <h4 id='list-item-2'>Breakfast</h4>}
                  {item.id === 11 && <h4 id='list-item-3'>Drinks (Beverages)</h4>}
                </>
              );
            })}
          </div>
        </div>
        <img
          src='https://b.zmtcdn.com/data/o2_banners/54de14cdc3793dfce39a46c989f3e5c1.jpg'
          alt='fssai'
          height={25}
        />
        <p className='mt-1'>Lic. No. 12421002001520</p>
      </div>
    </div>
  );
};

export default OrderOnline;
