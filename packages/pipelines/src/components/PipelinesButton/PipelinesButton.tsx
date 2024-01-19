import React from 'react';

import './PipelinesButton.scss';

export interface PipelinesButtonProps {
  label: string;
  onClick?: () => void;
}

const PipelinesButton: React.FunctionComponent<PipelinesButtonProps> = (
  props: PipelinesButtonProps,
) => {
  return (
    <button className="aonic-button" onClick={props.onClick}>
      {props.label} Pipelines Button
    </button>
  );
};

export default PipelinesButton;
