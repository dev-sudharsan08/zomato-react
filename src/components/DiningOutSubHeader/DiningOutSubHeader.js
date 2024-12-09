import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Filter from '../Filter/Filter';
import { cardContext } from '../ContextAPI/ContextAPI';
import './DiningOutSubHeader.scss';

const DiningOutSubHeader = () => {
  const {
    restaurantFoodCardDetail,
    setSortByRestroTypeDiningOut,
    setSortByRatingDiningOut,
    setSortBySeatingDiningOut,
    setSortByServesDiningOut,
    setSortByOpenStatusDiningOut
  } = useContext(cardContext);
  const [subHeader, setSubHeader] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    fetchApi('http://localhost:5000/diningOut', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setSubHeader(resInJson);
          setError(false);
        } else {
          setSubHeader({});
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

  const handleRestaurantType = (menu) => {
    // console.log(menu);
    const restroSorting = restaurantFoodCardDetail.trendingDinings?.filter((dining) => {
      return dining.restroType === 'Gold';
    });
    menu.id === 2 && setSortByRestroTypeDiningOut(restroSorting);
    const restroRatingSorting = restaurantFoodCardDetail.trendingDinings?.filter((dining) => {
      return dining.rating >= 4.0;
    });
    menu.id === 3 && setSortByRatingDiningOut(restroRatingSorting);
    const restroSeatingSorting = restaurantFoodCardDetail.trendingDinings?.filter((dining) => {
      return dining.restroSeating >= 'Outdoor Seating';
    });
    menu.id === 4 && setSortBySeatingDiningOut(restroSeatingSorting);
    const restroServerSorting = restaurantFoodCardDetail.trendingDinings?.filter((dining) => {
      return dining.liquorProvideStatus === true;
    });
    menu.id === 5 && setSortByServesDiningOut(restroServerSorting);
    const restroOpenStatusSorting = restaurantFoodCardDetail.trendingDinings?.filter((dining) => {
      return dining.openStatus === true;
    });
    menu.id === 6 && setSortByOpenStatusDiningOut(restroOpenStatusSorting);
  };

  return (
    <>
      <nav className='navbar navbar-expand-md bg-transparent my-4'>
        <div className='container'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavDropdown'
            aria-controls='navbarNavDropdown'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav d-flex flex-wrap'>
              {subHeader.subHeaderMenus?.map((menu) => {
                return (
                  <li
                    key={menu.id}
                    className={
                      menu.id === 6
                        ? 'nav-item me-3 dine-out-sub-header-styles mt-md-3 mt-lg-0'
                        : 'nav-item me-3 dine-out-sub-header-styles'
                    }
                    onClick={() => handleRestaurantType(menu)}>
                    <a
                      className='nav-link active text-secondary'
                      type='button'
                      data-bs-target={menu.id === 1 ? '#filterModal' : ''}
                      data-bs-toggle={menu.id === 1 ? 'modal' : ''}>
                      {menu.id === 1 && (
                        <FontAwesomeIcon
                          icon='fa-solid fa-filter'
                          className='text-secondary me-2'
                        />
                      )}
                      {menu.id === 2 && (
                        <img
                          src='https://b.zmtcdn.com/data/o2_assets/577bf55ff265ae45e11cfe6911d176941687789024.png'
                          alt='gold-logo'
                          className='me-2'
                          height={18}
                        />
                      )}
                      {menu.menu}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      <Filter />
    </>
  );
};

export default DiningOutSubHeader;
