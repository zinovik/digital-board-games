import React from 'react';
import { Icon } from './Icon';
import { getSiteData } from '../services/index';

interface Props {
  site: string;
}

export const SiteLink = ({ site }: Props) => {
  const { icon, title } = getSiteData(site);

  return (
    <a
      href={site}
      target="_blank"
      rel="noreferrer"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <Icon src={icon} alt={title} />
    </a>
  );
};
