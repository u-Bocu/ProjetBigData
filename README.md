# <span style="color:#DC3535">>Projet Big Data<</span>

## <span style="color:#F49D1A">0 - Brainstorming </span>
### <span style="color:#FFE15D"><u>Répartition :</u></span>
* Partie Cloud : Quentin RICHARD
* Partie Machine Learning : Matthieu REMOND
* Partie Dev Web : Mathieu MAISONNETTE
* Partie Dev Web & Datavisualisation : Julien MUGUET

## <span style="color:#F49D1A">I - Partie Cloud </span>
### <span style="color:#FFE15D"><u>Hébergeurs (ne pas mettre tous ses oeufs dans le même panier) :</u></span>
* Azure Cloud
  * Base de données MySQL
* Google Cloud Platform
  * Frontend (site Web)
  * Backend (API Flask + modèle ML)

### <span style="color:#FFE15D"><u>Structure base de données MySQL :</u></span>
* <b><span style="color:#73777B">Quiz</span></b>
  * id | label | id_statut | date_creation | id_theme | id_user | lien_image
* <b><span style="color:#73777B">Questions</span></b>
  * id | id_quiz | question | lien_image | date_creation
* <b><span style="color:#73777B">Users</span></b>
  * id | login | password | mail | age | sexe | id_theme_pref | id_role
* <b><span style="color:#73777B">Roles</span></b>
  * id | label
* <b><span style="color:#73777B">Themes</span></b>
  * id | label | lien_image
* <b><span style="color:#73777B">Question_theme</span></b>
  * id_question | id_theme
* <b><span style="color:#73777B">Reponses</span></b>
  * id | label | is_valid | id_question
* <b><span style="color:#73777B">Resultats</span></b>
  * id | id_quiz | id_user | score | timestamp | id_satisfaction
* <b><span style="color:#73777B">Satisfaction</span></b>
  * id | label
* <b><span style="color:#73777B">Statut_quiz</span></b>
  * id | label

## <span style="color:#F49D1A">II - Application Web </span>
### <span style="color:#FFE15D"><u>Technologies :</u></span>
* Frontend : Angular
* Backend : Python - API Flask

### <span style="color:#FFE15D"><u>Interface utilisateur :</u></span>
* FONCTIONNALITES AVEC UN UTILISATEUR NON CONNECTÉ :
  * Possibilité de lancer les mêmes quiz que les utilisateurs connectés
  * Possibilité de consulter le dashboard global qui contient de la data visualisation
  * Les données sont recueillies dans un but de data visualisation
  * Impossible d'accéder à l'onglet Profil
  * Impossible de lancer un quiz aléatoire
  * Impossible de créer des quiz personnalisés
  

* FONCTIONNALITES AVEC UN UTILISATEUR CONNECTÉ :
  * Possibilité de lancer les quiz
  * Possibilité de consulter le dashboard global qui contient de la data visualisation
  * Les données sont recueillies dans un but de data visualisation
  * Accès à l'onglet Profil
    * Consulter ses données KPI
    * Consulter ses statistiques
    * Consulter son historique des quiz réalisés
    * Consulter la liste des quiz créés
    * Consulter ses informations personnelles
  * Accès aux quiz aléatoires
  * Accès à la création de quiz personnalisés

### <span style="color:#FFE15D"><u>Interface Administrateur (A DÉVELOPPER) :</u></span>

* Ajouter/supprimer quiz
* Ajouter/supprimer user
* Système de validation des quiz créés par les utilisateurs


## <span style="color:#F49D1A">III - Data Visualisation</span>
### <span style="color:#FFE15D"><u>Technologie :</u></span>
* Frontend : E-Chart

### <span style="color:#FFE15D"><u>Interface :</u></span>
* Dans l'onglet Profil > KPI :
  * KPI Global :
    * Le score moyen sur tous les quiz effectués
    * Le nombre de quiz créé
  * KPI Thème :
    * Le meilleur score obtenu avec le nom du thème
    * Le thème où le score est le plus bas dans un but de l'améliorer
  * KPI Quiz :
    * Le meilleur score obtenu avec le nom du quiz
    * Le quiz où le score est le plus bas dans un but de l'améliorer


* Dans l'onglet Profil > Statistiques :
  * Un graphique affiche la moyenne obtenue dans chaque thème effectué
  * Cette partie est à améliorer pour afficher d'autres données de data visualisation


* Dans l'onglet Dashboard :
  * Un graphique qui affiche les données récoltées sur tous les utilisateurs connectés et non connectés
  * En amélioration pour afficher des données pertinentes, qui donne envie aux utilisateurs de créer un compte et d'être actif sur notre plateforme

## <span style="color:#F49D1A">IV - Machine Learning</span>

Pour la partie machine learning nous avons opté pour un calcul des MFCCs à passer ensuite à notre modèle. Pour le modèle, nous sommes dans un premier temps partis sur un LSTM assez basique afin de nous assurer que nous avions une première solution qui marche avant de passer sur un modèle Transformer. <br>
Au final nous avons une bien meilleure précision sur le modèle LSTM (98% de précision sur les données de test) et nous l'avons donc gardé pour la solution finale. <br>

### <span style="color:#FFE15D"><u>Préparation de la donnée :</u></span>

- Troncage des fichiers audio<br>
- Calculs des MFCCs <br>
- Padding<br>
- Normalisation des coefficients<br>

### <span style="color:#FFE15D"><u>Conception du LSTM :</u></span>
- Conv1D
- MaxPooling1D
- LSTM
- LSTM
- Dense (relu)
- Softmax

### <span style="color:#FFE15D"><u>Conception du modèle Transformer :</u></span>
- Normalisation
- Auto-attention
- Normalisation
- Conv1D
- Conv1D
- Normalisation
- Auto-attention
- Normalisation
- Conv1D
- Conv1D
- AveragePooling1D
- Softmax

### <span style="color:#FFE15D"><u>Optimisation des modèles :</u></span>
Pour l'optimisation du modèle nous avons principalement changé la manière dont nous effectuions le padding et la normalisation. Une autre manière dont nous avons pu grandement augmenter notre précision est en choisissant le bon nombre d'epoch pour s'arrêter juste avant que notre modèle ne commence à sur-apprendre. <br>

Les fichiers Jupyter Notebook des différentes versions des modèles sont disponibles sur le github du projet.

Récup les questions --> https://quipoquiz.com/module/sed/quiz/fr/start_quiz.snc?quiz=514<br>
Récup des réponses --> https://quipoquiz.com/module/sed/quiz/fr/answer_question.snc?quiz=514&answer=true&question=16628
