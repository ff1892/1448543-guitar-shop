import './style.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../constants';

function CartEmpty (): JSX.Element {
  return (
    <section className="cart-empty">
      <div className="cart-empty__wrapper">
        <div className="cart-empty__icon">
          <svg width="100" height="100" aria-hidden="true">
            <use xlinkHref="#guitarist"></use>
          </svg>
        </div>
        <h2 className="cart-empty__status">
          В корзине пока ничего нет
        </h2>
        <Link
          className="cart-empty__link"
          to={AppRoute.Start}
          title="Main Page"
        >
          Отправиться за покупками
        </Link>
      </div>
    </section>
  );
}

export default CartEmpty;
