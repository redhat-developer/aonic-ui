import React from 'react';

import './Button.scss';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  return (
    <button className="aonic-button" onClick={props.onClick}>
      {props.label}
    </button>
  );
};

export default Button;
