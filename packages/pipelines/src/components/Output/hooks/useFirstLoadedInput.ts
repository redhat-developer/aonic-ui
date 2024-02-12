import React from 'react';

export const useFirstLoadedInput = <T extends Object>(inputs: { name: T; value: any }[]): T => {
  const [firstLoadedInput, setFirstLoadedInput] = React.useState<T>();

  React.useEffect(() => {
    for (let i = 0; i < inputs.length; i++) {
      const inputValue = inputs[i].value;
      if (typeof inputValue === 'object') {
        if (Array.isArray(inputValue) && inputValue.length > 0) {
          setFirstLoadedInput(inputs[i].name);
          break;
        } else if (!Array.isArray(inputValue) && Object.keys(inputValue).length > 0) {
          setFirstLoadedInput(inputs[i].name);
          break;
        }
      } else if (inputValue !== undefined && inputValue !== '') {
        setFirstLoadedInput(inputs[i].name);
        break;
      }
    }
  }, [inputs]);

  return firstLoadedInput ?? inputs?.[0]?.name;
};
