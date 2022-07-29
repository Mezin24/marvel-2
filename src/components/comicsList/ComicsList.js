import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComicses } = useMarvelService();

  useEffect(() => {
    updateComicses(offset, false);
    // eslint-disable-next-line
  }, []);

  const updateComicses = (offset, isNewComicsLoaded = false) => {
    isNewComicsLoaded ? setNewItemsLoading(true) : setNewItemsLoading(false);

    getAllComicses(offset).then(onComicsLoaded);
  };

  const onComicsLoaded = (newComics) => {
    let ended = false;
    if (newComics.length < 8) {
      ended = true;
    }
    setComics([...comics, ...newComics]);
    setOffset((offset) => offset + 8);
    setNewItemsLoading(false);
    setComicsEnded(ended);
  };

  const renderComics = (comics) => {
    const items = comics.map((item, i) => {
      return (
        <li className='comics__item' key={i}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className='comics__item-img'
            />
            <div className='comics__item-name'>{item.title}</div>
            <div className='comics__item-price'>{item.price}</div>
          </Link>
        </li>
      );
    });

    return <ul className='comics__grid'>{items}</ul>;
  };

  const spinner = loading && !newItemsLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const comicsList = renderComics(comics);

  return (
    <div className='comics__list'>
      {spinner}
      {errorMessage}
      {comicsList}

      {!spinner && (
        <button
          onClick={() => updateComicses(offset, true)}
          disabled={newItemsLoading}
          style={{ display: comicsEnded ? 'none' : 'block' }}
          className='button button__main button__long'
        >
          <div className='inner'>
            {!newItemsLoading ? 'load more' : 'Loading...'}
          </div>
        </button>
      )}
    </div>
  );
};

export default ComicsList;
