// frontend/tests/StudentForm.test.js
import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders Add a New Student heading', () => {
  render(<App />);
  const heading = screen.getByText(/Add a New Student/i);
  expect(heading).toBeInTheDocument();
});
