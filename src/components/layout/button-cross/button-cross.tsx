type ButtonCrossProps = {
  onButtonClick: () => void,
};

function ButtonCross ({ onButtonClick }: ButtonCrossProps): JSX.Element {
  return (
    <button
      className="modal__close-btn button-cross"
      type="button"
      aria-label="Закрыть"
      onClick={onButtonClick}
    >
      <span className="button-cross__icon"></span>
      <span className="modal__close-btn-interactive-area"></span>
    </button>
  );
}

export default ButtonCross;
