import { Loader } from '../../components';

type LoaderWrapperProps = {
  isLoaded: boolean,
  children: JSX.Element,
};

function LoaderWrapper({ isLoaded, children }: LoaderWrapperProps): JSX.Element {
  return (isLoaded && children) || <Loader />;
}

export default LoaderWrapper;
