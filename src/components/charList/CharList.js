import { useState, useEffect, useRef } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

const CharList = ({ onSelectChar }) => {
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(210);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [charEnded, setCharEnded] = useState(false);

  useEffect(() => {
    updateChars();
    // eslint-disable-next-line
  }, []);

  const marvelService = new MarvelService();

  const onCharLoaded = (newChars) => {
    let ended = newChars.length < 9 ? true : false;
    setChars((chars) => [...chars, ...newChars]);
    setLoading(false);
    setNewItemsLoading(false);
    setOffset((prevOffset) => prevOffset + 9);
    setCharEnded(ended);
  };

  const onCharLoading = () => {
    setNewItemsLoading(true);
  };

  const updateChars = (offset) => {
    onCharLoading();

    marvelService.getAllCharacters(offset).then(onCharLoaded).catch(onError);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
    setNewItemsLoading(false);
  };

  const refs = useRef([]);
  const focusOnItem = (i) => {
    refs.current.forEach((item) =>
      item.classList.remove('char__item_selected')
    );
    refs.current[i].classList.add('char__item_selected');
    refs.current[i].focus();
  };

  const renderItems = (chars) => {
    const items = chars.map((char, i) => {
      let imgStyles;

      if (
        char.thumbnail &&
        char.thumbnail.includes(
          'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        )
      ) {
        imgStyles = { objectFit: 'fill' };
      }

      return (
        <li
          tabIndex={0}
          key={char.id}
          className='char__item'
          onClick={() => {
            onSelectChar(char.id);
            focusOnItem(i);
          }}
          ref={(el) => (refs.current[i] = el)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              focusOnItem(i);
            }
          }}
        >
          <img src={char.thumbnail} alt='abyss' style={imgStyles} />
          <div className='char__name'>{char.name}</div>
        </li>
      );
    });

    return <ul className='char__grid'>{items}</ul>;
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(errorMessage || spinner) ? renderItems(chars) : null;

  return (
    <div className='char__list'>
      {content}
      {spinner}
      {errorMessage}
      <button
        className='button button__main button__long'
        onClick={() => updateChars(offset)}
        disabled={newItemsLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
      >
        <div className='inner'>
          {newItemsLoading ? 'Loading...' : 'load more'}
        </div>
      </button>
    </div>
  );
};

export default CharList;
