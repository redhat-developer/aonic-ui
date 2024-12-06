import { Content, ContentVariants } from '@patternfly/react-core';
import { useACSContext } from '../AdvancedClusterSecurityContext';

const DeploymentCheckTitle: React.FC = () => {
  const { acsDeploymentCheckResults } = useACSContext();

  return (
    <Content
      style={{
        marginBottom: "var(--pf-t--global--spacer--sm)",
      }}
    >
      <Content component={ContentVariants.p}>
        This task returns ACS vulnerability deployment check results for deployment:{' '}
        {acsDeploymentCheckResults?.results?.[0]?.metadata?.additionalInfo?.name}
      </Content>
    </Content>
  );
};
export default DeploymentCheckTitle;
