import img from './error.gif';
import './ErrorMessage.scss';

const ErrorMessage = () => {
  return <img src={img} className='error-message' alt='error' />;
};

export default ErrorMessage;
