export interface Game {
  rank: number;
  name: string;
  year?: string;
  id?: string;
  sites: string[];
  average?: number;
  usersRated?: number;
}
