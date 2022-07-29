import './comicsList.scss';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {
  const { loading, error, clearError, getAllComicses } = useMarvelService();

  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);

  useEffect(() => {
    updateComicses();
  }, []);

  const updateComicses = (offset, isNewComicsLoaded = false) => {
    clearError();
    isNewComicsLoaded ? setNewItemsLoading(true) : setNewItemsLoading(false);

    getAllComicses(offset).then(onComicsLoaded);
  };

  const onComicsLoaded = (newComics) => {
    let ended = newComics.length < 9;
    setComics((prev) => [...prev, ...newComics]);
    setOffset((offset) => offset + 8);
    setNewItemsLoading(false);
    setComicsEnded(ended);
  };

  const renderComics = (comics) => {
    return comics.map((item) => {
      return (
        <li className='comics__item'>
          <a href={item.url}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className='comics__item-img'
            />
            <div className='comics__item-name'>{item.title}</div>
            <div className='comics__item-price'>{item.price}</div>
          </a>
        </li>
      );
    });
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className='comics__list'>
      {spinner}
      {errorMessage}
      <ul className='comics__grid'>{renderComics(comics)}</ul>

      <button className='button button__main button__long'>
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
