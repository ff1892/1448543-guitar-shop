import { Link } from 'react-router-dom';

type PageNavigationProps = {
  title: string,
  linkData: {
    label: string,
    link: string,
  }[]
};


function PageNavigation({ title, linkData }: PageNavigationProps): JSX.Element {
  return (
    <>
      <h1 className="page-content__title title title--bigger">
        {title}
      </h1>
      <ul className="breadcrumbs page-content__breadcrumbs">

        {
          linkData.map(({label, link}) => (
            <li className="breadcrumbs__item" key={label}>
              <Link className="link" to={link}>
                {label}
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  );
}

export default PageNavigation;
