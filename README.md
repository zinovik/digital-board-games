This application requires 2 files and 1 function:

**DIGITAL_BOARD_GAMES_URL** - a map of games with the arrays of places where to play it:

```typescript
interface DigitalBoardGamesData {
  [name: string]: string[];
}
```

**BGG_GAMES_RANKS_STATIC** - an object with the array of games with the bgg rank
**BGG_GAMES_RANKS_FUNCTION** - a function that returns a fresh data

```typescript
interface BGGGamesRanksData {
  date: string;
  games: {
    rank: number;
    name: string;
    year: string;
    id: string;
  }[];
}
```
