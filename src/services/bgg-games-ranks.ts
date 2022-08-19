// import axios from 'axios';
import bggGamesRanks from '../bgg-games-ranks.json';

// const BGG_GAMES_RANKS_URL = 'URL';

interface BGGGamesRanksData {
  date: string;
  games: {
    rank: string;
    name: string;
    year: string;
    link: string;
  }[];
}

let loadedBGGGamesRanks: BGGGamesRanksData = {
  date: '',
  games: [],
};

const loadBGGGamesRanks = async (isForceUpdate?: boolean): Promise<void> => {
  // const response = await axios.get<BGGGamesRanksData>(BGG_GAMES_RANKS_URL);

  // loadedBGGGamesRanks = response.data;
  loadedBGGGamesRanks = bggGamesRanks;
};

export const getBGGGamesRanks = async (
  isForceUpdate?: boolean
): Promise<BGGGamesRanksData> => {
  if (isForceUpdate || loadedBGGGamesRanks.games.length === 0) {
    await loadBGGGamesRanks(isForceUpdate);
  }

  return { ...loadedBGGGamesRanks };
};
