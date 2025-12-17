## Politique de version

- Le numéro de version est celui de `package.json`.
- Règles :
  - Patch : corrections mineures, refactor sans impact fonctionnel.
  - Minor : nouvelles fonctionnalités ou améliorations visibles.
  - Major : changements cassants ou migrations complexes.
- Chaque contribution (humaine ou IA) doit :
  1) Mettre à jour la version selon l’impact.
  2) Mettre à jour le changelog et le README si besoin.
  3) Faire passer les tests et la CI.

## Processus recommandé

1. Ouvrir une PR avec description claire.
2. Lancer `npm test` et vérifier le workflow CI.
3. Mettre à jour la version (patch/minor/major).
4. Documenter les changements.

