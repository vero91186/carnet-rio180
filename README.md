# Carnet du Rio 180

Carnet de suivi de l'aquarium Juwel Rio 180 : relevés de paramètres, population,
budget, entretien et guide complet. Page unique, sans serveur ni base de données.

## Mise en ligne

1. Créer un dépôt GitHub (par exemple `carnet-rio180`), public.
2. Y déposer `index.html` et le dossier `img/` tels quels, à la racine.
3. Settings → Pages → Source : `Deploy from a branch`, branche `main`, dossier `/ (root)`.
4. Au bout d'une minute, le site est à `https://<pseudo>.github.io/carnet-rio180/`.

Sur le téléphone, ouvrir cette adresse puis « Ajouter à l'écran d'accueil » :
la page s'ouvre ensuite comme une application.

## Où sont les données

Dans le navigateur qui a servi à les saisir (`localStorage`), pas sur GitHub.
Un téléphone et un ordinateur ont donc chacun leurs données. L'onglet Réglages
permet d'exporter un fichier `.json` et de le réimporter ailleurs.

## Mettre à jour

Remplacer `index.html` dans le dépôt. Les données saisies ne sont pas touchées :
elles vivent dans le navigateur, pas dans le fichier.
