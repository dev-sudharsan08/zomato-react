import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './CuisineDetailPage.scss';

const CuisineDetailPage = () => {
  const location = useLocation();
  const [nav, setNav] = useState('');
  const [menuBar, setMenuBar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const loc = location.pathname.split('/')[2];
    loc === undefined ? setNav('') : setNav(loc);

    fetchApi('http://localhost:5000/cuisineDetail', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setMenuBar(resInJson);
          setError(false);
        } else {
          setMenuBar([]);
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
    <div className='container mt-4'>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          {menuBar.breadCrumbs?.map((value) => {
            return (
              <li className='breadcrumb-item' key={value.id}>
                <Link
                  href='#'
                  className={
                    value.id === 5 ? 'text-decoration-none text-secondary active' : 'text-secondary'
                  }>
                  {value.title}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
      <div className='d-flex'>
        <div className='geeks'>
          <Link
            to='/cuisine-details/photos'
            onClick={() => {
              setNav('photos');
            }}>
            <img
              src='https://b.zmtcdn.com/data/pictures/chains/0/18591940/dad38637e7a47c3da8aacc70c82baefe_featured_v2.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*'
              alt='roast'
              height={370}
            />
          </Link>
        </div>
        <div className='d-block ms-2 me-2'>
          {menuBar.courasalImg?.map((food) => {
            return (
              <div className='mb-2 geeks' key={food.id}>
                <img src={food.imgUrl} alt={food.altText} height={181} />
              </div>
            );
          })}
        </div>
        <div className='geeks'>
          <img
            src='https://b.zmtcdn.com/data/pictures/0/18591940/45dfb151339c89fa8bea7ef3f32b490b.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*'
            alt='roast'
            width={200}
            height={369}
          />
        </div>
      </div>
      <div className='d-flex flex-wrap justify-content-between'>
        <div className='mt-2'>
          <h2>Hotel Kanthaas</h2>
          <div className='text-secondary mb-1'>
            <p className='m-0 mb-1'>South Indian, Chinese, Beverages</p>
            <p className='m-0 mb-1'>Kilpauk, Chennai</p>
            <span className='m-0 text-info'>Open now - </span>
            <span>
              6:30am - 10.30pm (Today) <FontAwesomeIcon icon='fa-solid fa-circle-info' />
            </span>
          </div>
        </div>
        <div className='d-flex mt-2'>
          {menuBar.hotelReviews?.map((review) => {
            return (
              <div className='d-flex me-4' key={review.id}>
                <div
                  className='bg-success rounded text-light px-1 me-2 mt-2'
                  style={{ width: 42, height: 26, fontSize: 16 }}>
                  {review.rating}
                  <FontAwesomeIcon
                    icon='fa-solid fa-star'
                    className='fs-n1 text-light'
                    style={{ fontSize: 8, paddingBottom: 2, marginLeft: 2 }}
                  />
                </div>
                <div>
                  <p className='m-0'>{review.totalReviews}</p>
                  <p className='m-0 border-bottom'>{review.reviewType}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='mt-3'>
        {menuBar.helpIcons?.map((icons) => {
          return (
            <button
              key={icons.id}
              className='bg-light border-1 rounded py-1 px-2 me-2 text-secondary mt-3'>
              <FontAwesomeIcon icon={icons.icon} className='me-2 text-danger' />
              {icons.toolTip}
            </button>
          );
        })}
      </div>
      <section className='d-flex flex-wrap justify-content-evenly border-bottom border-2 my-4'>
        {menuBar.stickyMenu?.map((menu) => {
          // console.log(nav, menu.linkUrl);
          return (
            <Link
              key={menu.id}
              className={
                menu.linkUrl === nav
                  ? 'bg-transparent border-0 py-1 px-2 text-danger border-bottom border-2 border-danger fs-5 text-decoration-none'
                  : 'bg-transparent border-0 py-1 px-2 text-secondary fs-5 text-decoration-none'
              }
              // name={menu.menuName}
              to={menu.linkUrl}
              onClick={() => {
                // setInfoBtn(menu.menuName);
                setNav(menu.linkUrl);
                // infoBtn === 'Overview' && setInfo(!info);
              }}>
              {menu.menuName}
            </Link>
          );
        })}
      </section>
      <Outlet />
      {/* {btn === 'Overview' ? <Overview /> : btn === 'Order Online' ? <OrderOnline /> : btn === 'Reviews' ? <Reviews/> : btn === 'Photos' ? <FoodImageGallery /> : btn === 'Menu' ? <Menu /> : ''} */}
      <hr className='text-secondary' />
      {menuBar.relatedDetails?.map((details) => {
        return (
          <div key={details.id}>
            <h6 className='mt-4'>{details.title}</h6>
            <p className='text-secondary' style={{ fontSize: 14 }}>
              {details.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CuisineDetailPage;
