import { render, screen } from '@testing-library/react';
import { acsImageScanResult } from '../../../../data';
import { ImageScanRow } from '../ImageScanRow';

describe('ImageScanRow', () => {
  test('should render row', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ImageScanRow rowIndex={1} data={acsImageScanResult.result.vulnerabilities[0]} />);

    screen.getByTestId('image-scan-row-1');
  });
});
