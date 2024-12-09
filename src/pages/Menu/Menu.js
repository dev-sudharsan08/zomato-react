import './Menu.scss';

const Menu = () => {
  return (
    <div className='container my-3'>
      <div className='mt-4'>
        <h4 className='mb-3'>Hotel Kanthaas Menu</h4>
      </div>
      <div className='geeks rounded'>
        <img
          src='https://b.zmtcdn.com/data/menus/940/18591940/920a90fa4643eaa74f5224880809b54f.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
          alt='menu'
          height={240}
          className='rounded'
        />
      </div>
      <p className='m-0 mt-1'>Food Menu</p>
      <p className='m-0 text-secondary' style={{ fontSize: 12 }}>
        3 pages
      </p>
    </div>
  );
};

export default Menu;
