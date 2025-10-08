import { Button, Content, ContentVariants } from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/js/icons';

const EnterpriseContractTitle = () => {
  return (
    <Content
      style={{
        marginBottom: 'var(--pf-t--global--spacer--sm)',
      }}
    >
      <Content component={ContentVariants.p}>
        Enterprise Contract is a set of tools for verifying the provenance of application snapshots
        and validating them against a clearly defined policy.
        <br />
        The Enterprise Contract policy is defined using the{' '}
        <Button
          variant="link"
          isInline
          iconPosition="right"
          icon={
            <ExternalLinkAltIcon
              style={{ fontSize: 'var(--pf-t--global--icon--size--font--xs)' }}
            />
          }
          component={(props) => (
            <a
              {...props}
              href="https://www.openpolicyagent.org/docs/latest/policy-language/"
              target="_blank"
              rel="noreferrer"
            />
          )}
        >
          rego policy language
        </Button>{' '}
        and is described here in{' '}
        <Button
          variant="link"
          style={{ padding: 0 }}
          icon={
            <ExternalLinkAltIcon
              style={{ fontSize: 'var(--pf-t--global--icon--size--font--xs)' }}
            />
          }
          iconPosition="right"
          component={(props) => (
            <a
              {...props}
              href="https://enterprisecontract.dev/docs/ec-policies/index.html"
              target="_blank"
              rel="noreferrer"
              aria-label="Release policy"
            />
          )}
        >
          Release Policy{' '}
        </Button>{' '}
        and{' '}
        <Button
          variant="link"
          style={{
            padding: 0,
          }}
          icon={
            <ExternalLinkAltIcon
              style={{ fontSize: 'var(--pf-t--global--icon--size--font--xs)' }}
            />
          }
          iconPosition="right"
        >
          Pipeline Policy
        </Button>
      </Content>
    </Content>
  );
};
export default EnterpriseContractTitle;
