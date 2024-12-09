import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import './FoodImageGallery.scss';

const FoodImageGallery = () => {
  const [foodImg, setFoodImg] = useState([]);
  const [galleryBtn, setGalleryBtn] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/foodImgGallery', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setFoodImg(resInJson);
          setError(false);
        } else {
          setFoodImg([]);
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
    <div className='container my-4'>
      <h4 className='mb-4'>Hotel Kanthaas Photos</h4>
      <div className='mb-3'>
        <button
          className={
            galleryBtn === 'All'
              ? 'bg-danger border-0 text-light rounded px-2 py-1 me-3'
              : 'border bg-transparent border-secondary text-secondary rounded px-2 py-1 me-3'
          }
          onClick={() => {
            setGalleryBtn('All');
          }}>
          All (12)
        </button>
        <button
          className={
            galleryBtn === 'Food'
              ? 'bg-danger border-0 text-light rounded px-2 py-1 me-3'
              : 'border bg-transparent border-secondary text-secondary rounded px-2 py-1 me-3'
          }
          onClick={() => {
            setGalleryBtn('Food');
          }}>
          Food (9)
        </button>
      </div>
      <div className='d-flex flex-wrap ms-1'>
        {foodImg?.map((photo) => {
          return (
            <div key={photo.id} className='px-2 py-2'>
              <div className={galleryBtn === 'All' ? 'rounded geeks' : 'rounded-4 shadow geeks'}>
                <img src={photo.galleryImgUrl} alt={photo.alttext} className='rounded' />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodImageGallery;
