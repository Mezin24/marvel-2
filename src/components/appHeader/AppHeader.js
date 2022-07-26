import './appHeader.scss';

const AppHeader = () => {
  return (
    <header className='app__header'>
      <h1 className='app__title'>
        <a href='https://mail.ru'>
          <span>Marvel</span> information portal
        </a>
      </h1>
      <nav className='app__menu'>
        <ul>
          <li>
            <a href='https://mail.ru'>Characters</a>
          </li>
          /
          <li>
            <a href='https://mail.ru'>Comics</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
