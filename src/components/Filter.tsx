import {
  siteConfigs,
  SiteTitle,
  SELECT_ALL,
  ALSO_SHOW_GAMES_WITHOUT_IMPLEMENTATION,
} from '../services/site-configs';
import { FilterState, SitesFilter } from '../types/filter-state';
import { Icon } from './Icon';

interface Props {
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
}

export const Filter = ({ filter, setFilter }: Props) => {
  const { sites, isAlsoShowGamesWithoutImplementation } = filter;
  const isSelectAllChecked =
    isAlsoShowGamesWithoutImplementation &&
    !Object.values(sites).includes(false);

  const handleSelectAllChange = () => {
    const allSitesFilter = (
      Object.keys(sites) as unknown as Array<keyof typeof sites>
    ).reduce((mutableAcc, site) => {
      mutableAcc[site] = !isSelectAllChecked;
      return mutableAcc;
    }, {} as SitesFilter);

    setFilter({
      sites: allSitesFilter,
      isAlsoShowGamesWithoutImplementation: !isSelectAllChecked,
    });
  };

  const handleSiteChange = (title: SiteTitle) =>
    setFilter({
      sites: {
        ...sites,
        [title]: !sites[title],
      },
      isAlsoShowGamesWithoutImplementation,
    });

  const handleIsAlsoShowGamesWithoutImplementationChange = () =>
    setFilter({
      sites,
      isAlsoShowGamesWithoutImplementation:
        !isAlsoShowGamesWithoutImplementation,
    });

  return (
    <div style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
      <input
        type="checkbox"
        id={SELECT_ALL}
        onChange={handleSelectAllChange}
        checked={isSelectAllChecked}
      />
      <label htmlFor={SELECT_ALL}>{SELECT_ALL}</label>

      {siteConfigs.map(({ title, icon }) => (
        <div key={title}>
          <input
            type="checkbox"
            id={title}
            onChange={() => handleSiteChange(title)}
            checked={sites[title]}
          />
          <label htmlFor={title}>
            <Icon src={icon} alt={title} />
            {title}
          </label>
        </div>
      ))}

      <input
        type="checkbox"
        id={ALSO_SHOW_GAMES_WITHOUT_IMPLEMENTATION}
        onChange={handleIsAlsoShowGamesWithoutImplementationChange}
        checked={isAlsoShowGamesWithoutImplementation}
      />
      <label htmlFor={ALSO_SHOW_GAMES_WITHOUT_IMPLEMENTATION}>
        {ALSO_SHOW_GAMES_WITHOUT_IMPLEMENTATION}
      </label>
    </div>
  );
};
