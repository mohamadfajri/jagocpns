import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const SlideContent = ({ imageUrl, url }) => {
  return (
    <div className='max-w-screen-xl'>
      <Link to={url}>
        <img src={imageUrl} alt='image' />
      </Link>
    </div>
  );
};

export default SlideContent;
