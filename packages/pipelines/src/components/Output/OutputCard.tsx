import * as React from 'react';
import {
  Card,
  CardBody,
  CardExpandableContent,
  CardHeader,
  CardTitle,
  Flex,
  FlexItem,
} from '@patternfly/react-core';

type OutputCardProps = {
  title: string;
  isOpen?: boolean;
  badge?: React.ReactNode;
  children: React.ReactNode;
};
const OutputCard: React.FC<OutputCardProps> = ({ title, badge, isOpen, children }) => {
  const [tabOpen, setTabOpen] = React.useState<boolean>(isOpen ?? false);
  const id = title?.replace(/\//g, '-')?.toLowerCase();

  return (
    <Card id={id} isExpanded={tabOpen} isPlain>
      <CardHeader
        onExpand={() => setTabOpen((open) => !open)}
        isToggleRightAligned={false}
        toggleButtonProps={{
          id: `${id}-toggle-button`,
          'aria-label': title,
          'aria-labelledby': `${id}-toggle-button`,
          'aria-expanded': tabOpen,
        }}
      >
        <CardTitle id={`{${id}-title}`}>
          <Flex gap={{ default: 'gapSm' }}>
            <FlexItem data-testid="card-title">{title}</FlexItem>
            <FlexItem data-testid="card-badge">{badge}</FlexItem>
          </Flex>
        </CardTitle>
      </CardHeader>
      <CardExpandableContent>
        <CardBody>{children}</CardBody>
      </CardExpandableContent>
    </Card>
  );
};
export default OutputCard;
