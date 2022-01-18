import './style.css';

type LoaderProps = {
  isFullPage? : boolean,
};

function Loader({ isFullPage = false }: LoaderProps): JSX.Element {
  return (
    <div
      className="loader"
      data-testid="loader"
      style={{
        height: `${isFullPage ? '100vh' : '100%'}`,
      }}
    >
      <div className="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
