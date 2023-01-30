import {
  siteConfigs,
  SiteTitle,
  SELECT_ALL,
  SHOW_ALL_GAMES,
} from '../services/site-configs';
import { FilterState, SitesFilter } from '../types/filter-state';
import { Icon } from './Icon';

interface Props {
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
  isDisabled?: boolean;
}

export const Filter = ({ filter, setFilter, isDisabled }: Props) => {
  const { sites, isShowAllGames } = filter;
  const isSelectAllChecked =
    isShowAllGames && !Object.values(sites).includes(false);

  const handleSelectAllChange = () => {
    const allSitesFilter = Object.keys(sites).reduce(
      (acc, site) => ({
        ...acc,
        [site]: !isSelectAllChecked,
      }),
      {} as SitesFilter
    );

    setFilter({
      sites: allSitesFilter,
      isShowAllGames: !isSelectAllChecked,
    });
  };

  const handleSiteChange = (title: SiteTitle) =>
    setFilter({
      sites: {
        ...sites,
        [title]: !sites[title],
      },
      isShowAllGames,
    });

  const handleIsShowAllGamesChange = () =>
    setFilter({ sites, isShowAllGames: !isShowAllGames });

  return (
    <div style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
      <input
        type="checkbox"
        id={SELECT_ALL}
        onChange={handleSelectAllChange}
        checked={isSelectAllChecked}
        disabled={isDisabled}
      />
      <label htmlFor={SELECT_ALL}>{SELECT_ALL}</label>

      {siteConfigs.map(({ title, icon }) => (
        <div key={title}>
          <input
            type="checkbox"
            id={title}
            onChange={() => handleSiteChange(title)}
            checked={sites[title]}
            disabled={isDisabled}
          />
          <label htmlFor={title}>
            <Icon src={icon} alt={title} />
            {title}
          </label>
        </div>
      ))}

      <input
        type="checkbox"
        id={SHOW_ALL_GAMES}
        onChange={handleIsShowAllGamesChange}
        checked={isShowAllGames}
        disabled={isDisabled}
      />
      <label htmlFor={SHOW_ALL_GAMES}>{SHOW_ALL_GAMES}</label>
    </div>
  );
};
