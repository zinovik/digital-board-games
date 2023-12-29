const https = require("https");

const BGG_GAMES_URL =
  "https://raw.githubusercontent.com/zinovik/bgg-games-ranks-data/main/bgg-games-ranks.json";

const digitalBoardGames = require("../digital-board-games.json");

const NAME_ID_SEPARATOR = "|";

const request = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const data = [];
        res.on("data", (chunk) => data.push(chunk));
        res.on("end", () =>
          resolve(JSON.parse(Buffer.concat(data).toString()))
        );
      })
      .on("error", (err) => {
        reject(err.message);
      });
  });

(async () => {
  const bggGames = await request(BGG_GAMES_URL);

  Object.keys(digitalBoardGames).forEach((digitalBoardGameName) => {
    if (
      !bggGames.games.some((game) => {
        const separatorIndex = digitalBoardGameName.indexOf(NAME_ID_SEPARATOR);

        if (separatorIndex === -1) return game.name === digitalBoardGameName;

        return game.id === digitalBoardGameName.slice(separatorIndex + 1);
      })
    ) {
      console.log(digitalBoardGameName);
    }
  });
})();
