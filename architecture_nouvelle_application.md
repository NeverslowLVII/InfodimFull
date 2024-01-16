# Architecture de la Nouvelle Application InfoDIM

## Introduction
Ce document décrit l'architecture de la nouvelle application InfoDIM. InfoDIM est une application web qui permet aux utilisateurs de se connecter et d'accéder à divers services et fonctionnalités du CHS de Sarreguemines. Elle comprend fonctionnalités spécifiques, allant de l'affichage des informations de base à la gestion des autorisations et des paramètres de l'application. L'objectif de ce document est de fournir une vue d'ensemble de l'architecture de cette application, y compris les technologies utilisées, les composants principaux et leur interaction, ainsi que les stratégies de déploiement et de sécurité.

## Vue d'ensemble de l'architecture

L'architecture de la nouvelle application InfoDIM est conçue pour être robuste, évolutive et facile à maintenir. Elle s'appuie sur une approche modulaire qui sépare clairement les préoccupations entre le front-end et le back-end, tout en permettant une intégration fluide avec les services tiers et les bases de données. Cette architecture vise à fournir une base solide pour le développement de l'application InfoDIM, en s'assurant qu'elle est sécurisée, performante et prête pour l'avenir.

## Composants de l'architecture

### Interface Utilisateur (Front-end)
- Technologies choisies : React.js pour le développement de l'interface utilisateur, Redux pour la gestion d'état.
- Responsivité et accessibilité : Utilisation de frameworks CSS comme Bootstrap pour assurer la responsivité, conformité avec les directives WCAG 2.1 niveau AA pour l'accessibilité web.
- Stratégie de déploiement : Utilisation de serveurs statiques, CDN pour le déploiement.

### Serveur d'Application (Back-end)
- Langage et framework : Node.js avec le framework Express.
- Structure du projet : Organisation des dossiers suivant l'architecture MVC.
- Authentification et gestion des sessions : Utilisation de middleware pour la gestion des sessions, intégration avec des services d'authentification tiers comme OAuth 2.0.

### Base de données
- Système de gestion de base de données : Oracle Database.
- Modélisation des données et schémas : ERD, tables, relations.
- Stratégies de sauvegarde et de restauration : Outils de sauvegarde, fréquence, stockage des sauvegardes.

### Services d'authentification
- Méthode d'authentification : JWT pour l'authentification des utilisateurs, intégration avec des services d'authentification tiers comme OAuth 2.0.

### Communication entre les composants
- Protocoles utilisés : API RESTful pour la communication entre le front-end et le back-end, utilisation de WebSockets pour la communication en temps réel.
- Sécurité des API : Utilisation de rate limiting, validation des entrées.

### Sécurité
- Chiffrement des données en transit et au repos : Utilisation de TLS pour le chiffrement des données en transit, chiffrement des données sensibles au repos.
- Stratégies de prévention des attaques courantes : Utilisation de WAF, pare-feu applicatif, audits de sécurité.

### Performance et Scalabilité
- Techniques de mise à l'échelle : Utilisation de l'auto-scaling, load balancing.
- Caching et optimisation des performances : Utilisation de Redis pour la mise en cache, optimisation des performances.

### CI/CD et Environnement de Développement
- Outils et services utilisés pour l'intégration et le déploiement continus : Utilisation de Jenkins pour l'intégration continue, GitHub Actions pour le déploiement continu.
- Environnements de développement, de test et de production : Utilisation de Docker pour la conteneurisation, orchestration avec Kubernetes.

### Documentation et Conventions
- Outils de documentation : Utilisation de JSDoc pour la documentation du code.
- Conventions de codage : Suivi des conventions de codage standard pour JavaScript (ESLint), utilisation de Prettier pour le formatage du code.

## Revue et Validation

La revue et la validation de l'architecture sont des étapes cruciales pour garantir que l'application InfoDIM répond aux exigences et maintient des standards de qualité élevés. Cette section décrit le processus et les critères utilisés pour la revue et la validation de l'architecture.

### Processus de Revue

- **Revue de Code par les Pairs** : Chaque contribution au code est soumise à une revue par les pairs via des pull requests sur GitHub/GitLab, permettant des discussions et des retours constructifs.
- **Critères de Revue** : Les revues se concentrent sur la lisibilité, le respect des conventions de codage, la performance, la sécurité, et l'adéquation avec l'architecture définie.
- **Analyse de Code Statique** : Intégration d'outils comme SonarQube ou Snyk dans le pipeline CI/CD pour automatiser l'analyse de la qualité du code et identifier les problèmes potentiels.

### Validation de l'Architecture

- **Prototypes et Preuves de Concept** : Développement de prototypes pour tester et valider les choix technologiques et les approches architecturales avant leur mise en œuvre complète.
- **Critères de Validation** : L'architecture est évaluée sur sa capacité à répondre aux exigences fonctionnelles et non fonctionnelles, son évolutivité, sa résilience et sa facilité de maintenance.

### Documentation

- **Documentation Architecturale** : La documentation complète de l'architecture est maintenue à jour pour faciliter la compréhension et la maintenance de l'application.
- **Outils de Documentation** : Utilisation d'outils comme ArchiMate ou UML pour modéliser l'architecture et partager la vision avec les parties prenantes.

### Tests et Assurance Qualité

- **Plan de Tests** : Mise en place d'un plan de tests comprenant des tests d'intégration, de charge, de performance et de sécurité pour valider les différents aspects de l'architecture.
- **Automatisation des Tests** : Utilisation de cadres de test comme Jest pour le front-end et Mocha pour le back-end pour automatiser les tests et garantir la non-régression.

### Feedback et Amélioration Continue

- **Collecte de Feedback** : Mise en place de mécanismes pour recueillir le feedback des utilisateurs finaux sur l'architecture et son utilisation au quotidien.
- **Processus d'Amélioration** : Engagement dans un processus d'amélioration continue, en utilisant le feedback et les métriques de performance pour guider les améliorations architecturales.

# Annexe

## Glossaire
- **SPA (Single Page Application)**: Une application web qui interagit avec l'utilisateur en chargeant dynamiquement une seule page HTML et en mettant à jour le contenu à la demande, sans nécessiter de rechargement de page.
- **JWT (JSON Web Token)**: Un standard ouvert (RFC 7519) qui définit une manière compacte et autonome de transmettre des informations de manière sécurisée entre les parties sous forme d'objet JSON.
- **OAuth 2.0**: Un protocole d'autorisation qui permet à une application d'obtenir un accès limité à un compte utilisateur sur un service HTTP.
- **CI/CD (Continuous Integration/Continuous Deployment)**: Pratiques de développement logiciel où les développeurs fusionnent fréquemment les modifications de code dans un dépôt central, suivies de builds et de tests automatisés.

## Références
- React documentation: [https://react.dev/learn](https://react.dev/learn)
- Node.js Express framework: [https://expressjs.com/](https://expressjs.com/)
- Oracle Database documentation: [https://docs.oracle.com/en/database/](https://docs.oracle.com/en/database/)

## Ressources supplémentaires
- Bootstrap framework: [https://react-bootstrap.netlify.app/docs/getting-started/introduction](https://react-bootstrap.netlify.app/docs/getting-started/introduction)
- Redux state management: [https://redux.js.org/introduction/getting-started](https://redux.js.org/introduction/getting-started)

## Modèles d'architecture
[Accédez au diagramme ici](https://lucid.app/lucidchart/fad45acb-dbb9-48cd-95b7-45aa98ac96f7/edit?viewport_loc=-85%2C-477%2C2742%2C1307%2C0_0&invitationId=inv_e5e13ed4-816a-416e-864c-7fe34075c86f)

## Exemples de code
- Exemple d'implémentation d'authentification JWT: [https://github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## Liste des outils
- Développement: Visual Studio Code, ESLint, Prettier
- Test: Jest (front-end), Mocha (back-end)
- Déploiement: Docker, Kubernetes, Jenkins, GitHub Actions

## Protocoles de test
- Description des tests unitaires, d'intégration, de performance, et de sécurité (à détailler ici).