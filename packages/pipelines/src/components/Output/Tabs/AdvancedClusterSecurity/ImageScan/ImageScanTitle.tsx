import { Text, TextContent, TextVariants } from '@patternfly/react-core';

const ImageScanTitle = () => {
  return (
    <TextContent
      style={{
        marginBottom: 'var(--pf-v5-global--spacer--sm)',
      }}
    >
      <Text component={TextVariants.p}>
        This task returns ACS vulnerability scan results for image: quay.io/repo
      </Text>
    </TextContent>
  );
};
export default ImageScanTitle;
