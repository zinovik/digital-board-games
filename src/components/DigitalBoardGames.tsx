import { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { Ranks } from './Ranks';
import { Games } from './Games';
import { getGamesData } from '../services';
import {
  siteConfigs,
  ALSO_SHOW_GAMES_WITHOUT_IMPLEMENTATION_ID,
} from '../services/site-configs';
import { Game } from '../types/game';
import { FilterState, SitesFilter } from '../types/filter-state';

const SEARCH_CONFIG_NAME = '?sites=';

const initialSearchConfig = siteConfigs
  .map((siteConfig) => siteConfig.id)
  .join(',');

const searchConfigToFilter = (search: string): FilterState => {
  const sites = search.split(',');

  return {
    sites: siteConfigs.reduce(
      (acc, config) => ({
        ...acc,
        [config.title]: sites.includes(config.id),
      }),
      {} as SitesFilter
    ),
    isAlsoShowGamesWithoutImplementation: sites.includes(
      ALSO_SHOW_GAMES_WITHOUT_IMPLEMENTATION_ID
    ),
  };
};

const filterToSearchConfig = (filterState: FilterState): string | null => {
  const searchConfig = [
    ...siteConfigs
      .filter((siteConfig) => filterState.sites[siteConfig.title])
      .map((siteConfigs) => siteConfigs.id),
    ...(filterState.isAlsoShowGamesWithoutImplementation
      ? [ALSO_SHOW_GAMES_WITHOUT_IMPLEMENTATION_ID]
      : []),
  ].join(',');

  return searchConfig === initialSearchConfig ? null : searchConfig;
};

export const DigitalBoardGames = () => {
  const [gamesData, setGamesData] = useState({
    ranks: 0,
    games: [],
    date: '',
  } as {
    ranks: number;
    games: Game[];
    date: string;
  });

  const [filter, setFilter] = useState(
    searchConfigToFilter(
      window.location.search.includes(SEARCH_CONFIG_NAME)
        ? window.location.search.replace(SEARCH_CONFIG_NAME, '')
        : initialSearchConfig
    )
  );

  useEffect(() => {
    getGamesData(filter).then((result) => setGamesData(result));
  }, [filter]);

  const { games, ranks, date } = gamesData;

  const handleSetFilter = (filter: FilterState) => {
    window.history.pushState(
      {},
      '',
      filterToSearchConfig(filter) !== null
        ? `${SEARCH_CONFIG_NAME}${filterToSearchConfig(filter)}`
        : '/digital-board-games'
    );

    setFilter(filter);
  };

  const handleUpdateClick = async () =>
    getGamesData(filter, true).then((result) => {
      setGamesData(result);
    });

  const [isUpdating, setIsUpdating] = useState(false);

  const onUpdating = () => {
    setIsUpdating(true);

    return () => setIsUpdating(false);
  };

  if (gamesData.ranks === 0) return <>⏳ Loading...</>;

  return (
    <main>
      <Filter
        filter={filter}
        setFilter={handleSetFilter}
        isDisabled={isUpdating}
      />

      <Ranks date={date} update={handleUpdateClick} onUpdating={onUpdating} />

      <Games games={games} ranks={ranks} />
    </main>
  );
};
