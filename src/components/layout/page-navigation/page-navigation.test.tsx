import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import PageNavigation from './page-navigation';

const history = createMemoryHistory();

const { title, linkData } = {
  title: 'FakeTitle',
  linkData: [
    {label: 'FirstFake', link: '/fakelink'},
    {label: 'SecondFake', link: '/fakelink'},
    {label: 'ThirdFake', link: '/fakelink'},
  ],
};


describe('Component: PageNavigation', () => {
  const fakePageNavigation  = (
    <Router history={history}>
      <PageNavigation title={title} linkData={linkData} />;
    </Router>
  );

  it('should render correctly', () => {
    render(fakePageNavigation);
    expect(screen.getByText(/FakeTitle/i)).toBeInTheDocument();
    expect(screen.getByText(/FirstFake/i)).toBeInTheDocument();
    expect(screen.getByText(/SecondFake/i)).toBeInTheDocument();
    expect(screen.getByText(/ThirdFake/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
});
