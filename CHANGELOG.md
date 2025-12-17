# Changelog

## 1.1.2
- Stories ajoutées pour les composants métier (Stats, Calendar, SubscriptionList, SubscriptionForm, ConfirmModal, ServiceLogo).
- Tests unitaires supplémentaires pour Stats, SubscriptionList, Calendar.
- Ajout d’une section versionning et CI déjà en place; version bump.

## 1.1.3
- Ajout PWA/offline : manifest, icons svg, service worker cache-first + fallback index, registre SW dans l’app.
- README mis à jour (section PWA/offline).
- Version bump.

## 1.1.1
- Ajout du design system (Button, IconButton, Card, Badge, Modal, Input, Select) + stories + tests.
- Refactor UI (ConfirmModal, SubscriptionForm, App) pour utiliser le DS.
- Licence CC BY-NC 4.0, README réécrit, VERSIONING.md, CI GitHub Actions, Storybook.

## 1.1.0
- Infrastructure tests (Vitest/RTL), extraction de la logique stats, premiers tests integration (ajout abonnement, drag/drop, suppression, locale).

## 1.0.0
- Version initiale importée.
## [1.1.1] - 2025-12-17
### Ajouté
- Stories Storybook et tests unitaires pour les composants métier (Stats, SubscriptionList, Calendar).
- Dépendances Storybook alignées (8.6.15) et ajout de @testing-library/dom.
- Changelog formalisé.

### Notes
- Version incrémentée suite aux ajouts/tests.

## [1.1.0] - 2025-12-17
### Ajouté
- Design system (Button, IconButton, Card, Badge, Modal, Input, Select) + stories Storybook.
- Tests unitaires pour les primitives UI et composants métier (Stats, SubscriptionList, Calendar).
- Workflow CI GitHub Actions qui exécute les tests sur push/PR.
- Licence CC BY-NC 4.0 et documentation mise à jour (README, VERSIONING).
- Buy me a coffee ajouté au README.

### Modifié
- Formulaire abonnements refondu pour utiliser les composants du design system.
- Version bump à 1.1.0.

### Notes
- Usage non commercial uniquement (voir licence).

