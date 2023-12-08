graph TB
subgraph InfoDIM
subgraph Front-end
    UI[Interface Utilisateur]
    Redux[Redux - Gestion d'état]
end
subgraph Back-end
    Server[Serveur d'Application]
    Auth[Services d'authentification]
    DB[(Base de Données)]
end

subgraph Connexions
    API[API RESTful]
    WS[WebSockets]
end
subgraph CI/CD
    Jenkins[Jenkins - Intégration continue]
    Github[GitHub Actions - Déploiement continu]
end

Utilisateur -->|Utilises| UI
UI --> API
UI --> WS
Front-end -->|Pipeline CI/CD| CI/CD
Back-end -->|Pipeline CI/CD| CI/CD
Server -->|JWT, OAuth 2.0| Auth
Server -->|Requêtes SQL| DB
CI/CD -->|Déploiement| Server
Connexions --> Server
Redux -->|Gestion d'état| UI
end