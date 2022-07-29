import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './singleComicPage.scss';

const SingleComicPage = () => {
  const [comic, setComic] = useState(null);
  const { loading, error, getComicsById, clearError } = useMarvelService();

  const { comicId } = useParams();

  useEffect(() => {
    updateComic();
    // eslint-disable-next-line
  }, [comicId]);

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const updateComic = () => {
    clearError();
    if (!comicId) return;

    getComicsById(comicId).then(onComicLoaded);
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {spinner}
      {errorMessage}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { title, thumbnail, price, description, pageCount, language } = comic;

  return (
    <div className='single-comic'>
      <img src={thumbnail} alt={title} className='single-comic__img' />
      <div className='single-comic__info'>
        <h2 className='single-comic__name'>{title}</h2>
        <p className='single-comic__descr'>{description}</p>
        <p className='single-comic__descr'>{pageCount} pages</p>
        <p className='single-comic__descr'>Language: {language}</p>
        <div className='single-comic__price'>{price}</div>
      </div>
      <Link to='/comics' className='single-comic__back'>
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
