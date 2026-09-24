# OKOSspanyol weboldal

Élő, 30 perces online üzleti spanyol órák weboldala: BGE szóbeli vizsgafelkészítés és munka Spanyolországban.
SvelteKit + Svelte 5, statikus oldalként épül, és GitHub Actions teszi ki a GitHub Pagesre:
**https://okosspanyol.github.io/weboldal/**

Az oldal az **OKOSspanyol arculat** (krém alap, terrakotta kiemelés, mustársárga foglalás gomb, Lora + Poppins, boltív)
és az **OKOSspanyol weboldal – szövegek** dokumentum alapján készült, kiegészítve a marketingterv weboldal-részével
(szintfelmérés hangüzenetben, ingyenes anyagok, „Hamarosan” feliratkozás).

## Indítás a saját gépeden

Kell hozzá a [Node.js](https://nodejs.org) (22-es vagy újabb).

```sh
npm install      # első alkalommal
npm run dev      # fejlesztői szerver: http://localhost:5173
```

## Mit kell kitöltened?

Minden személyes adat egyetlen fájlban van: **`src/lib/config.ts`**. A `[szögletes zárójeles]` értékeket írd át.

| Mit | Hol a `config.ts`-ben |
| --- | --- |
| Neved, tanítási évek, végzettség, spanyolországi háttér | `teacher` |
| Saját fotók (nyitó rész és bemutatkozás) | `teacher.photos` — a képet tedd a `static/kepek/` mappába, pl. `'/kepek/rolam.jpg'` |
| E-mail cím, Instagram, TikTok, YouTube, Facebook | `contact` |
| Foglalórendszer linkje (Calendly, SimplyBook stb.) | `booking.url` és ha van, `booking.embedUrl` |
| Online óra helye, fizetés, lemondás, bérlet érvényessége | `booking` |
| Árak, indulási ajánlat | `pricing` |
| Ingyenes PDF-ek | `freeMaterials` — a PDF-et tedd a `static/anyagok/` mappába |
| Hírlevél | `newsletter.action` |
| Impresszum adatai | `company` |

Ami még nincs meg, maradhat üresen (`''`) — az oldal akkor is rendesen működik:

- **Nincs foglalórendszer:** az „Időpontot foglalok” gombok a foglalási részhez görgetnek, ott pedig az e-mail címed jelenik meg.
- **Nincs Instagram-felhasználónév:** a szintfelmérés gombja e-mailt nyit meg Instagram-üzenet helyett.
- **Nincs még kész PDF:** az ingyenes anyagoknál a kulcsszavas kérés (`ORAL`, `ENTREVISTA`) látszik letöltés helyett.
- **Nincs hírlevélküldő:** a feliratkozás helyett a készülő anyagok listája és egy e-mail gomb látszik.
- **Nincs fotó:** díszített boltív áll a helyén (`¿Hablamos?`, `¡Hola!`).

### Foglalórendszer bekötése

1. `booking.url`: a nyilvános foglalási oldalad linkje (pl. `https://calendly.com/neved/30perc`).
2. `booking.embedUrl` (nem kötelező): ha a rendszer ad beágyazható linket, a naptár közvetlenül a weboldalon jelenik meg.
   Ilyenkor a fejléc gombjai a beágyazott naptárhoz görgetnek.

### Hírlevél bekötése (MailerLite, Brevo, Mailchimp stb.)

1. A hírlevélküldőben hozz létre egy beágyazható űrlapot, és másold ki az űrlap `action` címét a `newsletter.action`-be.
2. A `src/lib/szakaszok/Hirlevel.svelte` fájlban igazítsd a mezők `name="…"` értékét ahhoz, amit a szolgáltató vár
   (pl. MailerLite-nál `fields[name]`, `fields[email]`; Mailchimpnél `FNAME`, `EMAIL`).
3. Sikeres feliratkozás utáni átirányításnak add meg: `https://okosspanyol.github.io/weboldal/koszonjuk`
   (saját domainnél `https://okosspanyol.hu/koszonjuk`).

### Vízszintes logó

A fejlécben most betűkből kirakott logó áll (`OKOS` + dőlt `spanyol`). Ha megvan a vízszintes logó képfájlként,
tedd a `static/` mappába, és a `src/lib/components/Logo.svelte` tartalmát cseréld egy `<img>`-re (a fájlban leírtam, hogyan).
A kör logó (`static/logo-kor.png`) a böngészőfül ikonja és a lábléc eleme.

### Jogi oldalak

Az **Adatkezelési tájékoztató**, az **ÁSZF** és az **Impresszum** sablon (`src/routes/adatkezeles`, `aszf`, `impresszum`).
Töltsd ki a zárójeles részeket, és közzététel előtt nézesd át szakemberrel vagy a könyvelőddel.

## Élesítés: GitHub Pages

Az oldal címe: **https://okosspanyol.github.io/weboldal/**

A `.github/workflows/deploy.yml` minden feltöltés (push) után magától felépíti és kiteszi az oldalt.
Ez a `main` és a `claude/loving-carson-nlbm20` ágra érvényes. Kézzel is indítható:
**Actions** fül → **Weboldal kitétele (GitHub Pages)** → **Run workflow**.

**Egyszeri beállítás** (ezt csak te tudod megtenni a GitHubon):
**Settings → Pages → Build and deployment → Source: „GitHub Actions”**.
Utána az Actions fülön indítsd újra a legutóbbi futást (vagy tölts fel bármilyen módosítást).

Helyben így nézheted meg a kész változatot:

```sh
npm run build    # a kész oldal a build/ mappába kerül
npm run preview  # http://localhost:4173/weboldal/
```

### Saját domain később (pl. okosspanyol.hu)

1. A `src/lib/config.ts`-ben írd át: `url: 'https://okosspanyol.hu'` — ebből magától eltűnik a `/weboldal` alútvonal.
2. Hozz létre egy `static/CNAME` fájlt, benne egyetlen sor: `okosspanyol.hu`.
3. GitHubon: **Settings → Pages → Custom domain**: `okosspanyol.hu`, és pipáld be az **Enforce HTTPS**-t.
4. A domain szolgáltatódnál állítsd be a DNS-t a GitHub leírása szerint (A rekordok a GitHub Pages IP-címeire,
   vagy `www` esetén CNAME az `okosspanyol.github.io`-ra).

## Felépítés

```
src/
  app.css                 színek, betűk, gombok — az arculat alapjai
  lib/config.ts           minden személyes adat és beállítás
  lib/components/         fejléc, lábléc, logó, foglalás gomb, boltív, szakaszcím
  lib/szakaszok/          a főoldal részei (Nyito, Rolam, Orak, OraMenete, KinekSzol, Arak,
                          Foglalas, Tudnivalok, Szintfelmero, IngyenesAnyagok, Gyik, Hirlevel, ZaroFelhivas)
  routes/+page.svelte     a főoldal — itt változtatható a szakaszok sorrendje
  routes/adatkezeles, aszf, impresszum, koszonjuk
static/
  logo-kor.png            kör logó (böngészőfül ikon)
  og-kep.png              megosztáskor megjelenő kép (Facebook, Messenger)
.github/workflows/
  deploy.yml              felépítés és kitétel a GitHub Pagesre
  kepek/                  ide jönnek a saját fotók
```

## Arculati szabályok a kódban

- Krém az alap, terrakotta a kiemelés, **a mustársárga csak a foglalásé**.
- A szöveg sötétbarna, soha nem fekete; sötét terrakotta háttéren vastagabb.
- A spanyol mindig Lora dőlt (`class="es"`), a magyar Poppins.
- Boltív csak a nyitó rész és a bemutatkozás fotóján, minden más szögletes (4 px sarok).
- Vizsga-kártya: terrakotta, munka-kártya: sötét terrakotta hangsúly.
- A kis betűs linkek sötét terrakották, mert a világos terrakotta a krém alapon kis méretben nehezen olvasható.
- A betűk saját tárhelyről töltődnek (nem a Google szervereiről), az oldal nem használ sütiket.
