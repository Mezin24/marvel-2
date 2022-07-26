import { Component } from 'react';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';

class RandomChar extends Component {
  state = {
    char: {},
  };
  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  onCharLoaded = (char) => {
    this.setState({ char });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService.getChatacterById(id).then(this.onCharLoaded);
  };

  render() {
    const {
      char: { name, description, thumbnail, homepage, wiki },
    } = this.state;

    let charDescr = description
      ? description
      : 'Sorry, no information about this character yet...';

    if (charDescr.length > 150) {
      charDescr = charDescr.slice(0, 150) + '...';
    }

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
      <div className='randomchar'>
        <div className='randomchar__block'>
          <img
            style={imgStyles}
            src={thumbnail}
            alt='Random character'
            className='randomchar__img'
          />
          <div className='randomchar__info'>
            <p className='randomchar__name'>{name}</p>
            <p className='randomchar__descr'>{charDescr}</p>
            <div className='randomchar__btns'>
              <a href={homepage} className='button button__main'>
                <div className='inner'>homepage</div>
              </a>
              <a href={wiki} className='button button__secondary'>
                <div className='inner'>Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className='randomchar__static'>
          <p className='randomchar__title'>
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className='randomchar__title'>Or choose another one</p>
          <button className='button button__main'>
            <div className='inner'>try it</div>
          </button>
          <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
        </div>
      </div>
    );
  }
}

export default RandomChar;
