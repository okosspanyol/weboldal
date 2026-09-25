-- A teljes weboldal egyetlen sorban, JSON-ként (id = 1). Az „elozo” az utolsó előtti mentés (visszavonáshoz).
CREATE TABLE IF NOT EXISTS oldal (
	id INTEGER PRIMARY KEY CHECK (id = 1),
	adat TEXT NOT NULL,
	elozo TEXT,
	verzio INTEGER NOT NULL,
	frissitve TEXT NOT NULL
);
