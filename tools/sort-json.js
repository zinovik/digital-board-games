const fs = require("fs");
const { exec } = require("child_process");

const DIGITAL_BOARD_GAMES_FILE_PATH = "./digital-board-games.json";

const digitalBoardGamesBuffer = fs.readFileSync(DIGITAL_BOARD_GAMES_FILE_PATH);
const digitalBoardGamesString = digitalBoardGamesBuffer.toString();
const digitalBoardGames = JSON.parse(digitalBoardGamesString);

console.log("Sorting file...");
const digitalBoardGamesSorted = Object.keys(digitalBoardGames)
  .sort((game1, game2) => game1.localeCompare(game2))
  .filter((game) => digitalBoardGames[game].length > 0)
  .reduce(
    (acc, game) => ({
      ...acc,
      [game]: digitalBoardGames[game],
    }),
    {}
  );

fs.writeFileSync(
  DIGITAL_BOARD_GAMES_FILE_PATH,
  JSON.stringify(digitalBoardGamesSorted)
);
console.log("Done!");

console.log("Formatting file...");
exec(`npx prettier ${DIGITAL_BOARD_GAMES_FILE_PATH} --write`, (error) => {
  if (!error) console.log("Done!");
  else console.log(error);
});
