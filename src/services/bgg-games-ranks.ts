import axios from 'axios';

const BGG_GAMES_RANKS_URL =
  'https://bgg-games-ranks.vercel.app/api/get-games?amount=2000';
const BGG_GAMES_RANKS_FORCE_UPDATE_URL = `${BGG_GAMES_RANKS_URL}&load`;

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
  const response = await axios.get<BGGGamesRanksData>(
    isForceUpdate ? BGG_GAMES_RANKS_FORCE_UPDATE_URL : BGG_GAMES_RANKS_URL
  );

  loadedBGGGamesRanks = response.data;
};

export const getBGGGamesRanks = async (
  isForceUpdate?: boolean
): Promise<BGGGamesRanksData> => {
  if (isForceUpdate || loadedBGGGamesRanks.games.length === 0) {
    await loadBGGGamesRanks(isForceUpdate);
  }

  return { ...loadedBGGGamesRanks };
};
