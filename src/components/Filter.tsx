import {
  siteConfigs,
  SiteTitle,
  ALL,
  WITHOUT_IMPLEMENTATION,
} from '../services/site-configs';
import { FilterState, SitesFilter } from '../types/filter-state';
import { Icon } from './Icon';

interface Props {
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
  isDisabled?: boolean;
}

export const Filter = ({ filter, setFilter, isDisabled }: Props) => {
  const { sites, isWithoutImplementation } = filter;
  const isAllChecked =
    isWithoutImplementation && !Object.values(sites).includes(false);

  const handleAllChange = () => {
    const allSitesFilter = Object.keys(sites).reduce(
      (acc, site) => ({
        ...acc,
        [site]: !isAllChecked,
      }),
      {} as SitesFilter
    );

    setFilter({
      sites: allSitesFilter,
      isWithoutImplementation: !isAllChecked,
    });
  };

  const handleSiteChange = (title: SiteTitle) =>
    setFilter({
      sites: {
        ...sites,
        [title]: !sites[title],
      },
      isWithoutImplementation,
    });

  const handleIsWithoutImplementationChange = () =>
    setFilter({ sites, isWithoutImplementation: !isWithoutImplementation });

  return (
    <div style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
      <input
        type="checkbox"
        id={ALL}
        onChange={handleAllChange}
        checked={isAllChecked}
      />
      <label htmlFor={ALL}>{ALL}</label>

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
        id={WITHOUT_IMPLEMENTATION}
        onChange={handleIsWithoutImplementationChange}
        checked={isWithoutImplementation}
        disabled={isDisabled}
      />
      <label htmlFor={WITHOUT_IMPLEMENTATION}>{WITHOUT_IMPLEMENTATION}</label>
    </div>
  );
};
