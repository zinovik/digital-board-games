import React from 'react';

interface Props {
  src: string;
  alt: string;
}

export const Icon = ({ src, alt }: Props) => (
  <img
    src={src}
    style={{
      maxHeight: 20,
      maxWidth: 20,
      marginLeft: 2,
      marginRight: 2,
      marginBottom: 0,
    }}
    alt={alt}
  />
);
