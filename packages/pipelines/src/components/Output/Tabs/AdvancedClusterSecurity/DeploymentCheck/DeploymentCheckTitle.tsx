import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import { useACSContext } from '../AdvancedClusterSecurityContext';

const DeploymentCheckTitle: React.FC = () => {
  const { acsDeploymentCheckResults } = useACSContext();

  return (
    <TextContent
      style={{
        marginBottom: 'var(--pf-v5-global--spacer--sm)',
      }}
    >
      <Text component={TextVariants.p}>
        This task returns ACS vulnerability deployment check results for deployment:{' '}
        {acsDeploymentCheckResults?.results?.[0]?.metadata?.additionalInfo?.name}
      </Text>
    </TextContent>
  );
};
export default DeploymentCheckTitle;
