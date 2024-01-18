import React from 'react';
import { render } from '@testing-library/react';

import PipelinesButton from './PipelinesButton';

describe('PipelinesButton', () => {
  test('renders the PipelinesButton component', () => {
    render(<PipelinesButton label="Hello" />);
  });
});
