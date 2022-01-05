import './style.css';

function NoOffers (): JSX.Element {
  return (
    <div className="no-offers">
      <div className="no-offers__icon">
        <svg width="70" height="70" aria-hidden="true">
          <use xlinkHref="#guitarist"></use>
        </svg>
      </div>
      <h2 className="no-offers__title">
        Ничего не нашлось
      </h2>
      <p className="no-offers__text">
        Попробуйте изменить настройки фильтра
      </p>
    </div>
  );
}

export default NoOffers;
