import { Bullseye, EmptyState, EmptyStateBody, EmptyStateVariant } from '@patternfly/react-core';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { handleURLs } from './HandleUrls';

export interface ResultsListProps {
  results: {
    name: string;
    value: string;
  }[];
  pipelineRunName: string;
  pipelineRunStatus: string;
}

const ResultsList: React.FC<ResultsListProps> = ({
  results,
  pipelineRunName,
  pipelineRunStatus,
}) => {
  if (!results.length) return null;

  return (
    <>
      {pipelineRunStatus !== 'Failed' ? (
        <Table data-testid="results-table" aria-label="results" data-codemods="true">
          <Thead>
            <Tr>
              <Th width={25}>Name</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {results.map(({ name, value }) => (
              <Tr key={`row-${name}`}>
                <Td>{name}</Td>
                <Td>{handleURLs(value)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Bullseye>
          <EmptyState variant={EmptyStateVariant.full}>
            <EmptyStateBody>
              {`${pipelineRunName} results not available due to failure`}
            </EmptyStateBody>
          </EmptyState>
        </Bullseye>
      )}
    </>
  );
};

export default ResultsList;
