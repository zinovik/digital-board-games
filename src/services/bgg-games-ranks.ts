import { parseCsv } from './parseCsv';
import { BOARDGAMES_RANKS_CSV_URL } from '../constants';

export interface BGGGame {
  rank: number;
  name: string;
  year: string;
  id: string;
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

  return records.map((record) => ({
    rank: Number(record[rankIndex]),
    name: record[nameIndex],
    year: record[yearIndex],
    id: record[idIndex],
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
