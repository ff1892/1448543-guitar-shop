import { useState, MouseEvent } from 'react';
import { Guitar } from '../../../types/data';
import { getFormattedType } from '../../../utils/common';

type OfferTabsProps = {
  offer: Guitar,
};

const tabItems = {
  features: {
    label: 'Характеристики',
    name: 'characteristics',
  },
  description: {
    label: 'Описание',
    name: 'description',
  },
};

const featuresName = tabItems.features.name;
const descriptionName = tabItems.description.name;


function OfferTabs ({ offer }: OfferTabsProps): JSX.Element {

  const [tabState, setTabState] = useState<string>(featuresName);

  const onTabClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    const currentTab = evt.currentTarget.dataset.tab;
    if (currentTab) {
      setTabState(currentTab);
    }
  };

  const {
    vendorCode,
    type,
    stringCount,
    description,
  } = offer;

  const formattedType = getFormattedType(type);

  return (
    <div className="tabs">
      {
        Object.values(tabItems).map(({label, name}) => (
          <a
            key={name}
            className={`button button--medium tabs__button ${name !== tabState ? 'button--black-border': ''}`}
            href={`#${name}`}
            data-tab={name}
            onClick={onTabClick}
          >
            {label}
          </a>
        ))
      }
      <div className="tabs__content" id={tabState}>

        { tabState === featuresName &&
          <table className="tabs__table">
            <tbody>
              <tr className="tabs__table-row">
                <td className="tabs__title">Артикул:</td>
                <td className="tabs__value">{vendorCode}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Тип:</td>
                <td className="tabs__value">{formattedType}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Количество струн:</td>
                <td className="tabs__value">{stringCount} струнная</td>
              </tr>
            </tbody>
          </table> }

        { tabState === descriptionName &&
          <p className="tabs__product-description">
            {description}
          </p> }

      </div>
    </div>
  );
}

export default OfferTabs;
