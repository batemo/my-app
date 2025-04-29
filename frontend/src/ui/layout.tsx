import React from 'react';
import { spacing } from './tokens';

export const Flex: React.FC<{
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  gap?: keyof typeof spacing;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  gap = 'md',
  style,
  children,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: direction,
      alignItems: align,
      justifyContent:
        justify === 'between'
          ? 'space-between'
          : justify === 'center'
          ? 'center'
          : justify === 'end'
          ? 'flex-end'
          : 'flex-start',
      gap: spacing[gap],
      ...style,
    }}
  >
    {children}
  </div>
);

export const Grid: React.FC<{
  columns?: number;
  gap?: keyof typeof spacing;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ columns = 2, gap = 'md', style, children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: spacing[gap],
      ...style,
    }}
  >
    {children}
  </div>
); 