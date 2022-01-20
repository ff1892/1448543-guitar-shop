import { ReactNode } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';

type ModalWrapperProps = {
  isVisibleChild: boolean,
  children: ReactNode,
};

function ModalWrapper({ children, isVisibleChild }: ModalWrapperProps): JSX.Element {
  return(
    <FocusLock disabled={!isVisibleChild}>
      <RemoveScroll enabled={isVisibleChild}>
        {children}
      </RemoveScroll>
    </FocusLock>
  );
}

export default ModalWrapper;
