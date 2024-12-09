import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { Link } from 'react-router-dom';
import MoreFilters from './MoreFilters/MoreFilters';
import CuisinesSort from './CuisinesSort/CuisinesSort';
import RatingFilter from './RatingFilter/RatingFilter';
import CostPerPersonFilter from './CostPerPersonFilter/CostPerPersonFilter';
import SortBy from './SortBy/SortBy';
import './Filter.scss';

const Filter = () => {
  const [sortBtn, setSortBtn] = useState('Sort by');
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/filter', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setCategory(resInJson);
          setError(false);
        } else {
          setCategory({});
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
      <div
        className='modal fade visibility-set'
        id='filterModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog' style={{ marginLeft: 256 }}>
          <div className='modal-content' style={{ width: 750 }}>
            <div className='modal-header text-secondary'>
              <h1 className='modal-title fs-3' id='exampleModalLabel'>
                Filters
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='modal-body p-0'>
              <div className='d-flex'>
                {/* integrating sidebar using bootstrap */}
                <div
                  className='d-flex flex-column flex-shrink-0 text-secondary bg-body-secondary'
                  style={{ width: 210 }}>
                  <ul className='nav flex-column mb-auto py-3 px-2'>
                    {category.filterCategories?.map((category) => {
                      return (
                        <li className='nav-item pb-4 fs-5' key={category.id}>
                          <Link
                            to='#'
                            className='nav-link text-dark category-link'
                            aria-current='page'
                            onClick={() => {
                              setSortBtn(category.filterBy);
                              // infoBtn === 'Overview' && setInfo(!info);
                            }}>
                            {category.filterBy}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className='ms-4 pt-3 px-2'>
                  {sortBtn === 'Sort by'
                    ? (
                    <SortBy />
                      )
                    : sortBtn === 'Cuisines'
                      ? (
                    <CuisinesSort />
                        )
                      : sortBtn === 'Rating'
                        ? (
                    <RatingFilter />
                          )
                        : sortBtn === 'Cost per person'
                          ? (
                    <CostPerPersonFilter />
                            )
                          : sortBtn === 'More filters'
                            ? (
                    <MoreFilters />
                              )
                            : (
                                ''
                              )}
                </div>
              </div>
              {/* <div className='hr-text label-l mt-1 mb-1 text-secondary'>or</div> */}
              <hr className='mt-0' />
              <div className='mt-2 float-end pb-3 pe-3'>
                <button className='border border-secondary px-2 py-2 rounded me-3 text-secondary'>
                  Clear All
                </button>
                <button className='border-0 rounded px-4 py-2 bg-danger text-light'>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
