import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './404.scss';

const Page404 = () => {
  return (
    <div className='not-found'>
      <ErrorMessage />
      <p>Page doesn't exist</p>
      <Link className='not-found__link' to='/'>
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
