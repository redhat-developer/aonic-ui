import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import OutputCard from '../OutputCard';

describe('OutputCard', () => {
  test('should render output card', () => {
    render(<OutputCard title="Output card">Card content</OutputCard>);

    screen.getByText('Output card');
  });

  test('should render output card', () => {
    render(<OutputCard title="Output card">Card content</OutputCard>);

    screen.getByText('Output card');

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Output card' }));
    });
    waitFor(() => {
      screen.getByText('Output content');
    });
  });
});
