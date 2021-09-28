import { render, screen } from '@testing-library/react';
import HrApp from './App';

test('renders learn react link', () => {
  render(<HrApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
