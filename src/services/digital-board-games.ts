import axios from 'axios';

const DIGITAL_BOARD_GAMES_URL =
  'https://raw.githubusercontent.com/zinovik/digital-board-games-data/main/digital-board-games.json';

export interface DigitalBoardGamesData {
  [name: string]: string[];
}

let loadedDigitalBoardGames: DigitalBoardGamesData = {};

const loadDigitalBoardGames = async (): Promise<void> => {
  const response = await axios.get<DigitalBoardGamesData>(
    DIGITAL_BOARD_GAMES_URL
  );

  loadedDigitalBoardGames = response.data;
};

export const getDigitalBoardGames =
  async (): Promise<DigitalBoardGamesData> => {
    if (Object.keys(loadedDigitalBoardGames).length === 0) {
      await loadDigitalBoardGames();
    }

    return { ...loadedDigitalBoardGames };
  };
