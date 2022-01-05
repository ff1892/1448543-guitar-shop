import { Link } from 'react-router-dom';
import './style.css';

function NotFoundPage(): JSX.Element {
  return (
    <main>
      <div className="container">
        <section className="not-found">
          <div className="not-found__wrapper">
            <div className="not-found__icon">
              <svg width="100" height="100" aria-hidden="true">
                <use xlinkHref="#guitarist"></use>
              </svg>
            </div>
            <h1 className="not-found__status">
              404.
              <br />
              Страница не найдена
            </h1>
            <Link className="not-found__link" to="/" title="Main Page">
                Перейти на главную страницу
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default NotFoundPage;
