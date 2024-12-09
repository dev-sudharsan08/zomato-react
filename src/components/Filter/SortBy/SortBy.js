import { useState, useEffect } from 'react';
import { fetchApi } from '../../../utils/fetchApi';

const SortBy = () => {
  const [sortBy, setSortBy] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/filter', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setSortBy(resInJson);
          setError(false);
        } else {
          setSortBy({});
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
      {sortBy.sortBy?.map((sort) => {
        return (
          <div key={sort.id} className='mb-4 mt-1'>
            <input type='radio' name={sort.type} />
            <span className='ms-3 fs-5 text-secondary'>{sort.type}</span>
          </div>
        );
      })}
    </>
  );
};

export default SortBy;
