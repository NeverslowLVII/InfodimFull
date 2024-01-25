# InfoDIM Project

Ce projet est composé de deux parties principales : le backend (`InfoDIMBackend`) et le frontend (`InfoDIMFrontend`).

## Configuration de l'environnement

Avant de démarrer les services, vous devez configurer les variables d'environnement nécessaires.

### Backend

1. Naviguez vers le dossier du backend :
   ```
   cd InfoDIMBackend
   ```
2. Créez un fichier `.env` à la racine du projet et remplissez-le avec les informations nécessaires :
   ```
   ORACLEDB_USER=votre_utilisateur_oracle
   ORACLEDB_PASSWORD=votre_mot_de_passe_oracle
   ORACLEDB_CONNECTION_STRING=chaîne_de_connexion_oracle
   JWT_SECRET=clé_secrète_pour_jwt
   ```
3. Installez les dépendances :
   ```
   npm install
   ```
4. Démarrez le serveur de développement :
   ```
   npm run dev
   ```

### Frontend

1. Naviguez vers le dossier du frontend :
   ```
   cd InfoDIMFrontend
   ```
2. Installez les dépendances :
   ```
   npm install
   ```
3. Démarrez le serveur de développement :
   ```
   npm run dev
   ```
