import { Text, TextContent, TextVariants, Button } from '@patternfly/react-core';
import { useACSContext } from '../AdvancedClusterSecurityContext';

const ImageCheckTitle = () => {
  const { acsImageCheckResults } = useACSContext();

  return (
    <TextContent
      style={{
        marginBottom: 'var(--pf-v5-global--spacer--sm)',
      }}
    >
      <Text component={TextVariants.p}>
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
      </Text>
    </TextContent>
  );
};
export default ImageCheckTitle;
