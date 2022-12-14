import { BGG_GAMES_RANKS_STATIC, BGG_GAMES_RANKS_FUNCTION } from '../constants';

interface BGGGamesRanksData {
  date: string;
  games: {
    rank: number;
    name: string;
    year: string;
    id: string;
  }[];
}

let loadedBGGGamesRanks: BGGGamesRanksData = {
  date: '',
  games: [],
};

const loadBGGGamesRanks = async (isForceUpdate?: boolean): Promise<void> => {
  const response = await fetch(
    isForceUpdate ? BGG_GAMES_RANKS_FUNCTION : BGG_GAMES_RANKS_STATIC
  );

  loadedBGGGamesRanks = await response.json();
};

export const getBGGGamesRanks = async (
  isForceUpdate?: boolean
): Promise<BGGGamesRanksData> => {
  if (isForceUpdate || loadedBGGGamesRanks.games.length === 0) {
    await loadBGGGamesRanks(isForceUpdate);
  }

  return { ...loadedBGGGamesRanks };
};
