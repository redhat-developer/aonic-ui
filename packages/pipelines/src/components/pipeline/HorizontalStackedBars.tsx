import React from 'react';

import classNames from 'classnames';

import './HorizontalStackedBars.css';

type StackedValue = {
  color: string;
  name: string;
  size: number;
};

type HorizontalStackedBarsProps = {
  id: string;
  barGap?: number;
  height?: number | string;
  inline?: boolean;
  values: StackedValue[];
  width?: number | string;
  onClick?: () => void;
};

export const HorizontalStackedBars = ({
  id,
  barGap,
  height,
  inline,
  values,
  width,
  onClick,
}: HorizontalStackedBarsProps) => (
  <div
    id={`horizontal-stacked-bars-${id}`}
    data-testid={`horizontal-stacked-bars-${id}`}
    className={classNames('aonic-horizontal-stacked-bars', {
      'is-inline': inline,
    })}
    style={{ height, width, ['--bar-gap' as any]: barGap && `${barGap}px` }}
    onClick={onClick}
  >
    <div className="aonic-horizontal-stacked-bars__bars">
      {values.map(({ color, name, size }) => (
        <div
          key={name}
          className="aonic-horizontal-stacked-bars__data-bar"
          style={{
            background: color,
            flexGrow: size,
          }}
        />
      ))}
    </div>
  </div>
);
