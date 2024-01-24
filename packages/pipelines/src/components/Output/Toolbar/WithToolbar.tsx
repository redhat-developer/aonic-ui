import * as React from 'react';
import ToolbarContextProvider from './ToolbarContext';

/**
 * withToolbar component provides basic toolbar features such as namefilter and statusfilter
 * @param WrappedComponent
 * @returns component with toolbar features
 */
const withToolbar = (
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  WrappedComponent: React.FC<{ [key: string]: any }>,
) => {
  const WithToolbar = (props: any) => {
    return (
      <ToolbarContextProvider>
        <WrappedComponent {...props} />
      </ToolbarContextProvider>
    );
  };

  WithToolbar.displayName = `withToolbar(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithToolbar;
};

export default withToolbar;
