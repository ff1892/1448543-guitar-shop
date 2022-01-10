import { renderHook } from '@testing-library/react-hooks';
import useQuery from './use-query';

const pathName = '/pathname';
const searchQuery='_search=someSearch';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: pathName,
    search: searchQuery,
  }),
}));

describe('useQuery()', () => {
  it('should return search query', () => {
    const {
      result: { current: query },
    } = renderHook(() => useQuery());
    expect(query.toString()).toBe(searchQuery);
  });
});
