# **EcoBlissBath**

Eco Bliss Bath est une start-up de 20 personnes, spécialisée dans la vente de produits de beauté écoresponsables dont le produit principal est un savon solide.

## **Prérequis**

Pour le lancement du projet vous aurez besoin de Docker, Node.js, NPM, Cypress et d'un navigateur (Chrome ou Firefox recommandés)

## **Procédure pour l'exécution du projet**

1. Cloner le projet:

```
git clone https://github.com/OpenClassrooms-Student-Center/TesteurLogiciel_Automatisez_des_tests_pour_une_boutique_en_ligne.git
```

2. Lancer de Backend:

-Ouvrez un terminal de commande.  
-Accédez au répertoire du projet cloné.  
-Tapez la commande suivante pour lancer le backend :

```
docker-compose up
```

3. Lancer le Frontend:

-Ouvrez un terminal de commande.  
-Accédez au répertoire du projet cloné.  
-Tapez les commandes suivantes :

```
npm install
npm start
```

## **Procédure pour lancer les tests**

1. Installer Cypress:  
   -Ouvrez un terminal de commande.  
   -Accédez au répertoire du projet cloné.  
   -Tapez la commande suivante pour installer Cypress :

```
npm install cypress --save-dev
```

2. Ouvrir Cypress:

Dans le terminal, tapez :

```
npx cypress open
```

## **Procédure pour la génération du rapport**

1. Lancer les Tests et Générer un Rapport :  
   -Ouvrez un terminal de commande.  
   -Accédez au répertoire du projet cloné.  
   -Tapez la commande suivante pour exécuter les tests et générer un rapport:

```
npx cypress run
```

## **Login**

Identifiant: test2@test.fr  
Mot de passe: testtest

## **APi**

lien Swagger : http://localhost:8081/api/doc

## **Auteurs**

Armelle Barban

contact: armelle.barban@gmail.com

## **Hitorique des versions**

-version 1.0.0 Tests manuels  
-version 2.0.0 Ajout de Cypress ,Tests automatisés
