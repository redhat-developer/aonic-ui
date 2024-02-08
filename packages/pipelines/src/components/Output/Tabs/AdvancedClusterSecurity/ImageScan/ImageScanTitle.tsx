import { Button, Text, TextContent, TextVariants } from '@patternfly/react-core';
import { useACSContext } from '../AdvancedClusterSecurityContext';

const ImageScanTitle = () => {
  const { acsImageCheckResults } = useACSContext();

  return (
    <TextContent
      style={{
        marginBottom: 'var(--pf-v5-global--spacer--sm)',
      }}
    >
      <Text component={TextVariants.p}>
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
      </Text>
    </TextContent>
  );
};
export default ImageScanTitle;
