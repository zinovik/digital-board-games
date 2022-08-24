import { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { Ranks } from './Ranks';
import { Games } from './Games';
import { getGamesData } from '../services';
import { siteTitles } from '../services/site-configs';
import { Game } from '../types/game';
import { SitesFilter } from '../types/filter-state';

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
  const [filter, setFilter] = useState({
    sites: siteTitles.reduce(
      (acc, title) => ({ ...acc, [title]: true }),
      {} as SitesFilter
    ),
    isWithoutImplementation: true,
  });

  useEffect(() => {
    getGamesData(filter).then((result) => setGamesData(result));
  }, [filter]);

  const { games, ranks, date } = gamesData;

  const handleUpdateClick = async () =>
    getGamesData(filter, true).then((result) => {
      setGamesData(result);
    });

  if (gamesData.ranks === 0) return <main>⏳ Loading...</main>;

  return (
    <main>
      <Filter filter={filter} setFilter={setFilter} />

      <Ranks date={date} update={handleUpdateClick} />

      <Games games={games} ranks={ranks} />
    </main>
  );
};
