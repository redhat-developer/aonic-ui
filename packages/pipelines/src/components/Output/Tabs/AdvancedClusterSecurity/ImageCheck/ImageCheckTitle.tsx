import { Text, TextContent, TextVariants } from '@patternfly/react-core';

const ImageCheckTitle = () => {
  return (
    <TextContent
      style={{
        marginBottom: 'var(--pf-v5-global--spacer--sm)',
      }}
    >
      <Text component={TextVariants.p}>
        This task returns ACS vulnerability image check results for image: quay.io/repo
      </Text>
    </TextContent>
  );
};
export default ImageCheckTitle;
