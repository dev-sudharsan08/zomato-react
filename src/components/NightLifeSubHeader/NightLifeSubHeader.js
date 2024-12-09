import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Filter from '../Filter/Filter';
import { cardContext } from '../ContextAPI/ContextAPI';
import './NightLifeSubHeader.scss';

const NightLifeSubHeader = () => {
  const {
    NightRestaurantCardDetail,
    setSortByDistanceNightLife,
    setSortByRestroTypeNightLife,
    setSortByRatingNightLife,
    setSortByPubsNightLife
  } = useContext(cardContext);
  const [subHeader, setSubHeader] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/NightLife', 'GET')
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

  const handleNightRestaurantType = (menu) => {
    // console.log(menu);
    const nightRestroSorting = NightRestaurantCardDetail.nightTimeRestaurants?.filter((dining) => {
      return dining.distance <= 5.0;
    });
    menu.id === 2 && setSortByDistanceNightLife(nightRestroSorting);
    const nightRestroTypeSorting = NightRestaurantCardDetail.nightTimeRestaurants?.filter(
      (dining) => {
        return dining.restroType === 'Gold';
      }
    );
    menu.id === 3 && setSortByRestroTypeNightLife(nightRestroTypeSorting);
    const nightRatingSorting = NightRestaurantCardDetail.nightTimeRestaurants?.filter((dining) => {
      return dining.rating >= 4.0;
    });
    menu.id === 4 && setSortByRatingNightLife(nightRatingSorting);
    const nightPubsSorting = NightRestaurantCardDetail.nightTimeRestaurants?.filter((dining) => {
      return dining.liquorProvideStatus === true;
    });
    menu.id === 5 && setSortByPubsNightLife(nightPubsSorting);
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
            <ul className='navbar-nav'>
              {subHeader.subHeaderMenus?.map((menu) => {
                return (
                  <li
                    key={menu.id}
                    className='nav-item me-3 night-life-sub-header-styles'
                    onClick={() => {
                      handleNightRestaurantType(menu);
                    }}>
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
                        <FontAwesomeIcon
                          icon='fa-solid fa-down-left-and-up-right-to-center'
                          className='text-secondary me-2'
                        />
                      )}
                      {menu.id === 3 && (
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

export default NightLifeSubHeader;
