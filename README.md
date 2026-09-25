# OKOSspanyol weboldal

Élő, 30 perces online üzleti spanyol órák weboldala: BGE szóbeli vizsgafelkészítés és munka Spanyolországban.
SvelteKit + Svelte 5, **Cloudflare Workeren** fut. A teljes tartalom egy **D1 adatbázis egyetlen sorában** van,
és a **`/admin`** vizuális szerkesztőben módosítható.

Az oldal az **OKOSspanyol arculat** (krém alap, terrakotta kiemelés, mustársárga foglalás gomb, Lora + Poppins, boltív)
és az **OKOSspanyol weboldal – szövegek** dokumentum alapján készült, kiegészítve a marketingterv weboldal-részével.

## Szerkesztés: `/admin`

Nyisd meg a weboldal címét `/admin` végződéssel (pl. `https://okosspanyol.<fiókod>.workers.dev/admin`), és lépj be a jelszóval.

- **Bal oldalt** a szakaszok és a beállítások, **jobb oldalt** az élő előnézet (asztali / tablet / mobil nézet).
  Minden gépelés azonnal látszik az előnézetben; a weboldalon a **Mentés** (vagy Ctrl+S) után jelenik meg.
- **Kattints egy szakaszra az előnézetben**, és a szerkesztő azt nyitja meg.
- A szakaszok **húzással vagy nyilakkal átrendezhetők**, a szem ikonnal elrejthetők, lemásolhatók, törölhetők.
  **„+ Szakasz hozzáadása”**: bármelyik szakasztípus újra betehető, és van szabad **Szöveges blokk** is.
- Minden listában (árak, GYIK, lépések, menüpontok, közösségi linkek, aloldalak…) van **„+ Új …”**, másolás, törlés és áthúzás.
  Pl. egy új árcsomag: *Főoldal → Árak → + Új csomag*. A „Kiemelő címke” (pl. *Legnépszerűbb*) kiemeli a csomagot.
- **Minden szöveg és minden link** szerkeszthető: menü, gombok, lábléc, foglalórendszer, üzenet link, PDF-ek, hírlevél űrlap,
  jogi oldalak, hibaoldal, keresőben megjelenő szöveg.
- **Aloldalak** fül: adatkezelés, ÁSZF, impresszum, köszönő oldal, és **új aloldal** is létrehozható (pl. `/rolam-bovebben`).
- **Bemutatkozó videó**: *Főoldal → Bemutatkozó videó → YouTube-videó linkje*. A videó csak kattintásra töltődik be
  (adatvédelmi módban, youtube-nocookie.com), addig nem kerül adat a YouTube-hoz.
- A **⋯ menüben**: biztonsági mentés letöltése / betöltése (JSON), **az előző mentés visszaállítása** (egy lépés visszavonás),
  kilépés.

### Formázás a szövegekben

| Írd így | Így jelenik meg |
| --- | --- |
| `_¡Hola!_` | spanyol szöveg Lora dőlttel (az arculat szerint) |
| `**Most beszéljünk!**` | kiemelés (címekben terrakotta) |
| `[ÁSZF](/aszf)` | link — `#arak` a főoldal egy részére ugrik |
| `{keresztnev}`, `{email}`, `{evek}`, `{platform}`, `{fizetes}`, `{lemondasOrak}`, `{berletErvenyesseg}`, `{ev}` | az *Alapadatok* fülön megadott érték |
| `## Cím`, `- lista`, `> kiemelt doboz` | hosszú szövegekben (aloldalak, szöveges blokk) |

A mezők fölötti kis gombok (*Sp*, *B*, 🔗, `{ }`) ezeket be is szúrják.

## Képek, logók, PDF-ek

A képeket a GitHub-tároló `static/` mappájába kell feltölteni (GitHubon: *Add file → Upload files*).
A feltöltés után az oldal pár perc alatt magától újra kikerül, és a kép megjelenik.

| Fájl | Hová kerül |
| --- | --- |
| `static/logo-hosszu.png` | **vízszintes logó a menüben** (és a láblécben). Amíg nincs meg, betűkből kirakott logó látszik. |
| `static/barion-logo.svg` (vagy .png) | a Barion logósáv a láblécben — lásd lent |
| `static/kepek/…` | saját fotók: az adminban a *Nyitó rész* / *Rólam* „Fotó” mezőjébe írd, pl. `/kepek/rolam.jpg` |
| `static/anyagok/…` | ingyenes PDF-ek: az *Ingyenes anyagok* „PDF” mezőjébe, pl. `/anyagok/puska.pdf` |
| `static/og-kep.png` | a megosztáskor megjelenő kép (1200 × 630) |

Az admin a kép mezők alatt jelzi, hogy a fájl megvan-e már.

### Barion

A Barion előírja, hogy a fizetést fogadó oldal láblécében ott legyen a **hivatalos Barion logó** (a kártyalogókkal), a barion.com-ra mutatva.
A lábléc ezt már tartalmazza; amíg a logó képe nincs meg, egy szöveges „Barion · Visa · Mastercard…” sáv látszik a helyén.

1. Töltsd le a Barion kereskedői felületéről / logóoldaláról a logósávot (pl. „Barion card strip”).
2. Tedd a `static/` mappába `barion-logo.svg` néven (vagy más néven, és írd be az adminban: *Menü, lábléc → Barion fizetés → Barion logósáv képe*).
   A Barion által adott kép webcíme is beírható ide.
3. Az adatkezelési tájékoztató és az ÁSZF sablonja már tartalmazza a Barionnak történő adattovábbításról szóló részt — nézesd át.

## Élesítés: Cloudflare Workers

A `.github/workflows/deploy.yml` minden feltöltés (push) után felépíti és kiteszi az oldalt
(a `main` és a `claude/loving-carson-nlbm20` ágról). Kézzel is indítható: **Actions → Weboldal kitétele → Run workflow**.

### Egyszeri beállítás

1. **Cloudflare-fiók** (ingyenes): <https://dash.cloudflare.com/sign-up>. Nyisd meg a **Workers & Pages** oldalt,
   és **válassz egy `*.workers.dev` aldomaint** (enélkül a Cloudflare nem engedi feltenni a Workert).
2. **API token**: Cloudflare → *My Profile → API Tokens → Create Token* → „**Edit Cloudflare Workers**” sablon,
   és adj hozzá egy sort: *Account → D1 → Edit*. Másold ki a tokent.
3. **Fiókazonosító (Account ID)**: a Cloudflare *Workers & Pages* oldalán jobb oldalt.
4. GitHubon: **Settings → Secrets and variables → Actions → New repository secret**:
   - `CLOUDFLARE_API_TOKEN` – a 2. pont tokenje
   - `CLOUDFLARE_ACCOUNT_ID` – a 3. pont azonosítója
   - `ADMIN_JELSZO` – az admin jelszava (hosszú, egyedi jelszót válassz)
5. **Actions → Weboldal kitétele → Run workflow.** Az első futás magától létrehozza az `okosspanyol` D1 adatbázist,
   és a végén kiírja a weboldal címét (`https://okosspanyol.<fiókod>.workers.dev`).

A jelszót később a Cloudflare-en is átírhatod (*Workers → okosspanyol → Settings → Variables and Secrets → ADMIN_JELSZO*),
vagy a GitHub Secret módosítása után futtasd újra a kitételt. Jelszócserénél minden korábbi belépés érvényét veszti.

### Saját domain később (pl. okosspanyol.hu)

1. Cloudflare → *Workers → okosspanyol → Settings → Domains & Routes → Add → Custom domain* → `okosspanyol.hu`
   (a domain DNS-ét a Cloudflare-nek kell kezelnie).
2. Az adminban: *Kereső → Saját domain*: `https://okosspanyol.hu`.
3. A hírlevélküldőben a sikeres feliratkozás utáni átirányítás: `https://okosspanyol.hu/koszonjuk`.

## Gyorsítótár (miért gyors, és miért olcsó)

- A nyilvános oldal **nem tölt le JavaScript-keretrendszert**: kész HTML érkezik, csak egy 2 KB-os szkript (`static/oldal.js`)
  kezeli a mobil menüt és a videót.
- A tartalom **egyetlen D1-sor** (`oldal` tábla, `id = 1`). Olvasás három szinten:
  1. a Worker memóriája (30 másodpercig),
  2. a Cloudflare adatközpont gyorsítótára (10 percig — **csak saját domainen működik**, `workers.dev`-en a Cloudflare kikapcsolja),
  3. D1 — így a D1-et szinte soha nem kell olvasni.
- A **kész HTML-oldalak** is gyorsítótárban vannak (memória + adatközpont), a tartalom verziójával jelölve;
  a böngésző `ETag` alapján 304-et kap, ha semmi nem változott.
- **Mentéskor** abban az adatközpontban, ahonnan mentettél, azonnal frissül minden; a világ többi részén legkésőbb 10 perc alatt.

## Indítás a saját gépeden

Kell hozzá a [Node.js](https://nodejs.org) (22-es vagy újabb).

```sh
npm install                   # első alkalommal
cp .dev.vars.example .dev.vars # helyi admin jelszó (ADMIN_JELSZO)
npm run db:helyi              # helyi D1 adatbázis létrehozása
npm run dev                   # fejlesztői szerver: http://localhost:5173 (admin: /admin)
npm run preview               # a kész változat a valódi Cloudflare futtatókörnyezetben: http://localhost:8787
```

## Felépítés

```
src/
  app.css                      színek, betűk, gombok — az arculat alapjai
  hooks.server.ts              admin védelem, HTML gyorsítótár, ETag
  lib/tartalom/                a tartalom szerkezete (tipusok.ts), alapszövegei (alap.ts), szövegformázás (szoveg.ts)
  lib/server/tarolo.ts         D1 olvasás/írás a gyorsítótárakkal
  lib/server/azonositas.ts     admin belépés (aláírt süti)
  lib/admin/                   a vizuális szerkesztő (semak.ts: melyik szakasznak milyen mezői vannak)
  lib/components/              fejléc, lábléc, logó, foglalás gomb, boltív, szakaszcím, aloldal
  lib/szakaszok/               a főoldal szakaszai (Nyito, Video, Rolam, Orak, OraMenete, KinekSzol, Arak, Foglalas,
                               Tudnivalok, Szintfelmero, IngyenesAnyagok, Gyik, Hirlevel, ZaroFelhivas, Szoveg)
  routes/                      főoldal, [oldal] (aloldalak), admin, sitemap.xml, robots.txt
migrations/                    D1 séma
scripts/d1-elokeszites.mjs     a kitételkor létrehozza / megkeresi a D1 adatbázist
wrangler.jsonc                 Cloudflare Worker beállítás
static/                        képek, logók, PDF-ek, oldal.js
```

## Arculati szabályok a kódban

- Krém az alap, terrakotta a kiemelés, **a mustársárga csak a foglalásé**.
- A szöveg sötétbarna, soha nem fekete; sötét terrakotta háttéren vastagabb.
- A spanyol mindig Lora dőlt (`_…_` az adminban, `class="es"` a kódban), a magyar Poppins.
- Boltív csak a nyitó rész és a bemutatkozás fotóján, minden más szögletes (4 px sarok).
- Vizsga-kártya: terrakotta, munka-kártya: sötét terrakotta hangsúly.
- A betűk saját tárhelyről töltődnek (nem a Google szervereiről), az oldal nem használ követő sütiket
  (csak az admin belépési sütije létezik, és csak az adminban).
