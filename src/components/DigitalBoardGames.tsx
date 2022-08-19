import React, { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { Games } from './Games';
import { getGamesData } from '../services';
import { siteTitles } from '../services/site-configs';
import { Game } from '../types/game';
import { SitesFilter } from '../types/filter-state';

export const DigitalBoardGames = () => {
  const [gamesData, setGamesData] = useState({ ranks: 0, games: [] } as {
    ranks: number;
    games: Game[];
  });
  const [filter, setFilter] = useState({
    sites: siteTitles.reduce(
      (acc, title) => ({ ...acc, [title]: true }),
      {} as SitesFilter
    ),
    isWithoutImplementation: true,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    getGamesData(filter).then((result) => setGamesData(result));
  }, [filter]);

  const { games, ranks } = gamesData;

  const handleUpdateClick = () => {
    setIsUpdating(true);
    getGamesData(filter, true).then((result) => {
      setGamesData(result);
      setIsUpdating(false);
    });
  };

  return (
    <>
      <Filter filter={filter} setFilter={setFilter} />
      <Games games={games} ranks={ranks} />
      <button onClick={handleUpdateClick} disabled={isUpdating}>
        {isUpdating ? 'Updating, please wait...' : 'Update ranks'}
      </button>
    </>
  );
};
