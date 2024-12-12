import { Button, Content, ContentVariants } from '@patternfly/react-core';
import { useACSContext } from '../AdvancedClusterSecurityContext';

const ImageScanTitle = () => {
  const { acsImageCheckResults } = useACSContext();

  return (
    <Content
      style={{
        marginBottom: "var(--pf-t--global--spacer--sm)",
      }}
    >
      <Content component={ContentVariants.p}>
        This task returns ACS vulnerability scan results for image:{' '}
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
export default ImageScanTitle;
