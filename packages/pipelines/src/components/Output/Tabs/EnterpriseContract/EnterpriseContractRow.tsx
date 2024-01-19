import * as React from 'react';
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Timestamp,
  Truncate,
} from '@patternfly/react-core';
import { ExpandableRowContent, Tbody, Td, Tr } from '@patternfly/react-table';
import { EnterpriseContractPolicy } from '../../types';
import { getRuleStatus } from '../../utils/summary-utils';

type EnterpriseContractRowType = {
  data: EnterpriseContractPolicy;
  rowIndex: number;
};

export const EnterpriseContractRow: React.FC<EnterpriseContractRowType> = ({ data, rowIndex }) => {
  const [rowExpanded, setRowExpanded] = React.useState<boolean>(false);

  return (
    <Tbody isExpanded={rowExpanded} data-testid="row">
      <Tr data-testid={`ec-row-${rowIndex}`}>
        <Td
          data-testid={`ec-row-expand-${rowIndex}`}
          expand={{
            rowIndex,
            isExpanded: rowExpanded,
            onToggle: () => setRowExpanded((e) => !e),
          }}
        />
        <Td>{data.title ?? '-'}</Td>
        <Td data-testid="rule-status">{getRuleStatus(data.status)}</Td>
        <Td>{data.msg ? <Truncate content={data.msg} /> : '-'}</Td>
      </Tr>
      <Tr isExpanded={rowExpanded} data-testid={`ec-row-expanded-${rowIndex}`}>
        <Td />
        <Td colSpan={4}>
          <ExpandableRowContent>
            <DescriptionList
              isAutoColumnWidths
              columnModifier={{
                default: '3Col',
              }}
            >
              <DescriptionListGroup>
                <DescriptionListTerm>Rule Description</DescriptionListTerm>
                <DescriptionListDescription>{data.description ?? '-'}</DescriptionListDescription>
              </DescriptionListGroup>
              {data?.collection?.length ? (
                <DescriptionListGroup>
                  <DescriptionListTerm>Collection</DescriptionListTerm>
                  <DescriptionListDescription>
                    <a href="https://enterprisecontract.dev/docs/ec-policies/release_policy.html#_available_rule_collections">
                      {data.collection.join(', ')}
                    </a>
                  </DescriptionListDescription>
                </DescriptionListGroup>
              ) : null}
              {data.solution ? (
                <DescriptionListGroup>
                  <DescriptionListTerm>Solution</DescriptionListTerm>
                  <DescriptionListDescription>{data.solution}</DescriptionListDescription>
                </DescriptionListGroup>
              ) : null}
              {data.timestamp ? (
                <DescriptionListGroup>
                  <DescriptionListTerm>Effective from</DescriptionListTerm>
                  <DescriptionListDescription>
                    <Timestamp>{data.timestamp}</Timestamp>
                  </DescriptionListDescription>
                </DescriptionListGroup>
              ) : null}
            </DescriptionList>
          </ExpandableRowContent>
        </Td>
      </Tr>
    </Tbody>
  );
};
