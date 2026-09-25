// A GitHub Action futtatja a kitétel előtt: megkeresi (vagy ha még nincs, létrehozza) az „okosspanyol”
// D1 adatbázist a Cloudflare-fiókodban, és beírja az azonosítóját a wrangler.jsonc-be.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const NEV = 'okosspanyol';
const wrangler = (...args) =>
	execFileSync('npx', ['wrangler', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
const keres = () => {
	const kimenet = wrangler('d1', 'list', '--json');
	return JSON.parse(kimenet.slice(kimenet.indexOf('['))).find((d) => d.name === NEV);
};

let db = keres();
if (!db) {
	console.log(`Még nincs „${NEV}” D1 adatbázis — létrehozom (Kelet-Európa).`);
	wrangler('d1', 'create', NEV, '--location', 'eeur', '--update-config=false');
	db = keres();
}
if (!db?.uuid) throw new Error('Nem sikerült megtalálni vagy létrehozni a D1 adatbázist.');

const utvonal = 'wrangler.jsonc';
const regi = readFileSync(utvonal, 'utf8');
const uj = regi.replace(/"database_id":\s*"[^"]*"/, `"database_id": "${db.uuid}"`);
if (uj === regi && !regi.includes(db.uuid)) throw new Error('Nem találtam a database_id sort a wrangler.jsonc-ben.');
writeFileSync(utvonal, uj);
console.log(`D1 adatbázis: ${NEV} (${db.uuid})`);
