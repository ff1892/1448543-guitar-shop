import {
  PageLayout,
  Header,
  Catalog,
  Footer
} from '../../components';

function MainPage(): JSX.Element {
  return (
    <PageLayout>
      <Header />
      <Catalog />
      <Footer />
    </PageLayout>
  );
}

export default MainPage;
