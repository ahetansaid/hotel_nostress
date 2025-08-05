# 🏨 Hôtel No-Stress - Système de Gestion Hôtelière

Un système de gestion hôtelière moderne et complet développé avec Next.js 13, React 18, TypeScript et Tailwind CSS.

## ✨ Fonctionnalités

### 🎯 Front-Office (Site Client)
- **Page d'accueil attractive** avec présentation de l'hôtel
- **Catalogue des chambres** avec filtres avancés et système de recherche
- **Système de réservation en ligne** avec processus en 4 étapes
- **Page événements** pour salles de conférence et mariages
- **Design responsive** et moderne avec animations
- **Formulaire de contact** intégré

### 🔧 Back-Office (Gestion Interne)
- **Tableau de bord** avec statistiques en temps réel
- **Gestion des chambres** avec statuts et actions rapides
- **Gestion des réservations** avec workflow complet
- **Gestion des clients** avec système de fidélité
- **Facturation** avec génération de factures
- **Rapports et analytics** avec graphiques interactifs
- **Interface d'administration** sécurisée

### 🎨 Design & UX
- **Design moderne** avec gradients et animations
- **Interface intuitive** avec navigation claire
- **Responsive design** pour tous les appareils
- **Thème cohérent** entre front et back-office
- **Animations fluides** et micro-interactions

## 🚀 Technologies Utilisées

- **Next.js 13** avec App Router
- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Zustand** pour la gestion d'état
- **Radix UI** pour les composants
- **Lucide React** pour les icônes
- **Recharts** pour les graphiques
- **date-fns** pour la gestion des dates

## 📁 Structure du Projet

```
hotel_nostress/
├── app/
│   ├── front-office/          # Site client
│   │   ├── page.tsx          # Page d'accueil
│   │   ├── chambres/         # Catalogue des chambres
│   │   ├── reservation/      # Système de réservation
│   │   └── evenements/       # Salles d'événements
│   ├── dashboard/            # Tableau de bord
│   ├── rooms/               # Gestion des chambres
│   ├── reservations/        # Gestion des réservations
│   ├── guests/              # Gestion des clients
│   ├── billing/             # Facturation
│   ├── reports/             # Rapports et analytics
│   ├── login/               # Page de connexion
│   └── layout.tsx           # Layout principal
├── components/
│   ├── layout/              # Composants de layout
│   ├── dashboard/           # Composants du dashboard
│   ├── rooms/               # Composants des chambres
│   └── ui/                  # Composants UI réutilisables
├── lib/
│   ├── store.ts             # Store Zustand
│   ├── types.ts             # Types TypeScript
│   ├── utils.ts             # Utilitaires
│   └── mock-data.ts         # Données de démonstration
└── hooks/                   # Hooks personnalisés
```

## 🛠️ Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd hotel_nostress

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Accès
- **Front-Office**: http://localhost:3000/front-office
- **Back-Office**: http://localhost:3000/dashboard
- **Page de connexion**: http://localhost:3000/login

## 🔐 Identifiants de Démonstration

**Email:** admin@hotel-nostress.fr  
**Mot de passe:** admin123

## 📱 Fonctionnalités Détaillées

### Front-Office

#### 🏠 Page d'Accueil
- Présentation attractive de l'hôtel
- Widget de réservation intégré
- Section services et équipements
- Informations de contact

#### 🛏️ Catalogue des Chambres
- Filtres par prix, type et équipements
- Vue grille et liste
- Tri par prix et capacité
- Détails complets des chambres

#### 📅 Système de Réservation
- Processus en 4 étapes
- Sélection de dates avec calendrier
- Formulaire d'informations personnelles
- Méthodes de paiement
- Confirmation de réservation

#### 🎉 Page Événements
- Types d'événements (conférences, mariages, etc.)
- Demande de devis personnalisé
- Services inclus et optionnels
- Contact équipe événementielle

### Back-Office

#### 📊 Tableau de Bord
- Statistiques en temps réel
- Graphiques de performance
- Vue d'ensemble des chambres
- Notifications et alertes

#### 🏨 Gestion des Chambres
- Statuts en temps réel
- Actions rapides (check-in, check-out, nettoyage)
- Filtres et recherche
- Vue d'ensemble par étage

#### 📋 Gestion des Réservations
- Workflow complet de réservation
- Statuts et suivi
- Informations clients détaillées
- Historique des réservations

#### 👥 Gestion des Clients
- Base de données clients
- Système de fidélité
- Historique des séjours
- Préférences et notes

#### 💰 Facturation
- Génération automatique de factures
- Suivi des paiements
- Export PDF
- Rapports financiers

#### 📈 Rapports et Analytics
- Graphiques interactifs
- Métriques de performance
- Prévisions et tendances
- Export de données

## 🎨 Design System

### Couleurs
- **Primaire**: Bleu (#3B82F6) à Violet (#8B5CF6)
- **Secondaire**: Vert (#10B981), Orange (#F59E0B)
- **Neutre**: Gris (#6B7280)

### Typographie
- **Titres**: Inter, font-bold
- **Corps**: Inter, font-normal
- **Tailles**: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl

### Composants
- **Cartes**: Avec ombres et bordures arrondies
- **Boutons**: Gradients et états hover
- **Formulaires**: Validation et feedback visuel
- **Navigation**: Sticky et responsive

## 🔧 Configuration

### Variables d'Environnement
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Hôtel No-Stress
```

### Personnalisation
- Modifier les couleurs dans `tailwind.config.ts`
- Adapter les données dans `lib/mock-data.ts`
- Personnaliser les composants dans `components/ui/`

## 📊 Données de Démonstration

Le projet inclut des données de démonstration complètes :
- 20 chambres de différents types
- 15 clients avec historique
- 25 réservations actives
- 30 factures générées
- Statistiques réalistes

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build
vercel --prod
```

### Autres Plateformes
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- **Email**: support@hotel-nostress.fr
- **Documentation**: [Lien vers la documentation]
- **Issues**: [Lien vers les issues GitHub]

---

**Développé avec ❤️ pour l'industrie hôtelière**
