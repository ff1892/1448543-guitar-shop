type PageLayoutProps = {
  children: JSX.Element[],
};

function PageLayout({ children }: PageLayoutProps): JSX.Element {
  return(
    <div className="wrapper">
      { children }
    </div>
  );
}

export default PageLayout;
