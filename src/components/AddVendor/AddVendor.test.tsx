import { render, screen } from '@test-utils';
import { AddVendor } from './AddVendor';

describe('TableScrollArea component', () => {
  it('has table headers present', () => {
    render(<AddVendor onSave={() => {}} />);
    expect(screen.getByText('Name'));
    expect(screen.getByText('Company'));
    expect(screen.getByText('Email'));
    expect(screen.getByText('Category'));
  });
});
