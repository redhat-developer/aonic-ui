import * as React from 'react';
import { Button } from '@patternfly/react-core';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ExternalLinkAltIcon,
} from '@patternfly/react-icons/dist/js/icons';
import { Tbody, Td, Tr } from '@patternfly/react-table';
import { t_global_color_status_success_100 as greenColor } from '@patternfly/react-tokens/dist/js/t_global_color_status_success_100';
import { t_global_color_status_warning_100 as yellowColor } from '@patternfly/react-tokens/dist/js/t_global_color_status_warning_100';
import { Vulnerability } from '../../../types';
import { getSeverityWithIcon } from '../../../utils/summary-utils';

type ImageScanType = {
  data: Vulnerability;
  rowIndex: number;
};

export const ImageScanRow: React.FC<ImageScanType> = ({ data, rowIndex }) => {
  return (
    <Tbody data-testid={`image-scan-row-${rowIndex}`}>
      <Tr>
        <Td>
          <Button
            variant="link"
            isInline
            iconPosition="right"
            icon={
              <ExternalLinkAltIcon
                style={{ fontSize: 'var(--pf-t--global--icon--size--font--xs)' }}
              />
            }
            component={(props) => (
              <a {...props} href={data.cveInfo} target="_blank" rel="noreferrer" />
            )}
          >
            {data.cveId}
          </Button>
        </Td>
        <Td>{getSeverityWithIcon(data.cveSeverity)}</Td>
        <Td>{data.componentName}</Td>
        <Td>{data.componentVersion}</Td>
        <Td>
          {data.componentFixedVersion ? (
            <>
              <CheckCircleIcon color={greenColor.value} /> {data.componentFixedVersion}
            </>
          ) : (
            <>
              {' '}
              <ExclamationTriangleIcon color={yellowColor.value} /> Unavailable
            </>
          )}
        </Td>
      </Tr>
    </Tbody>
  );
};
