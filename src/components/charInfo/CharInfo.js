<<<<<<< HEAD
import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';
=======
import { useState, useEffect } from 'react';
>>>>>>> eb858fe74ba542068db7e84e04cf123d9f1c6b31

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { loading, error, getChatacterById, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const { charId } = props;
    if (!charId) return;

    getChatacterById(charId).then(onCharLoaded);
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;
  const skeleton = loading || error || char ? null : <Skeleton />;

  return (
    <div className='char__info'>
      {spinner}
      {errorMessage}
      {content}
      {skeleton}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  let imgStyles;

  if (
    thumbnail &&
    thumbnail.includes(
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    )
  ) {
    imgStyles = { objectFit: 'contain' };
  }

  return (
    <>
      <div className='char__basics'>
        <img src={thumbnail} alt={name} style={imgStyles} />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description} </div>
      <div className='char__comics'>Comics:</div>
      {comics.length === 0 ? (
        'Sorry, no information...'
      ) : (
        <ul className='char__comics-list'>
          {[...comics].splice(0, 10).map((item, i) => (
            <li className='char__comics-item' key={i}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CharInfo;

CharInfo.propTypes = {
  charId: PropTypes.number,
};
