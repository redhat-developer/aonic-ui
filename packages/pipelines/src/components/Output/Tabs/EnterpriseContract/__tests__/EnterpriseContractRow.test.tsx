import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockEnterpriseContractUIData } from '../../../data';
import { EnterpriseContractPolicy } from '../../../types';
import { EnterpriseContractRow } from '../EnterpriseContractRow';

describe('EnterpriseContractRow', () => {
  test('should render empty default row', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<EnterpriseContractRow rowIndex={1} data={{} as EnterpriseContractPolicy} />);

    screen.getByTestId('ec-row-1');
  });
  test('should render row', () => {
    render(<EnterpriseContractRow rowIndex={1} data={mockEnterpriseContractUIData[0]} />);

    screen.getByTestId('ec-row-1');

    fireEvent.click(screen.getByRole('button', { name: 'Details' }));

    waitFor(() => {
      screen.getByTestId('ec-row-expanded-1');
    });
  });
});
