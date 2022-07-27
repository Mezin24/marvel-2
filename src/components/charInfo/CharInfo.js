import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProp) {
    if (this.props.charId !== prevProp.charId) {
      this.updateChar();
    }
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) return;
    this.onCharLoading();

    this.marvelService
      .getChatacterById(this.props.charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, error, loading } = this.state;
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
  }
}

const View = (props) => {
  const { name, description, thumbnail, homepage, wiki, comics } = props.char;

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
