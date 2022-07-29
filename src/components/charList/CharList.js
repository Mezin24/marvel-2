import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

const CharList = ({ onSelectChar }) => {
  const [chars, setChars] = useState([]);
  const [offset, setOffset] = useState(210);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters, clearError } = useMarvelService();

  useEffect(() => {
    updateChars();
    // eslint-disable-next-line
  }, []);

  const onCharLoaded = (newChars) => {
    let ended = newChars.length < 9 ? true : false;
    setChars([...chars, ...newChars]);
    setNewItemsLoading(true);
    setNewItemsLoading(false);
    setOffset((prevOffset) => prevOffset + 9);
    setCharEnded(ended);
  };

  const updateChars = (offset, isNewItemsLoading) => {
    clearError();
    isNewItemsLoading ? setNewItemsLoading(true) : setNewItemsLoading(false);
    getAllCharacters(offset).then(onCharLoaded);
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
              onSelectChar(char.id);
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

  const spinner = loading && !newItemsLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className='char__list'>
      {renderItems(chars)}
      {spinner}
      {errorMessage}
      <button
        className='button button__main button__long'
        onClick={() => updateChars(offset, true)}
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

CharList.propTypes = {
  onSelectChar: PropTypes.func.isRequired,
};
