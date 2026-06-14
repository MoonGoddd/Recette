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

### Phase 7 — Git & Déploiement
- [ ] Init repo Git local
- [ ] Créer repo GitHub MoonGoddd/Recette
- [ ] .gitignore (node_modules, .idea)
- [ ] Push initial
- [ ] README.md

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
- public/ contient tout le contenu servi (html, css compilé, js, data, assets)
- css/input.css est la source Tailwind avec @theme et @source "../public"
- package.json avec scripts: build (compile css), dev (watch + serve via concurrently), serve

DESIGN (Nike-inspired) :
- Fonts : Bebas Neue (display, uppercase, titres géants) + Inter (body, UI)
- Palette : ink #111, canvas #fff, cloud #f5f5f5, primary #ff385c, charcoal #39393b, mute #707072
- Hero full-bleed 85vh + gradient overlay + titre clamp(3rem,10vw,7rem)
- Sections alternées noir/blanc
- Carrousel horizontal "Recettes du moment" (section dark)
- Grille mosaïque (aspect-square, gap-1, overlay gradient, titre Bebas en bas)
- Section catégories : 4 tiles portrait (aspect 4:5) sur fond noir
- Filtres : pills rounded-full noir/blanc style Nike
- Nav fixe glassmorphism (backdrop-blur-md, bg-canvas/90)
- Zero shadow. Profondeur = photo + gradient + contraste noir/blanc
- Timer widget : fixed bottom-right, fond ink

PAGES :
1. index.html : nav + hero + carrousel + filtres (type + origine) + grille + catégories + footer
2. recipe.html : hero 60vh + meta badges (bande noire) + contenu 2 colonnes (ingrédients | étapes) + timer
3. category.html : header dark + titre géant + grille filtrée

FONCTIONNALITÉS JS :
- search.js : recherche instantanée sur titre, description, ingredients, tags, origin, type
- timer.js : multi-instances, Web Audio API (800Hz, 300ms), widget flottant
- i18n.js : toggle FR/EN, localStorage, événement langchange, re-render dynamique
- app.js : carrousel (scroll snap, boutons prev/next), filtres catégorie/origine, render grille
- recipe-detail.js : groupSteps() pour étapes parallèles (parallel: true), rendu intelligent
- category.js : filtre par query param type= ou origin=

FORMAT DONNÉES (recipes.json) :
- Tableau d'objets avec : id, title_fr/en, description_fr/en, image (URL Unsplash), type, origin, prep_time, cook_time, servings, difficulty, tags[], ingredients_fr/en[{item, quantity}], steps_fr/en[{text, time, parallel?}]
- translations.json : ~55 clés FR/EN pour toute l'interface

CONTRAINTES :
- Bilingue FR/EN avec toggle dans la nav
- Étapes parallèles marquées "parallel: true" dans JSON, rendues côte à côte avec badge visuel
- Images : URLs Unsplash directes (pas de fichiers locaux)
- CSS print pour impression propre des recettes
- Responsive : 1 col mobile / 2 col tablet / 3 col desktop
- 18 recettes couvrant : 9 origines, 5 types, 3 niveaux difficulté
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

*Dernière mise à jour : Phase 3 + 3b complétées. Images Unsplash en place. Page recette avec étapes parallèles. Prompt de reproduction ajouté. Reste : accessibilité, git/GitHub.*
