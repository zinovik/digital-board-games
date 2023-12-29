import { BGG_GAMES_RANKS } from '../constants';

export interface BGGGame {
  rank: number;
  name: string;
  year: string;
  id: string;
}

interface BGGGamesRanksData {
  date: string;
  games: BGGGame[];
}

let loadedBGGGamesRanks: BGGGamesRanksData = {
  date: '',
  games: [],
};

const loadBGGGamesRanks = async (): Promise<void> => {
  const response = await fetch(BGG_GAMES_RANKS);

  loadedBGGGamesRanks = await response.json();
};

export const getBGGGamesRanks = async (): Promise<BGGGamesRanksData> => {
  if (loadedBGGGamesRanks.games.length === 0) {
    await loadBGGGamesRanks();
  }

  return { ...loadedBGGGamesRanks };
};
