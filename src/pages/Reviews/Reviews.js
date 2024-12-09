import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { Link } from 'react-router-dom';

const Reviews = () => {
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [sorting, setSorting] = useState('Newest First');
  const [reviewSorting, setReviewSorting] = useState('All Reviews');

  useEffect(() => {
    fetchApi('http://localhost:5000/reviews', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setReview(resInJson);
          setError(false);
        } else {
          setReview([]);
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
    return <div className='spinner-border text-success position-absolute top-50 start-50 translate-middle' data-test-id='spinner'></div>;
  }

  if (error) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }

  return (
    <div className='container my-4'>
      <h4>Hotel Kanthaas Reviews</h4>
      <div className='btn-group sortby mb-4'>
        <button
          className='btn btn-transparent dropdown-toggle fs-5'
          type='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'>
          {reviewSorting}
        </button>
        <ul className='dropdown-menu shadow'>
          {review.totalReviews?.map((reviews) => {
            return (
              <li className='p-1' key={reviews.id}>
                <Link
                  className='dropdown-item text-secondary'
                  to='#'
                  onClick={() => setReviewSorting(reviews.sortBy)}>
                  {reviews.sortBy}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='btn-group sortby float-end'>
        <button
          className='btn btn-transparent dropdown-toggle fs-5'
          type='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'>
          <FontAwesomeIcon icon='fa-solid fa-arrow-up-wide-short' className='me-1' />
          {sorting}
        </button>
        <ul className='dropdown-menu'>
          {review.sorting?.map((data) => {
            return (
              <li className='p-1' key={data.id}>
                <Link
                  className='dropdown-item text-secondary'
                  to='#'
                  onClick={() => setSorting(data.sortBy)}>
                  {data.sortBy}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='mb-4 position-relative'>
        <div className='d-flex'>
          <img
            src='https://b.zmtcdn.com/data/user_profile_pictures/f7d/9da84d6938d507574560c74f229d7f7d.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A'
            alt='user'
            className='rounded-circle me-2 mt-1'
            height={43}
          />
          <div>
            <p className='mb-0'>Askash S</p>
            <p className='text-secondary'>
              2 reviews
              <FontAwesomeIcon
                icon='fa-solid fa-circle'
                className='text-secondary ms-1 me-1'
                style={{ fontSize: 4 }}
              />
              0 Followers
            </p>
          </div>
        </div>
        <span
          className='bg-success rounded text-light px-1 text-center me-2'
          style={{ width: 30, fontSize: 14 }}>
          {5}
          <FontAwesomeIcon
            icon='fa-solid fa-star'
            className='fs-n1 text-light'
            style={{ fontSize: 8, paddingBottom: 2, marginLeft: 2 }}
          />
        </span>
        <span style={{ fontSize: 14 }}>DELIVERY &nbsp; 8 hours ago</span>
        <p className='text-secondary mt-1 ms-1'>0 Votes for helpful, 0 Comments</p>
        <div className='my-2'>
          {review.commentReactions?.map((reaction) => {
            return (
              <button
                className='border-0 bg-transparent px-2 text-secondary me-3'
                key={reaction.id}>
                <FontAwesomeIcon icon={reaction.icon} className='me-1' />
                {reaction.iconName}
              </button>
            );
          })}
        </div>
        <button className='text-danger border-1 bg-transparent border-danger rounded p-2 position-absolute top-0 end-0'>
          Follow
        </button>
      </div>
    </div>
  );
};

export default Reviews;
