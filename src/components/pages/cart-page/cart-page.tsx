import {
  PageLayout,
  Header,
  Cart,
  Footer
} from '../../components';

function CartPage (): JSX.Element {
  return (
    <PageLayout>
      <Header />
      <Cart />
      <Footer />
    </PageLayout>
  );
}

export default CartPage;
