import { SiteTitle } from '../services/site-configs';

export type SitesFilter = Record<SiteTitle, boolean>;

export type FilterState = {
  sites: SitesFilter;
  isShallAllGames: boolean;
};
