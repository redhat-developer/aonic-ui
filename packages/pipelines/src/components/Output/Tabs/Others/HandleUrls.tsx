import * as React from 'react';
import { Button } from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/js/icons';

const URL_REGEXP =
  /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
export const GROUP_MATCH_REGEXP = new RegExp(`^(.*\\s)?(${URL_REGEXP.source})(\\s.*)?$`, 'i');

export const handleURLs = (value: string): React.ReactNode => {
  if (typeof value !== 'string') return JSON.stringify(value, null, 2);

  const matches = value.match(GROUP_MATCH_REGEXP);
  const [, prefix, link, suffix] = matches || [];

  if (link) {
    return (
      <>
        {handleURLs(prefix)}
        <Button
          variant="link"
          style={{ padding: 0 }}
          icon={
            <ExternalLinkAltIcon style={{ fontSize: "var(--pf-t--global--icon--size--font--xs)" }} />
          }
          iconPosition="right"
          component={(props) => (
            <a {...props} href={link} target="_blank" rel="noreferrer" aria-label="result link" />
          )}
        >
          {link}
        </Button>{' '}
        {handleURLs(suffix)}
      </>
    );
  }

  return value;
};
