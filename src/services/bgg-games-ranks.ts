import { parseCsv } from './parseCsv';
import { BOARDGAMES_RANKS_CSV_URL } from '../constants';

interface BGGGame {
  rank: number;
  name: string;
  year: string;
  id: string;
  average: number;
  usersRated: number;
}

let cachedGames: BGGGame[] | null = null;
let inFlightRequest: Promise<BGGGame[]> | null = null;

async function fetchCsvText(url: string, timeoutMs = 30_000): Promise<string> {
  const response = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });

  if (!response.ok) {
    throw new Error(`Failed to fetch boardgames rank data: ${response.status}`);
  }

  return response.text();
}

async function fetchAndParseBGGGamesRanks(): Promise<BGGGame[]> {
  const csv = await fetchCsvText(BOARDGAMES_RANKS_CSV_URL);

  const [header, ...records]: string[][] = parseCsv(csv, 9999);

  const rankIndex = header.indexOf('rank');
  const nameIndex = header.indexOf('name');
  const yearIndex = header.indexOf('yearpublished');
  const idIndex = header.indexOf('id');
  const averageIndex = header.indexOf('average');
  const usersRatedIndex = header.indexOf('usersrated');

  return records.map((record) => ({
    rank: Number(record[rankIndex]),
    name: record[nameIndex],
    year: record[yearIndex],
    id: record[idIndex],
    average: Number(record[averageIndex]),
    usersRated: Math.round(Number(record[usersRatedIndex]) / 1000),
  }));
}

export const getBGGGamesRanks = async (): Promise<BGGGame[]> => {
  if (cachedGames) return cachedGames;

  if (!inFlightRequest) {
    inFlightRequest = fetchAndParseBGGGamesRanks()
      .then((games) => {
        cachedGames = games;
        return games;
      })
      .finally(() => {
        inFlightRequest = null;
      });
  }

  return inFlightRequest;
};
