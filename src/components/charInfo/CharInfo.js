import { useState, useEffect } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const updateChar = () => {
    const { charId } = props;
    if (!charId) return;
    onCharLoading();

    marvelService.getChatacterById(charId).then(onCharLoaded).catch(onError);
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
