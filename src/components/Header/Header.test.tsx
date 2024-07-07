import { render, screen } from '@test-utils';
import { Header } from './Header';

describe('Header component', () => {
  it('has header present', () => {
    render(<Header />);
    expect(screen.getByText('VENDORS'));
  });
});
