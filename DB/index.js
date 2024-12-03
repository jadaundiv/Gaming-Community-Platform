let express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

let app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './DB/database.sqlite',
    driver: sqlite3.Database,
  });
})();

// Endpoint 1
async function getAllGames() {
  let query = 'SELECT * FROM games';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/games', async (req, res) => {
  try {
    let result = await getAllGames();
    if (result.games.length === 0) {
      return res.status(404).json({ message: 'Games not found' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint 2
async function getGameById(id) {
  let query = 'SELECT * FROM games WHERE id = ?';
  let response = await db.all(query, [id]);
  return { games: response };
}

app.get('/games/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let result = await getGameById(id);
    if (result.games.length === 0) {
      return res.status(404).json({ message: 'Game not found' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint 3
async function getGamesByGenre(genre) {
  let query = 'SELECT * FROM games WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return { games: response };
}

app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  try {
    let result = await getGamesByGenre(genre);
    if (result.games.length === 0) {
      return res.status(404).json({ message: 'Game not found' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint 4
async function getGameByPlatform(platform) {
  let query = 'SELECT * FROM games WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return { games: response };
}

app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let result = await getGameByPlatform(platform);
    if (result.games.length === 0) {
      return res.status(404).json({ message: 'Game not found' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint 5
async function getGamesByRating() {
  let query = 'SELECT * FROM games ORDER BY rating DESC ';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/games/sort-by-rating', async (req, res) => {
  try {
    let result = await getGamesByRating();
    if (result.games.length === 0) {
      return res.status(404).json({ message: 'Game not found' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint 6
async function getAllPlayers() {
  let query = 'SELECT * FROM players';
  let response = await db.all(query, []);
  return { players: response };
}

app.get('/players', async (req, res) => {
  try {
    let result = await getAllPlayers();
    if (result.players.length === 0) {
      return res.status(404).json({ message: 'Player not found' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint 7
async function getPlayerById(id) {
  let query = 'SELECT * FROM players WHERE id = ?';
  let response = await db.all(query, [id]);
  return { players: response };
}

app.get('/players/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let result = await getPlayerById(id);
    if (result.players.length === 0) {
      return res.status(404).json({ message: 'Player not found' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint 8
async function getPlayerByPlatform(platform) {
  let query = 'SELECT * FROM players WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return { players: response };
}

app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let result = await getPlayerByPlatform(platform);
    if (result.players.length === 0) {
      return res.status(404).json({ message: 'Player not found' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint 9
async function getPlayerByRating() {
  let query = 'SELECT * FROM players ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { players: response };
}

app.get('/players/sort-by-rating', async (req, res) => {
  try {
    let result = await getPlayerByRating();
    if (result.players.length === 0) {
      return res.status(404).json({ message: 'Player not found' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint 10
async function getAllTournaments() {
  let query = 'SELECT * FROM tournaments';
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get('/tournaments', async (req, res) => {
  try {
    let result = await getAllTournaments();
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: 'Tournaments not found' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint 11
async function getTournamentById(id) {
  let query = 'SELECT * FROM tournaments WHERE id = ?';
  let response = await db.all(query, [id]);
  return { tournaments: response };
}

app.get('/tournaments/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let result = await getTournamentById(id);
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: 'Tournaments not found' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint 12
async function getTournamentByGameId(id) {
  let query = 'SELECT * FROM tournaments WHERE gameId = ?';
  let response = await db.all(query, [id]);
  return { tournaments: response };
}

app.get('/tournaments/game/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let result = await getTournamentByGameId(id);
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: 'Tournaments not found' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint 13
async function getTournamentByPrizePool() {
  let query = 'SELECT * FROM tournaments ORDER BY prizepool DESC';
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    let result = await getTournamentByPrizePool();
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: 'Tournaments not found' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
