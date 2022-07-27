import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    offset: 210,
    newItemsLoading: false,
    charEnded: false,
  };

  componentDidMount() {
    this.updateChars();
  }

  marvelService = new MarvelService();

  onCharLoaded = (newChars) => {
    let ended = newChars.length < 9 ? true : false;

    this.setState(({ chars, offset }) => ({
      chars: [...chars, ...newChars],
      loading: false,
      newItemsLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onCharLoading = () => {
    this.setState({ newItemsLoading: true });
  };

  updateChars = (offset) => {
    this.onCharLoading();

    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({ loading: false, error: true, newItemsLoading: false });
  };

  renderItems = (chars) => {
    const items = chars.map((char) => {
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
          key={char.id}
          className='char__item'
          onClick={() => this.props.onSelectChar(char.id)}
        >
          <img src={char.thumbnail} alt='abyss' style={imgStyles} />
          <div className='char__name'>{char.name}</div>
        </li>
      );
    });

    return <ul className='char__grid'>{items}</ul>;
  };

  render() {
    const { loading, error, chars, offset, newItemsLoading, charEnded } =
      this.state;

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(errorMessage || spinner) ? this.renderItems(chars) : null;

    return (
      <div className='char__list'>
        {content}
        {spinner}
        {errorMessage}
        <button
          className='button button__main button__long'
          onClick={() => this.updateChars(offset)}
          disabled={newItemsLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
        >
          <div className='inner'>
            {newItemsLoading ? 'Loading...' : 'load more'}
          </div>
        </button>
      </div>
    );
  }
}

export default CharList;

CharList.propTypes = {
  onSelectChar: PropTypes.func.isRequired,
};
