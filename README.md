This application requires 2 files and 1 function:

**DIGITAL_BOARD_GAMES_URL** - a map of games with the arrays of places where to play it:

```typescript
interface DigitalBoardGamesData {
  [name: string]: string[];
}
```

**BGG_GAMES_RANKS** - an object with the array of games with the bgg rank

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

### create bucket, setup cors, check the bucket's cors:

```bash
gcloud storage buckets create gs://digital-board-games --location=europe-central2
gcloud storage buckets update gs://digital-board-games --cors-file=cors_file.json
gcloud storage buckets describe gs://digital-board-games --format="default(cors_config)"
gcloud storage buckets update gs://digital-board-games --versioning
```
