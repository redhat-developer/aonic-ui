import * as React from 'react';
import { Tbody, Td, Tr } from '@patternfly/react-table';
import { ViolatedPolicy } from '../../../types';
import { getSeverityWithIcon } from '../../../utils/summary-utils';

type ACSDeploymentCheckRow = {
  data: ViolatedPolicy;
  rowIndex: number;
};

export const DeploymentCheckRow: React.FC<ACSDeploymentCheckRow> = ({ data }) => {
  return (
    <Tbody>
      <Tr>
        <Td>{data.name}</Td>
        <Td>{getSeverityWithIcon(data.severity)}</Td>
        <Td>{data.failingCheck ? 'yes' : 'no'}</Td>
        <Td>{data.description}</Td>
        <Td>{data.violation}</Td>
        <Td>{data.remediation}</Td>
      </Tr>
    </Tbody>
  );
};
