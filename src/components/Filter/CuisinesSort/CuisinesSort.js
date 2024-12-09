import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { fetchApi } from '../../../utils/fetchApi';
import './CuisinesSort.scss';

const CuisinesSort = () => {
  const [cuisineVariety, setCuisineVariety] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/filter', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setCuisineVariety(resInJson);
          setError(false);
        } else {
          setCuisineVariety({});
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

  return (
    <>
      <form className='border border-secondary-subtle rounded mb-3 mt-1'>
        <div>
          <span className='d-flex'>
            <button className='btn bg-white text-secondary focus-out' type='button'>
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
      <div className='d-flex flex-wrap my-3 ms-2 drop wrapper'>
        {cuisineVariety.cuisineOptions?.map((options) => {
          return (
            <div className='px-2 py-3' key={options.id}>
              <input type='checkbox' name={options.option} /> {options.option}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CuisinesSort;
