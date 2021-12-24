import './style.css';

type ErrorWrapperProps = {
  isError: boolean,
  children: JSX.Element,
};

function ErrorWrapper ({ isError, children }: ErrorWrapperProps): JSX.Element {
  if (!isError) {
    return children;
  }
  return (
    <section className="error">
      <div className="error__wrapper">
        <div className='error__picture'>
        </div>
        <h3 className="error__title">
              Ошибка загрузки данных
        </h3>
        <p className="error__message">
            Попробуйте перезагрузить страницу
        </p>
      </div>
    </section>
  );
}

export default ErrorWrapper;
