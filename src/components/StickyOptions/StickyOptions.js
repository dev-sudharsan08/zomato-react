import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import Filter from '../Filter/Filter';
import { cardContext } from '../ContextAPI/ContextAPI';
import './StickyOptions.scss';

const StickyOptions = () => {
  const { foodCardDetail, setSortByRatingFoodItems, setSortByTypeFoodItems } =
    useContext(cardContext);
  const [option, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/stickyOptions', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setOptions(resInJson);
          setError(false);
        } else {
          setOptions({});
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

  const handleFoodSort = (menu) => {
    console.log(menu);
    const foodSorting = foodCardDetail.foodItems?.filter((foodItems) => {
      return foodItems.rating >= 4.0;
    });
    console.log(foodSorting);
    menu.id === 2 && setSortByRatingFoodItems(foodSorting);
    const foodTypeSorting = foodCardDetail.foodItems?.filter((foodItems) => {
      return foodItems.foodType === 'PureVeg';
    });
    menu.id === 3 && setSortByTypeFoodItems(foodTypeSorting);
  };

  return (
    <>
      <section className='position-sticky top-0 visibility-set'>
        <nav className='navbar navbar-expand-md bg-light mt-2'>
          <div className='container'>
            <button
              className='navbar-toggler shadow-none'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#chooseCuisinesDropdown'
              aria-controls='chooseCuisinesDropdown'
              aria-expanded='false'
              aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='chooseCuisinesDropdown'>
              <ul className='navbar-nav'>
                {option.stickyHeaderOptions?.map((menu) => {
                  return (
                    <>
                      <li
                        key={menu.id}
                        className={`
                          ${menu.id === 4 ? 'dropdown' : ''} nav-item me-3 sticky-header-styles`}
                        onClick={() => handleFoodSort(menu)}>
                        <a
                          className={
                            menu.id === 4
                              ? 'nav-link dropdown-toggle'
                              : 'nav-link active text-secondary'
                          }
                          type='button'
                          // data-bs-toggle='modal'
                          data-bs-target={menu.id === 1 ? '#filterModal' : ''}
                          data-bs-toggle={menu.id === 1 ? 'modal' : menu.id === 4 ? 'dropdown' : ''}
                          aria-expanded={menu.id === 4 ? 'false' : ''}
                          aria-current={menu.id === 4 ? 'page' : ''}
                          href='#'>
                          {menu.id === 1 && (
                            <FontAwesomeIcon
                              icon='fa-solid fa-filter'
                              className='text-secondary me-2'
                            />
                          )}
                          {menu.menu}
                        </a>
                        {menu.id === 4 && (
                          <ul className='dropdown-menu p-3'>
                            <h4 className='text-secondary'>Cuisines</h4>
                            <form className='border border-secondary-subtle rounded my-3'>
                              <div>
                                <span className='d-flex'>
                                  <button
                                    className='btn bg-white text-secondary focus-out'
                                    type='button'>
                                    <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
                                  </button>
                                  <input
                                    className='border-0 text-secondary p-2 rounded focus-out'
                                    type='search'
                                    style={{ width: 388 }}
                                    placeholder='Search for restaurant, cuisine or a dish'
                                    id='example-search-input'
                                  />
                                </span>
                              </div>
                            </form>
                            <div className='d-flex flex-wrap wrapper border-bottom my-3 ms-2 drop'>
                              {option.checkBoxOptions?.map((options) => {
                                return (
                                  <div className='p-2' key={options.id}>
                                    <input type='checkbox' name={options.option} /> {options.option}
                                  </div>
                                );
                              })}
                            </div>
                            <div className='mt-3 float-end'>
                              <button className='border border-secondary py-1 rounded me-3 text-secondary'>
                                Clear All
                              </button>
                              <button className='border-0 rounded px-3 py-1 bg-danger text-light'>
                                Apply
                              </button>
                            </div>
                          </ul>
                        )}
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </section>
      <Filter />
    </>
  );
};

export default StickyOptions;
