import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChars();
  }

  marvelService = new MarvelService();

  onCharLoaded = (chars) => {
    this.setState({ chars, loading: false });
  };

  updateChars = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const { loading, error, chars } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content =
      chars.length > 0 ? (
        <ul className='char__grid'>
          {chars.map((char) => {
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
              <li key={char.id} className='char__item'>
                <img src={char.thumbnail} alt='abyss' style={imgStyles} />
                <div className='char__name'>{char.name}</div>
              </li>
            );
          })}
        </ul>
      ) : null;

    return (
      <div className='char__list'>
        {content}
        {spinner}
        {errorMessage}
        <button className='button button__main button__long'>
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
