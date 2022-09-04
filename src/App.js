
import './App.css';

export const App = () => {
  return (
    <div className="app-wrapper">
      <header className="header">
        <img
          src="https://i.pinimg.com/originals/82/12/e3/8212e3207e68b986fa25423918bb91d7.png"
          alt="logo"
        />
      </header>
      <nav className="nav">
        <div>
          <a href="#">Profile</a>
        </div>
        <div>
          <a href="#">Messages</a>
        </div>
        <div>
          <a href="#">News</a>
        </div>
        <div>
          <a href="#">Music</a>
        </div>
        <div>
          <a href="#">Settings</a>
        </div>
      </nav>
      <div className="content">
        <div>
          <img
            src="https://img.desktopwallpapers.ru/rocks/pics/wide/1920x1200/27640f370156a0e0ae3ee9608fc8480a.jpg"
            alt="back"
          />
        </div>
        <div>
          ava + description
        </div>
        <div>
          My post
        </div>
        <div>
          New post
        </div>
        <div>
          <div>post 1</div>
          <div>post 2</div>
        </div>
      </div>
    </div>
  );
}

export default App;
