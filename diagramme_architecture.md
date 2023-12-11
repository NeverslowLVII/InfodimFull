graph TB
subgraph InfoDIM
subgraph Front-end
    UI(fa:fa-user Interface Utilisateur)
    Redux(fa:fa-refresh Redux - Gestion d'état)
end
subgraph Back-end
    Server(fa:fa-server Serveur d'Application)
    Auth(fa:fa-lock Services d'authentification)
    DB[(Base de Données)]
end

subgraph Connexions
    API(fa:fa-plug API RESTful)
    WS(fa:fa-exchange WebSockets)
end
subgraph CI/CD
    Jenkins(fa:fa-cogs Jenkins - Intégration continue)
    Github(<i class="fa-brands fa-github"></i> GitHub Actions - Déploiement continu)
end

Utilisateur(fa:fa-user) -->|Utilises| UI
UI -->|Appelle| API
UI -->|Se connecte à| WS
Front-end -->|Utilise le pipeline| CI/CD
Back-end -->|Utilise le pipeline| CI/CD
Server -->|Utilise| Auth(JWT, OAuth 2.0)
Auth -.->|Répond à| Server
Server -->|Envoie des requêtes SQL à| DB
DB -.->|Répond avec des données à| Server
Redux -->|Gère l'état de| UI
Server -.->|Fournit des données à| UI
Connexions -->|Fournit des connexions à| Server
end