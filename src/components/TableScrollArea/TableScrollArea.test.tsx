import { render, screen } from '@test-utils';
import { TableScrollArea } from './TableScrollArea';

describe('TableScrollArea component', () => {
  it('has table headers present', () => {
    render(<TableScrollArea />);
    expect(screen.getByText('Name'));
    expect(screen.getByText('Company'));
    expect(screen.getByText('Email'));
    expect(screen.getByText('Category'));
  });
});
