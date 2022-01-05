import {
  PageLayout,
  Header,
  Catalog,
  Footer
} from '../../components';

function MainPage(): JSX.Element {
  return (
    <PageLayout>
      <Header isMainPage />
      <Catalog />
      <Footer isMainPage />
    </PageLayout>
  );
}

export default MainPage;
