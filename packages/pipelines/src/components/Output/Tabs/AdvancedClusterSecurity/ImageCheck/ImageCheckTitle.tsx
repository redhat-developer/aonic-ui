import { Content, ContentVariants, Button } from '@patternfly/react-core';
import { useACSContext } from '../AdvancedClusterSecurityContext';

const ImageCheckTitle = () => {
  const { acsImageCheckResults } = useACSContext();

  return (
    <Content
      style={{
        marginBottom: "var(--pf-t--global--spacer--sm)",
      }}
    >
      <Content component={ContentVariants.p}>
        This task returns ACS vulnerability image check results for image:{' '}
        <Button
          variant="link"
          isInline
          component={(props) => (
            <a
              {...props}
              href={`https://${acsImageCheckResults?.results?.[0]?.metadata?.additionalInfo?.name}`}
              target="_blank"
              rel="noreferrer"
            />
          )}
        >
          {acsImageCheckResults?.results?.[0]?.metadata?.additionalInfo?.name}
        </Button>
      </Content>
    </Content>
  );
};
export default ImageCheckTitle;
