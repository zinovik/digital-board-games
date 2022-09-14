import axios from 'axios';
import { DIGITAL_BOARD_GAMES_URL } from '../constants';

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
