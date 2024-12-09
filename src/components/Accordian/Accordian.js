import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';

const Accordian = () => {
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/cuisine', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setFood(resInJson);
          setError(false);
        } else {
          setFood({});
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
      {food.accordionValues?.map((item) => {
        return (
          <div key={item.id} className='accordion container mt-4' id={item.containerId}>
            <div className='accordion-item mt-4 rounded' key={item.id}>
              <h2 className='accordion-header border rounded'>
                <button
                  className='accordion-button fs-5'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target={item.toggleTarget}
                  aria-expanded='true'
                  aria-controls={item.ariaControls}>
                  {item.btnName}
                </button>
              </h2>
              <div
                id={item.targetId}
                className='accordion-collapse collapse'
                data-bs-parent={item.dataParent}>
                <div
                  className={
                    item.id === 1
                      ? 'p-3'
                      : item.id === 2
                        ? 'accordion-body d-flex justify-content-around'
                        : 'accordion-body d-flex justify-content-evenly'
                  }>
                  <p className='m-0'>{item.brand1}</p>
                  {item.id > 1 && (
                    <>
                      <p className='m-0'>{item.brand2}</p>
                      <p className='m-0'>{item.brand3}</p>
                      <p className='m-0'>{item.brand4}</p>
                      <p className='m-0'>{item.brand5}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Accordian;
