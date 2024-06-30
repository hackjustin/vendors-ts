import { render, screen } from '@test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('has correct welcome title', () => {
    render(<Welcome />);
    expect(screen.getByText('VENDORS'));
  });
});
