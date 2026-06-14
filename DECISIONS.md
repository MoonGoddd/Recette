# Recette du Monde — Document de Decisions

## Projet

Site statique de recettes de cuisine du monde entier. Objectif : vitrine portfolio GitHub pour montrer des competences en developpement web frontend. Pas de deploiement public prevu pour l'instant.

**Repository GitHub :** github.com/MoonGoddd/Recette
**Stack :** HTML + CSS (Tailwind v4) + JavaScript vanilla — aucun framework, aucun generateur de site statique.

---

## Architecture

### Structure des fichiers

```
Recette/
├── public/                     # Dossier servi (contenu statique)
│   ├── index.html              # Homepage — hero + carrousel + grille
│   ├── category.html           # Page categorie filtree
│   ├── recipe.html             # Page detail recette
│   ├── css/
│   │   └── style.css           # Tailwind build output minifie
│   ├── js/
│   │   ├── app.js              # Logique homepage (carrousel, filtres, grille)
│   │   ├── search.js           # Moteur de recherche client-side
│   │   ├── timer.js            # Minuteur de cuisson multi-instances
│   │   ├── i18n.js             # Systeme de traduction FR/EN
│   │   ├── recipe-detail.js    # Logique page detail
│   │   └── category.js         # Logique page categorie
│   ├── data/
│   │   ├── recipes.json        # 18 recettes bilingues
│   │   └── translations.json   # Cles de traduction interface
│   └── assets/
│       └── images/             # Photos stock
├── css/
│   └── input.css               # Source Tailwind (@theme + @source + print)
├── plus/
│   ├── DESIGN.md               # Reference design system Airbnb (initial)
│   └── DESIGN2.md              # Reference design system Nike (actuel)
├── DECISIONS.md                # Ce fichier
├── rapport_recette.md          # Rapport progressif de construction
├── package.json                # Scripts npm (build, dev, serve)
└── package-lock.json
```

### Pages

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `index.html` | Hero full-bleed + carrousel "du moment" + filtres pills + grille immersive + categories dark |
| Categorie | `category.html?type=plat` ou `?origin=japon` | Header dark + grille filtree |
| Recette | `recipe.html?id=ramen-tonkotsu` | Hero photo 60vh + bande meta noire + contenu 2 colonnes + timer |

### Navigation

Navigation classique entre fichiers HTML (pas de SPA). Query params pour charger le contenu dynamiquement depuis `recipes.json`.

### Commandes

```bash
npm run dev      # Watch CSS + serveur local (port 3000)
npm run build    # Compile CSS uniquement
npm run serve    # Serveur seul
```

---

## Design System (Nike-inspired)

### Philosophie

Photography-first. Contraste typographique extreme : titres UPPERCASE geants (Bebas Neue) + body discret (Inter). Sections alternees noir/blanc. Pas de decorations — les photos font le travail. Cartes sans bordures, zero shadow, overlay gradient. Energie brute, scroll immersif.

### Palette de couleurs

| Token | Hex | Usage |
|-------|-----|-------|
| ink | `#111111` | CTA principaux, texte, fond sections dark |
| charcoal | `#39393b` | Hover/press sur CTA, texte secondaire |
| mute | `#707072` | Sous-titres, meta, labels inactifs |
| stone | `#9e9ea0` | Texte faible contraste, legal |
| hairline | `#cacacb` | Bordures filtres inactifs |
| hairline-soft | `#e5e5e5` | Separateurs legers |
| cloud | `#f5f5f5` | Fond search pill, fond filtres origines |
| canvas | `#ffffff` | Fond page sections claires |
| primary | `#ff385c` | Accent unique (badge difficulte, hover) |
| primary-active | `#e00b41` | Press sur accent |
| on-primary | `#ffffff` | Texte sur fond ink ou primary |
| on-dark | `#ffffff` | Texte sur sections dark |

### Typographie

**Display :** Bebas Neue (Google Fonts, gratuit)
- Usage : titres hero, noms sections, titres cartes
- Toujours UPPERCASE
- Tailles : clamp(3rem, 10vw, 7rem) hero, 3xl-5xl sections, xl-2xl cartes

**Body :** Inter (Google Fonts, gratuit)
- Usage : tout le reste (nav, meta, descriptions, boutons, ingredients)
- Poids : 400 (body), 500 (medium), 600 (semibold), 700 (bold)
- Tailles : 14px-16px

### Arrondis

| Token | Valeur | Usage |
|-------|--------|-------|
| none | 0px | Cartes photos (edge-to-edge) |
| sm | 8px | Search pill, inputs |
| lg | 30px | Tous les CTA pills |
| full | 9999px | Boutons ronds, toggle langue |

### Elevation

**Zero shadow.** Pas de drop-shadow nulle part. Profondeur = overlay gradient sur photo + contraste noir/blanc entre sections. Seul "effet" : `backdrop-blur-md` sur la nav sticky.

### Espacement

Base 8px. Sections : 64-80px (py-16/py-20). Gutters grille : 1px (gap-1 = photos quasi bord a bord). Padding contenu : 24px mobile, 48px desktop (px-6/px-12).

---

## Composants UI

### Navigation (fixe, glassmorphism)

- Logo Bebas Neue uppercase a gauche
- Search pill (bg cloud, rounded-lg) centree
- Toggle langue (pill noir, uppercase) a droite
- `bg-canvas/90 backdrop-blur-md` + hairline-soft bottom
- Hauteur : 64px

### Hero (full-bleed)

- Photo Unsplash couvrant 85vh
- Gradient overlay (`hero-gradient` : transparent → noir 70%)
- Titre Bebas Neue clamp(3rem→7rem) uppercase blanc
- Sous-titre Inter 18px blanc/80
- CTA pill blanc "Decouvrir" (rounded-full)

### Carrousel "Recettes du moment" (section dark)

- Fond noir (#111)
- Titre Bebas Neue 4xl-5xl uppercase blanc
- Boutons prev/next ronds (bg white/10)
- Cards 280-300px width, aspect 4:5
- Photo full + overlay gradient + titre Bebas + meta en bas
- Scroll horizontal snap, scrollbar cachee

### Carte recette (grille)

- Aspect-square, photo full-bleed, zero padding
- Overlay gradient du bas (noir 70% → transparent)
- Titre Bebas Neue xl-2xl uppercase blanc en bas
- Meta : origine + temps + difficulte (text-sm, blanc/70)
- Hover : scale 1.05 photo + opacity overlay 80→100%
- Gap 1px entre cartes (effet mosaique)

### Filtres

- **Type (categorie)** : pills rounded-full, noir actif / outline inactif
- **Origine** : pills rounded-full, bg-cloud inactif / bg-ink actif
- Transition complete au clic (inversion noir/blanc)

### Page detail recette

- Hero 60vh (photo + gradient + titre Bebas + description)
- Bande meta noire (badges pills bg-white/10 + 1 badge primary pour difficulte)
- Contenu : 2 colonnes (ingredients a gauche, etapes a droite)
- Ingredients : liste avec separateurs hairline-soft
- Etapes : numerotees (cercle noir + numero blanc) + boutons timer (pill noir)
- Timer widget : fixed bottom-right, fond ink, texte blanc

### Section categories (dark)

- 4 tiles portrait (aspect 4:5), gap-1
- Photo + overlay noir 30% + titre Bebas en bas-gauche
- Hover : scale 105% photo + overlay 40%

### Footer

- Fond blanc, hairline-soft top
- 3 colonnes, titres uppercase tracking-wider
- Legal en xs text-stone

---

## Fonctionnalites

### 1. Recherche client-side

- Input dans nav (pill bg-cloud, focus → ring-2 ring-ink)
- Recherche instantanee sur : titre, description, ingredients, tags, origine, type
- Synchro entre input desktop et mobile
- Filtrage JS en memoire sur le tableau JSON

### 2. Timer integre

- Bouton pill noir a cote de chaque etape avec `time` defini
- Widget flottant fixed bottom-right (fond ink, texte blanc)
- Multi-timers en parallele
- Countdown + notification sonore (Web Audio API, 800Hz, 300ms)
- Feedback visuel (ring-2 ring-primary pendant 2s)
- Close button pour masquer

### 3. Mode impression

- CSS @media print
- Cache : nav, filtres, timer, footer, carrousel, categories
- Garde : photo hero (max-height 200px), titre, description, ingredients, etapes
- Layout single-column optimise A4

### 4. Bilingue FR/EN

- Toggle pill noir dans nav
- localStorage pour persistence
- Evenement custom `langchange` pour re-render dynamique
- Toutes les cles dans translations.json (50+ cles)
- Recettes : champs _fr/_en dans le JSON

---

## Format des donnees

### Structure JSON d'une recette

```json
{
  "id": "ramen-tonkotsu",
  "title_fr": "Ramen Tonkotsu",
  "title_en": "Tonkotsu Ramen",
  "description_fr": "Un bouillon de porc riche et cremeux...",
  "description_en": "A rich and creamy pork bone broth...",
  "image": "assets/images/ramen-tonkotsu.jpg",
  "type": "plat",
  "origin": "japon",
  "prep_time": 30,
  "cook_time": 480,
  "servings": 4,
  "difficulty": "difficile",
  "tags": ["porc", "nouilles", "bouillon", "asiatique", "umami"],
  "ingredients_fr": [
    { "item": "Os de porc", "quantity": "1 kg" },
    ...
  ],
  "ingredients_en": [
    { "item": "Pork bones", "quantity": "1 kg" },
    ...
  ],
  "steps_fr": [
    { "text": "Blanchir les os 10 minutes.", "time": 10 },
    { "text": "Mijoter le bouillon 8 heures.", "time": 480 },
    ...
  ],
  "steps_en": [
    { "text": "Blanch the bones for 10 minutes.", "time": 10 },
    ...
  ]
}
```

### Categories

**Par type de plat :** entree, plat, dessert, boisson, snack

**Par origine :** france, italie, japon, mexique, inde, maroc, thailande, usa, grece, coree, cuba, vietnam, turquie, angleterre (extensible)

---

## Recettes de demo (18)

| # | Nom | Origine | Type | Difficulte |
|---|-----|---------|------|------------|
| 1 | Ramen Tonkotsu | Japon | plat | difficile |
| 2 | Tiramisu | Italie | dessert | moyen |
| 3 | Tacos al Pastor | Mexique | plat | moyen |
| 4 | Croissants | France | snack | difficile |
| 5 | Pad Thai | Thailande | plat | moyen |
| 6 | Tzatziki | Grece | entree | facile |
| 7 | Butter Chicken | Inde | plat | moyen |
| 8 | Creme Brulee | France | dessert | moyen |
| 9 | Poke Bowl | USA-Hawaii | plat | facile |
| 10 | Mojito | Cuba | boisson | facile |
| 11 | Bruschetta | Italie | entree | facile |
| 12 | Bibimbap | Coree | plat | moyen |
| 13 | Tajine d'agneau | Maroc | plat | moyen |
| 14 | Mochi | Japon | dessert | moyen |
| 15 | Guacamole | Mexique | entree | facile |
| 16 | Pho Bo | Vietnam | plat | moyen |
| 17 | Baklava | Turquie | dessert | moyen |
| 18 | Fish and Chips | Angleterre | plat | moyen |

---

## Responsive

| Breakpoint | Grille | Hero | Carrousel | Nav |
|------------|--------|------|-----------|-----|
| Mobile < 640px | 1 col | 85vh, titre 3rem | 1 card visible | Search collapse |
| Tablet 640-1024px | 2 col | 85vh, titre 5rem | 2-3 cards | Pill reduite |
| Desktop > 1024px | 3 col | 85vh, titre 7rem | 4+ cards | Pill complete |

---

## Historique des decisions de design

### V1 — Airbnb-inspired (abandonne)
- Fond blanc pur, corail #ff385c accent, rounded cards, elevation shadow
- **Probleme :** trop vide, pas assez dynamique pour un site culinaire
- **Source :** `plus/DESIGN.md`

### V2 — Nike-inspired (actuel)
- Photography full-bleed, typo massive Bebas Neue, sections noir/blanc alternees
- Carrousel horizontal, grille mosaique, overlay gradients
- **Raison :** plus immersif, plus moderne, photos de cuisine ressortent mieux sur noir
- **Source :** `plus/DESIGN2.md`

---

## Contraintes techniques

- Zero dependance runtime (pas de React, pas de Vue, pas de jQuery)
- Tailwind v4 en build-time (CSS compile via @tailwindcss/cli)
- `concurrently` + `serve` pour dev local (`npm run dev`)
- Images : Unsplash URLs en direct pour demo, fallback SVG/Unsplash generique en onerror
- Poids cible page < 500kb first load (hors images externes)
- Accessible : contraste AA sur texte blanc/overlay, navigation clavier, ARIA labels
