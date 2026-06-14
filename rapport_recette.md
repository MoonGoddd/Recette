# Rapport de Construction — Recette du Monde

## Fichiers & Sources fournis par l'utilisateur

| Fichier | Chemin | Description |
|---------|--------|-------------|
| DESIGN.md | `/home/leo/LN_Code/Recette/plus/DESIGN.md` | Design system Airbnb (V1, abandonne) |
| DESIGN2.md | `/home/leo/LN_Code/Recette/plus/DESIGN2.md` | Design system Nike (V2, actuel) |

---

## Prompts utilisateur (chronologique)

### Prompt 1 — Lancement
> verifie que tu as tous les mcp et skills que je t'ai fais dl l'autre fois, si tu les as tous on va brainstormer ensemble pour créer un site de recette en static, il faudra qu'on décide du langage du style ect durant ce brainstorming et ensuite que tu créer un .md entier avec toutes les décisions que l'on a prit et tu créera le site d'apres celui-ci

### Prompt 2 — Localisation du design
> ok alors le style.md se trouve dans le dossier plus du site sous le nom design.md, ensuite il faut aussi que tu n'hésite pas a me poser des questions en parallele a tes reponses et hésite pas a me dire si il te manque des choses ou si il te faut des précisions

### Prompt 3 — Chemin précis
> /home/leo/LN_Code/Recette/plus

### Prompt 4 — Lancement construction + rapport
> oui tu peux commencer cependant avant ça il faut que je rajoute quelque chose, je veux que tu fasses un rapport progressif des skills que tu as utiliser durant le projet ainsi que des fichiers et source que je te fournis, le fichier design en l'occurence, je veux également que tu mettes les prompts que je te donne, je veux que tu fasses un vrai récap non pas du projet mais de sa construction donc les skills les mcp ect, tous ça tu le met dans un fichier que tu va créer appeler rapport_recette.md une fois que tu as retranscrit tous jusqu'a présent tu commence la construction du projet et tu oublie pas de le mettre a jour au fur et a mesure

### Prompt 5 — Test + structure + question serveur
> je vais tester le site donc lance le mais je veux aussi que tu mette les pages html dans un dossier approprié, aussi pourquoi lancer le serv avec une commande python un npm run build ou run dev ne fonctionnerait pas ?

### Prompt 6 — Redesign (insatisfaction style V1)
> alors pour etre tous a fait honnete pour ce qui est du style je suis un peu déçu, je le trouve bien trop vide il faudrait peut etre une partie avec des cartes défilantes présentant les recettes du moment, et aussi pour ce qui est du fond full blanc il faudrait mettre autre chose, reprend la liste que je t'ai donner tout a l'heure et regarde ce qui pourrait etre sympa pour rendre ce site plus beau et plus moderne et dynamique

### Prompt 7 — Validation redesign Nike
> je prefere nike et je t'ai mis le fichier design2.md qui correspond au style du site

### Prompt 8 — Validation + suite
> ok c'est vraiment cool on peut maintenant passer a la description des recettes ainsi qu'a la poursuite du decision.md

---

## Décisions prises (via brainstorming interactif)

| Question | Réponse utilisateur | Décision finale |
|----------|-------------------|-----------------|
| Framework | "from scratch sans générateur" | HTML/CSS/JS pur |
| Style visuel | Choix délégué → recommandation Airbnb | Airbnb-inspired (photography-led, warm coral, rounded) |
| CSS | Tailwind CSS | Tailwind CSS |
| Features | "2 et 4 [...] les trois en même temps" | Recherche + Timer + Mode impression |
| Stockage recettes | "le moins lourd et le plus modifiable" | JSON |
| Structure pages | Accueil + catégories + recettes | 3 niveaux de pages |
| Langue | Bilingue FR/EN | i18n avec toggle + localStorage |
| Hébergement | "projet GitHub pour montrer mon intérêt pour l'informatique" | Repo GitHub (MoonGoddd), local only |
| Catégories | Les deux combinés | Double tag : type + origine |
| Images | Placeholder/stock | Unsplash/Pexels |
| GitHub username | MoonGoddd | — |
| Quantité recettes | 15-20 | 18 recettes demo |

---

## Skills utilisés

| Skill | Quand | Pourquoi |
|-------|-------|----------|
| caveman (mode full) | Session entière | Communication compressée, économie de tokens |

---

## MCP Servers utilisés

| MCP | Quand | Pourquoi |
|-----|-------|----------|
| *(aucun utilisé jusqu'ici)* | — | — |

---

## Outils Claude Code utilisés

| Outil | Quand | Action |
|-------|-------|--------|
| Bash | Phase 1 | Vérification config, settings.json, plugins installés, recherche design.md |
| Read | Phase 1 | Lecture complète du DESIGN.md Airbnb |
| AskUserQuestion | Phase 1 | 3 rounds de questions pour décisions (framework, style, features, stockage, pages, langue, hosting, catégories, images, GitHub, quantité) |
| Write | Phase 1 | Création DECISIONS.md + rapport_recette.md |

---

## Phases de construction

### Phase 1 — Brainstorming & Décisions ✅
- Vérification environment (MCP, skills, plugins)
- Lecture source design (DESIGN.md Airbnb)
- Brainstorming interactif (3 rounds questions)
- Rédaction DECISIONS.md
- Création rapport_recette.md (ce fichier)

### Phase 2 — Setup projet ✅
- [x] Init npm + Tailwind v4 CLI (`@tailwindcss/cli ^4.1.0`)
- [x] Structure fichiers/dossiers (css/, js/, data/, assets/images/)
- [x] Tailwind config via `@theme` dans `css/input.css` (Tailwind v4 — pas de fichier config JS séparé)
- [x] package.json avec scripts build/watch
- [x] Build CSS réussi (172ms, output minifié)

### Phase 3 — UI & Composants ✅
- [x] Header (nav sticky + recherche pill + toggle langue FR/EN)
- [x] Cartes recettes (grille responsive 1/2/3/4 colonnes)
- [x] Footer 3 colonnes
- [x] Page detail recette (hero image, meta badges, ingrédients, étapes avec timer)
- [x] Page catégorie (filtre par type ou origine)
- [x] Category strip (pills type + pills origine)

### Phase 4 — Données ✅
- [x] recipes.json (18 recettes bilingues FR/EN complètes)
- [x] translations.json (interface FR/EN, 50+ clés)
- [ ] Images stock sourcées (placeholders SVG en fallback pour l'instant)

### Phase 5 — Features JS ✅
- [x] search.js — recherche instantanée sur titre, ingrédients, tags, origine
- [x] timer.js — minuteur multi-instances, notification sonore, widget flottant
- [x] i18n.js — toggle FR/EN, localStorage, événement langchange
- [x] Mode impression — CSS @media print dans input.css, bouton imprimer

### Phase 6 — Polish & Responsive
- [x] CSS print (intégré dans input.css)
- [x] Responsive grid (breakpoints sm/lg/xl)
- [ ] Test navigateur complet
- [ ] Accessibilité (ARIA labels, contraste, navigation clavier)
- [ ] Optimisation perf

### Phase 7 — Git & Déploiement ✅
- [x] Repo créé et push sur https://github.com/MoonGoddd/Recette

---

## Outils Claude Code utilisés (mise à jour)

| Outil | Phase | Action |
|-------|-------|--------|
| Bash | 1 | Vérification config, settings.json, plugins installés, recherche design.md |
| Read | 1 | Lecture complète du DESIGN.md Airbnb (546 lignes) |
| AskUserQuestion | 1 | 3 rounds de questions pour décisions |
| Write | 1-5 | Création de 14 fichiers (html, js, json, css, md) |
| Bash | 2 | `npm install`, `npx @tailwindcss/cli` build, vérification serveur |

---

## Notes techniques en cours de route

- Tailwind v4 n'utilise plus `tailwind.config.js` — config via `@theme {}` dans le CSS source
- Fallback SVG inline pour images manquantes (emoji 🍽️ sur fond gris)
- Timer utilise Web Audio API pour notification sonore (pas de fichier audio externe)
- Recherche filtre sur 6 champs : title, description, tags, origin, type, ingredients

---

## Fichiers créés

| Fichier | Lignes | Rôle |
|---------|--------|------|
| index.html | ~130 | Homepage avec hero, filtres, grille |
| recipe.html | ~80 | Page détail recette |
| category.html | ~60 | Page catégorie filtrée |
| css/input.css | ~50 | Source Tailwind + @theme + print |
| css/style.css | (compilé) | Output Tailwind minifié |
| js/app.js | ~90 | Logique homepage (filtres, render) |
| js/recipe-detail.js | ~80 | Logique page détail |
| js/category.js | ~60 | Logique page catégorie |
| js/i18n.js | ~45 | Système traduction |
| js/search.js | ~40 | Moteur recherche client |
| js/timer.js | ~80 | Minuteur multi-instances |
| data/recipes.json | ~900 | 18 recettes bilingues |
| data/translations.json | ~100 | Traductions interface |
| package.json | ~15 | Config npm |
| DECISIONS.md | ~250 | Document de décisions |
| rapport_recette.md | — | Ce fichier |

---

### Phase 2b — Redesign Nike ✅
- Pivot design Airbnb → Nike suite feedback utilisateur ("trop vide")
- Lecture DESIGN2.md (Nike design system, 576 lignes)
- Refonte complète : input.css, index.html, recipe.html, category.html, app.js, recipe-detail.js, category.js, timer.js
- Ajout : carrousel horizontal, hero full-bleed, sections dark, grille mosaïque, typo Bebas Neue
- Réorganisation fichiers dans `public/`
- Ajout `serve` + `concurrently` au package.json
- Mise à jour translations.json (clés hero_cta, section_trending, section_categories)
- Mise à jour DECISIONS.md (refonte complète reflétant V2 Nike)

---

## Décision de pivot design

| Critère | V1 (Airbnb) | V2 (Nike) |
|---------|-------------|-----------|
| Fond | Blanc pur | Noir/blanc alternant |
| Typo display | Inter 28px | Bebas Neue clamp(3-7rem) UPPERCASE |
| Cartes | Rounded-md, shadow hover | Aspect-square, zero radius, overlay gradient |
| Hero | Petit titre + recherche | Full-bleed 85vh + titre géant |
| Dynamisme | Grille statique | Carrousel + mosaïque + sections immersives |
| Impression food | Sobre, fonctionnel | Immersif, photos qui dominent |

**Raison du pivot :** les photos de cuisine ressortent bien mieux sur fond noir, et le carrousel + hero full-bleed donnent du dynamisme absent dans V1.

---

### Phase 3 — Page recette intelligente ✅
- Ajout champ `"parallel": true` dans les steps JSON pour marquer les étapes faisables en parallèle
- Refonte recipe-detail.js avec `groupSteps()` : regroupe les steps parallèles consécutifs
- Rendu visuel : bordure primary à gauche, badge "En parallèle", cards côte à côte en grid
- Étapes séquentielles : numérotées classiquement avec cercle noir
- Timer intégré aux deux types d'étapes
- Ingrédients : layout justify-between (item à gauche, quantité à droite)
- Ajout "Temps total" dans les meta badges

### Phase 3b — Images ✅
- Remplacement de toutes les 18 images `assets/images/*.jpg` par des URLs Unsplash directes
- Fallback `onerror` vers image générique Unsplash si chargement échoue

---

## Prompt de reproduction (pour recréer le site à l'identique)

Le prompt suivant, accompagné des fichiers `DESIGN2.md` et `DECISIONS.md`, permet à une autre instance de Claude de reconstruire ce site de A à Z :

---

### PROMPT DE REPRODUCTION

```
Tu vas créer un site statique de recettes de cuisine du monde. Voici les fichiers de référence :
- DESIGN2.md : le design system Nike-inspired à suivre (typo, couleurs, composants, responsive)
- DECISIONS.md : toutes les décisions techniques et architecturales du projet

STACK : HTML + Tailwind CSS v4 (@tailwindcss/cli) + JavaScript vanilla. Zero framework.

STRUCTURE :
Recette/
├── public/                     # Dossier servi
│   ├── index.html              # Homepage
│   ├── recipe.html             # Détail recette
│   ├── category.html           # Page catégorie
│   ├── serve.json              # Config serve (cleanUrls:false, rewrite / → /index.html)
│   ├── css/style.css           # Output Tailwind compilé minifié
│   ├── js/
│   │   ├── app.js              # Carrousel, filtres, grille homepage
│   │   ├── recipe-detail.js    # Calculateur portions, accordéon, étapes parallèles, timer
│   │   ├── category.js         # Filtre par query param
│   │   ├── search.js           # Recherche instantanée multi-champs
│   │   ├── timer.js            # Multi-timers, Web Audio notification
│   │   └── i18n.js             # Bilingue FR/EN, localStorage, événement langchange
│   └── data/
│       ├── recipes.json        # 18 recettes bilingues complètes
│       └── translations.json   # ~60 clés FR/EN
├── css/input.css               # Source Tailwind : @import, @source, @theme, @media print
├── plus/
│   └── DESIGN2.md              # Design system Nike de référence
├── package.json                # Scripts: build, dev (watch+serve), serve
├── DECISIONS.md
└── rapport_recette.md

SCRIPTS NPM :
- "build": compile css/input.css → public/css/style.css (minifié)
- "dev": concurrently watch CSS + serve public sur port 3000
- "serve": npx serve public -l 3000
- serve.json dans public/ avec {"cleanUrls": false, "rewrites": [{"source":"/","destination":"/index.html"}]}

DESIGN (Nike-inspired) :
- Fonts Google : Bebas Neue (display, TOUJOURS uppercase, titres géants) + Inter (body, UI, tout le reste)
- Palette : ink #111111, canvas #ffffff, cloud #f5f5f5, primary #ff385c, primary-active #e00b41, charcoal #39393b, mute #707072, stone #9e9ea0, hairline #cacacb, hairline-soft #e5e5e5, on-primary #fff, on-dark #fff
- Hero full-bleed 85vh + gradient overlay (transparent → noir 70%) + titre clamp(3rem,10vw,7rem)
- Sections alternées : section-dark (bg ink, text on-dark) / section light (bg canvas)
- Carrousel horizontal "Recettes du moment" sur section dark, scroll-snap-type: x mandatory, cards 280-300px width aspect 4:5
- Grille recettes : aspect-square, gap-1 (mosaïque), overlay gradient from-black/70, titre Bebas en bas
- Section catégories : 4 tiles portrait aspect-[4/5] gap-1 sur fond noir, hover scale 105%
- Filtres : pills rounded-full, bg-ink quand actif (texte on-primary), border-hairline quand inactif
- Nav fixe : bg-canvas/90 backdrop-blur-md, border-b border-hairline-soft, h-16
- Zero shadow partout. Profondeur = overlays gradient + contraste sections noir/blanc
- Timer widget : fixed bottom-6 right-6, bg-ink, border-charcoal, text on-dark

PAGES :

1. index.html :
   - Nav fixe (logo Bebas uppercase + search pill bg-cloud + toggle langue pill noir)
   - Hero 85vh (img Unsplash + hero-gradient + titre + sous-titre + CTA pill blanc)
   - Section dark "Recettes du moment" (carrousel horizontal + boutons prev/next ronds)
   - Section filtres (pills type : Tout/Entrées/Plats/Desserts/Boissons/Snacks + pills origine avec drapeaux emoji)
   - Grille recettes (cards aspect-square, overlay, titre Bebas)
   - Section dark "Par catégorie" (4 tiles portrait avec photos)
   - Footer 3 colonnes + legal

2. recipe.html :
   - Nav fixe (logo + bouton imprimer + toggle langue)
   - Hero 60vh (photo + gradient + titre Bebas géant + description)
   - Bande meta noire (badges pills : prep, cuisson, temps total, personnes, difficulté en bg-primary)
   - Contenu 2 colonnes (gap-16 lg:gap-20) :
     * GAUCHE — Ingrédients :
       - Calculateur portions : panneau bg-cloud avec boutons +/− (nombre de personnes), affichage portions
       - Clic sur ingrédient → input pour saisir quantité disponible → Entrée valide → calcule portions/personnes possibles → recalcule tout proportionnellement
       - parseQuantity() extrait nombre + unité de "500 g", "2 c.à.s", "au goût" etc.
       - formatQuantity() scale et arrondit proprement
       - Bouton réinitialiser
       - Liste ingrédients : justify-between, quantité en pill bg-cloud à droite
     * DROITE — Étapes :
       - Barre de progression (h-1.5 bg-cloud, fill bg-primary, compteur X/total)
       - Accordéon : clic sur étape → valide (cercle vert ✓, texte barré, contenu masqué)
       - Re-clic → dévalide (revient à l'état normal)
       - Étapes parallèles : groupées visuellement (border-l-2 border-primary, badge "⚡ En parallèle", cards côte à côte en grid md:grid-cols-2)
       - Bouton timer sur chaque étape avec time défini (pill noir, onclick démarre Timer)
   - Timer widget flottant (bas-droite, fond ink)
   - Lien retour (pill noir)

3. category.html :
   - Nav fixe
   - Header section-dark (lien retour + titre Bebas géant + compteur recettes)
   - Grille identique à homepage (aspect-square, overlay, titre Bebas)
   - Footer minimal

FONCTIONNALITÉS JS DÉTAILLÉES :

search.js :
- Module IIFE Search avec init(recipes, callback) et filter(query)
- Filtre sur 6 champs : title_{lang}, description_{lang}, tags.join(' '), origin, type, ingredients_{lang}.map(i=>i.item).join(' ')
- Synchro inputs desktop (#search-input) et mobile (#search-input-mobile)
- Clear() pour reset quand on change de filtre

timer.js :
- Module IIFE Timer avec start(minutes, label), remove(id), init()
- Multi-instances simultanées
- setInterval tick toutes les secondes
- Notification sonore : Web Audio API oscillateur 800Hz, gain 0.3, durée 300ms
- Feedback visuel : ring-2 ring-primary sur le widget pendant 2s
- Widget : #timer-widget, liste de timers avec formatTime(mm:ss), bouton × pour supprimer

i18n.js :
- Module IIFE I18n avec load(), get(key, replacements), apply(), toggle(), getLang()
- Charge data/translations.json au DOMContentLoaded
- Applique sur [data-i18n] (textContent) et [data-i18n-placeholder] (placeholder)
- Toggle FR↔EN, sauvegarde localStorage('lang')
- Dispatch CustomEvent 'langchange' pour re-render dynamique

app.js :
- Module IIFE App
- Fetch recipes.json, init Search, setup filtres, render carrousel + grille
- Carrousel : 8 premières recettes, cards 280-300px, scroll horizontal snap, boutons prev/next scrollBy 320px
- Filtres type : querySelectorAll('.category-btn'), toggle classes bg-ink/text-on-primary vs border/text-ink
- Filtres origine : querySelectorAll('.origin-btn'), toggle bg-ink vs bg-cloud
- Grille : createCard() retourne <a> avec img aspect-square + overlay + titre + meta

recipe-detail.js :
- Module IIFE RecipeDetail avec init(), toggleStep(num) exposé globalement
- Fetch recipe par query param ?id=
- Calculateur :
  - basePersons = recipe.servings (personnes nourries par la recette de base)
  - currentPersons ajusté par +/−
  - ratio = currentPersons / basePersons
  - parseQuantity(str) : regex /^([\d.,/]+)\s*(.*)/ → {number, unit, raw}
  - formatQuantity(parsed, ratio) : scale, arrondi, format string
  - Clic ingrédient → input number → Entrée déclenche confirmIngredientCalc()
  - confirmIngredientCalc : ratio = available / baseNumber → calcule currentPersons → update tout
- Étapes :
  - groupSteps(steps) : regroupe les consécutifs {parallel:true} en {type:'parallel', steps:[]}
  - Render séquentiel : accordéon avec toggle validate/invalidate
  - Render parallèle : grid 2 cols dans un conteneur border-l primary
  - completedSteps = Set(), updateProgress() met à jour la barre

category.js :
- Lit query params type= ou origin=
- Filtre recipes, render grille identique à homepage

FORMAT DONNÉES :

recipes.json — tableau de 18 objets :
{
  "id": "slug-kebab-case",
  "title_fr": "...", "title_en": "...",
  "description_fr": "...", "description_en": "...",
  "image": "https://images.unsplash.com/photo-XXXXX?w=600&q=75",
  "type": "entree|plat|dessert|boisson|snack",
  "origin": "france|italie|japon|mexique|inde|maroc|thailande|usa|grece|coree|cuba|vietnam|turquie|angleterre",
  "prep_time": number (minutes),
  "cook_time": number (minutes),
  "servings": number (personnes nourries par la recette),
  "difficulty": "facile|moyen|difficile",
  "tags": ["tag1", "tag2", ...],
  "ingredients_fr": [{"item": "...", "quantity": "500 g"}],
  "ingredients_en": [{"item": "...", "quantity": "500 g"}],
  "steps_fr": [{"text": "...", "time": number|null, "parallel": true|absent}],
  "steps_en": [{"text": "...", "time": number|null, "parallel": true|absent}]
}

translations.json — objet {fr: {...}, en: {...}} avec ~60 clés couvrant :
- Navigation, hero, recherche, catégories, filtres
- Page recette : meta, ingrédients, étapes, timer, calculateur portions
- Footer, messages vides, labels

CSS (input.css) :
- @import "tailwindcss" + @source "../public"
- @theme : toutes les couleurs, fonts, radius, shadow
- @layer base : body font/color/bg
- @layer utilities : font-display, scrollbar-hide, carousel-scroll (scroll-snap), hero-gradient, section-dark, text-gradient
- @media print : .no-print hidden, body 12pt noir, .recipe-hero-img max-height 200px

CONTRAINTES :
- Bilingue FR/EN complet (interface + contenu recettes)
- Étapes parallèles explicites visuellement
- Calculateur portions intelligent (par personnes + par ingrédient disponible)
- Accordéon de validation d'étapes avec barre de progression
- Images Unsplash directes (fallback onerror vers image générique)
- CSS print propre pour recettes
- Responsive : 1 col mobile / 2 col tablet / 3 col desktop
- serve.json avec cleanUrls:false + rewrite racine
- 18 recettes : 9+ origines, 5 types, 3 difficultés
- Zero dépendance runtime, Tailwind v4 build-time only
```

### Fichiers nécessaires pour reproduction

| Fichier | Rôle | Indispensable |
|---------|------|---------------|
| DESIGN2.md | Design system de référence | Oui |
| DECISIONS.md | Architecture + décisions | Oui |
| recipes.json | Données des 18 recettes | Oui (ou régénérable) |
| translations.json | Traductions interface | Oui (ou régénérable) |
| Ce prompt ci-dessus | Instructions de construction | Oui |

---

*Dernière mise à jour : Git configuré, repo push sur https://github.com/MoonGoddd/Recette. Prompt de reproduction complet.*
