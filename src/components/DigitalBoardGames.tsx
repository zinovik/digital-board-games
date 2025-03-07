import { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { Ranks } from './Ranks';
import { Games } from './Games';
import { filterGames, getGamesData } from '../services';
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
    sites: siteConfigs.reduce((mutableAcc, config) => {
      mutableAcc[config.title] = sites.includes(config.id);
      return mutableAcc;
    }, {} as SitesFilter),
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

  useEffect(() => {
    getGamesData().then(setGamesData);
  }, []);

  const { games, ranks, date } = gamesData;

  const handleSetFilter = (filter: FilterState) => {
    window.history.pushState(
      {},
      '',
      filterToSearchConfig(filter) !== null
        ? `${SEARCH_CONFIG_NAME}${filterToSearchConfig(filter)}`
        : '/digital-board-games'
    );

    setGamesData({ ...gamesData }); // force reload
  };

  const filter = searchConfigToFilter(
    window.location.search.includes(SEARCH_CONFIG_NAME)
      ? window.location.search.replace(SEARCH_CONFIG_NAME, '')
      : initialSearchConfig
  );

  const filteredGames = filterGames(games, filter);

  return (
    <main>
      <Filter filter={filter} setFilter={handleSetFilter} />

      {ranks === 0 && (
        <div style={{ padding: '0.5rem' }}>⏳ Loading... Please wait</div>
      )}

      {ranks > 0 && (
        <>
          <Ranks date={date} />
          <Games games={filteredGames} ranks={ranks} />
        </>
      )}
    </main>
  );
};
