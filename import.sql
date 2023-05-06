# Roles
INSERT INTO roles (id, label)
VALUES (1, 'Utilisateur'),
       (2, 'Administrateur');

# Statut Quiz
INSERT INTO statut_quiz (id, label)
VALUES (1, 'Actif'),
       (2, 'En attente de validation'),
       (3, 'Désactivé');


# Themes
INSERT INTO themes (id, label, lien_image)
VALUES (1, 'Animaux', 'https://dinoanimals.com/wp-content/uploads/2020/10/Animals.jpg'),
       (2, 'Arts et culture',
        'https://www.embracingourdifferences.org/clientuploads/directory/CommitteeReview/2020/2043.jpg'),
       (3, 'Géographie', 'http://oodlesof.info/wp-content/uploads/2019/09/wonderful-physical-geography-1920x1080.jpg'),
       (4, 'Histoire', 'https://wallpapercave.com/wp/wp2244215.jpg'),
       (5, 'Sciences et technologies',
        'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/01/30/646312-techonology-marketing-thinkstock-121117.jpg'),
       (6, 'Sports', 'http://lifestyle.iresearchnet.com/wp-content/uploads/2017/03/sports-psychology-26.jpg'),
       (7, 'Quiz communautaires', 'https://s3.amazonaws.com/libapps/accounts/44275/images/cropped-community-group.jpg');

# Quiz
INSERT
INTO quiz (id, label, id_statut, date_creation, id_theme, id_user, lien_image)
VALUES (1, 'Les corbeaux', 1, CURDATE(), 1, 1, 'https://exemple.com/les_corbeaux.jpg'),
       (2, 'Les ruminants', 1, CURDATE(), 1, 1, 'https://exemple.com/ruminants.jpg'),
       (3, 'Les fables de La Fontaine', 1, CURDATE(), 2, 1, 'https://exemple.com/fables_la_fontaine.jpg'),
       (4, 'Elvis Presley', 1, CURDATE(), 2, 1, 'https://exemple.com/elvis_presley.jpg'),
       (5, 'New York', 1, CURDATE(), 3, 1, 'https://exemple.com/new_york.jpg'),
       (6, 'Capitales Européennes', 1, CURDATE(), 3, 1, 'https://exemple.com/capitales_europeennes.jpg'),
       (7, 'Les bateaux célèbres', 1, CURDATE(), 4, 1, 'https://exemple.com/bateaux_celebres.jpg'),
       (8, 'La catastrophe nucléaire de Tchernobyl', 1, CURDATE(), 4, 1, 'https://exemple.com/tchernobyl.jpg'),
       (9, 'Les découvertes de la mission Mars Rover', 1, CURDATE(), 5, 1, 'https://exemple.com/mars_rover.jpg'),
       (10, 'La révolution des énergies renouvelables', 1, CURDATE(), 5, 1,
        'https://exemple.com/energies_renouvelables.jpg'),
       (11, 'Formule 1', 1, CURDATE(), 6, 1, 'https://exemple.com/formule1.jpg'),
       (12, 'Olympique Lyonnais', 1, CURDATE(), 6, 1, 'https://exemple.com/olympique_lyonnais.jpg');


# Questions
-- Les corbeaux
INSERT INTO questions (id, id_quiz, question, lien_image, date_creation)
VALUES (1, 1, 'Quel est l\'oiseau considéré comme le plus intelligent ?', 'https://exemple.com/les_corbeaux.jpg',
        CURDATE()),
       (2, 1, 'Comment les corbeaux communiquent-ils entre eux ?', 'https://exemple.com/les_corbeaux.jpg', CURDATE()),
       (3, 1, 'Quelle est la particularité du corbeau calédonien ?', 'https://exemple.com/les_corbeaux.jpg', CURDATE()),
       (4, 1, 'Quel est le régime alimentaire des corbeaux ?', 'https://exemple.com/les_corbeaux.jpg', CURDATE()),
       (5, 1, 'Comment les corbeaux chassent-ils leurs proies ?', 'https://exemple.com/les_corbeaux.jpg', CURDATE()),
       (6, 1, 'Quelle est la durée de vie moyenne d\'un corbeau ?', 'https://exemple.com/les_corbeaux.jpg', CURDATE()),
       (7, 1, 'Comment les corbeaux se protègent-ils des prédateurs ?', 'https://exemple.com/les_corbeaux.jpg',
        CURDATE()),
       (8, 1, 'Quel est le rôle des corbeaux dans les mythes et légendes ?', 'https://exemple.com/les_corbeaux.jpg',
        CURDATE()),
       (9, 1, 'Quelle est l\'espèce de corbeau la plus répandue en France ?', 'https://exemple.com/les_corbeaux.jpg',
        CURDATE()),
       (10, 1, 'Comment les corbeaux s\'adaptent-ils aux changements climatiques ?',
        'https://exemple.com/les_corbeaux.jpg',
        CURDATE());
-- Les ruminants
INSERT INTO questions (id, id_quiz, question, lien_image, date_creation)
VALUES (11, 2, 'Quels sont les différents types de ruminants ?', 'https://exemple.com/ruminants.jpg', CURDATE()),
       (12, 2, 'Comment fonctionne le système digestif des ruminants ?', 'https://exemple.com/ruminants.jpg',
        CURDATE()),
       (13, 2, 'Quel est l\'aliment de base des ruminants ?', 'https://exemple.com/ruminants.jpg', CURDATE()),
       (14, 2, 'Quel est l\'animal ruminant le plus grand du monde ?', 'https://exemple.com/ruminants.jpg', CURDATE()),
       (15, 2, 'Comment les ruminants régulent-ils leur température corporelle ?', 'https://exemple.com/ruminants.jpg',
        CURDATE()),
       (16, 2, 'Quelle est la durée de vie moyenne d\'un ruminant ?', 'https://exemple.com/ruminants.jpg', CURDATE()),
       (17, 2, 'Comment les éleveurs sélectionnent-ils les ruminants pour l\'élevage ?',
        'https://exemple.com/ruminants.jpg',
        CURDATE()),
       (18, 2, 'Quels sont les avantages environnementaux de l\'élevage des ruminants ?',
        'https://exemple.com/ruminants.jpg', CURDATE()),
       (19, 2, 'Comment les ruminants ont-ils évolué au fil du temps ?', 'https://exemple.com/ruminants.jpg',
        CURDATE()),
       (20, 2, 'Comment les ruminants ont-ils été domestiqués ?', 'https://exemple.com/ruminants.jpg', CURDATE());
-- Les fables de La Fontaine
INSERT INTO questions (id, id_quiz, question, lien_image, date_creation)
VALUES (21, 3, 'Quels sont les personnages principaux de la fable "Le Corbeau et le Renard" ?',
        'https://exemple.com/fables_la_fontaine.jpg', CURDATE()),
       (22, 3, 'Que cherche à obtenir le renard dans la fable "Le Corbeau et le Renard" ?',
        'https://exemple.com/fables_la_fontaine.jpg', CURDATE()),
       (23, 3, 'Quel est le message moral de la fable "Le Corbeau et le Renard" ?',
        'https://exemple.com/fables_la_fontaine.jpg', CURDATE()),
       (24, 3, 'Quel est le titre complet de la fable "Le Loup et l\'Agneau" ?',
        'https://exemple.com/fables_la_fontaine.jpg', CURDATE()),
       (25, 3, 'Qui est le personnage principal de la fable "La Cigale et la Fourmi" ?',
        'https://exemple.com/fables_la_fontaine.jpg', CURDATE()),
       (26, 3, 'Quel est le message moral de la fable "La Cigale et la Fourmi" ?',
        'https://exemple.com/fables_la_fontaine.jpg', CURDATE()),
       (27, 3, 'Quel est le titre complet de la fable "Le Lièvre et la Tortue" ?',
        'https://exemple.com/fables_la_fontaine.jpg', CURDATE()),
       (28, 3, 'Qui est le personnage principal de la fable "Le Renard et la Cigogne" ?',
        'https://exemple.com/fables_la_fontaine.jpg', CURDATE()),
       (29, 3, 'Quel est le message moral de la fable "Le Renard et la Cigogne" ?',
        'https://exemple.com/fables_la_fontaine.jpg', CURDATE()),
       (30, 3, 'Quel est le titre complet de la fable "Le Loup et la Grue" ?',
        'https://exemple.com/fables_la_fontaine.jpg', CURDATE());
-- Elvis Presley
INSERT INTO questions (id, id_quiz, question, lien_image, date_creation)
VALUES (31, 4, 'Dans quel état américain Elvis Presley est-il né ?', 'https://exemple.com/elvis_presley.jpg',
        CURDATE()),
       (32, 4, 'Quelle était la profession du père d\'Elvis Presley ?', 'https://exemple.com/elvis_presley.jpg',
        CURDATE()),
       (33, 4, 'À quel âge Elvis Presley a-t-il commencé à chanter ?', 'https://exemple.com/elvis_presley.jpg',
        CURDATE()),
       (34, 4, 'Quel est le titre de la première chanson d\'Elvis Presley à avoir atteint le top 10 des ventes ?',
        'https://exemple.com/elvis_presley.jpg', CURDATE()),
       (35, 4, 'Quel est le surnom donné à Elvis Presley ?', 'https://exemple.com/elvis_presley.jpg', CURDATE()),
       (36, 4, 'Quel est le titre de la première apparition d\'Elvis Presley à la télévision ?',
        'https://exemple.com/elvis_presley.jpg', CURDATE()),
       (37, 4, 'Combien de fois Elvis Presley s\'est-il marié ?', 'https://exemple.com/elvis_presley.jpg', CURDATE()),
       (38, 4, 'Quel est le nom du domaine dans lequel Elvis Presley habitait ?',
        'https://exemple.com/elvis_presley.jpg', CURDATE()),
       (39, 4, 'Quel est le titre de la dernière chanson enregistrée par Elvis Presley avant sa mort ?',
        'https://exemple.com/elvis_presley.jpg', CURDATE()),
       (40, 4, 'Dans quelle ville Elvis Presley est-il décédé ?', 'https://exemple.com/elvis_presley.jpg', CURDATE());
-- New York
INSERT INTO questions (id, id_quiz, question, lien_image, date_creation)
VALUES (41, 5, 'Quand a été fondée la ville de New York ?', 'https://exemple.com/new_york.jpg', CURDATE()),
       (42, 5, 'Quel est le surnom de la ville de New York ?', 'https://exemple.com/new_york.jpg', CURDATE()),
       (43, 5, 'Quelle est la population de la ville de New York ?', 'https://exemple.com/new_york.jpg', CURDATE()),
       (44, 5, 'Quelle est la signification du nom "Manhattan" ?', 'https://exemple.com/new_york.jpg', CURDATE()),
       (45, 5, 'Quelle est la plus haute tour de la ville de New York ?', 'https://exemple.com/new_york.jpg',
        CURDATE()),
       (46, 5, 'Quel est le quartier le plus célèbre de la ville de New York ?', 'https://exemple.com/new_york.jpg',
        CURDATE()),
       (47, 5, 'Dans quelle île se trouve la Statue de la Liberté ?', 'https://exemple.com/new_york.jpg', CURDATE()),
       (48, 5, 'Quel est le nom du célèbre pont qui relie Brooklyn à Manhattan ?', 'https://exemple.com/new_york.jpg',
        CURDATE()),
       (49, 5, 'Quel est le nom du célèbre parc situé en plein cœur de Manhattan ?', 'https://exemple.com/new_york.jpg',
        CURDATE()),
       (50, 5, 'Quel est le nom du célèbre zoo situé dans le Bronx à New York ?', 'https://exemple.com/new_york.jpg',
        CURDATE());
-- Capitales Européennes
INSERT INTO questions (id, id_quiz, question, lien_image, date_creation)
VALUES (51, 6, 'Quelle est la capitale de l\'Espagne ?', 'https://exemple.com/capitales_europeennes.jpg', CURDATE()),
       (52, 6, 'Quelle est la capitale de l\'Italie ?', 'https://exemple.com/capitales_europeennes.jpg', CURDATE()),
       (53, 6, 'Quelle est la capitale de la Belgique ?', 'https://exemple.com/capitales_europeennes.jpg', CURDATE()),
       (54, 6, 'Quelle est la capitale de l\'Allemagne ?', 'https://exemple.com/capitales_europeennes.jpg', CURDATE()),
       (55, 6, 'Quelle est la capitale de l\'Irlande ?', 'https://exemple.com/capitales_europeennes.jpg', CURDATE()),
       (56, 6, 'Quelle est la capitale du Portugal ?', 'https://exemple.com/capitales_europeennes.jpg', CURDATE()),
       (57, 6, 'Quelle est la capitale de la Suède ?', 'https://exemple.com/capitales_europeennes.jpg', CURDATE()),
       (58, 6, 'Quelle est la capitale de la Pologne ?', 'https://exemple.com/capitales_europeennes.jpg', CURDATE()),
       (59, 6, 'Quelle est la capitale de la Norvège ?', 'https://exemple.com/capitales_europeennes.jpg', CURDATE()),
       (60, 6, 'Quelle est la capitale de la Grèce ?', 'https://exemple.com/capitales_europeennes.jpg', CURDATE());
-- Les bateaux célèbres
INSERT INTO questions (id, id_quiz, question, lien_image, date_creation)
VALUES (61, 7, 'Quel est le nom du bateau qui a transporté Charles Darwin lors de son voyage autour du monde ?',
        'https://exemple.com/bateaux_celebres.jpg', CURDATE()),
       (62, 7, 'Quel est le nom du bateau qui a transporté les immigrants irlandais aux États-Unis au XIXe siècle ?',
        'https://exemple.com/bateaux_celebres.jpg', CURDATE()),
       (63, 7, 'Quel est le nom du bateau qui a coulé en 1912 après avoir heurté un iceberg ?',
        'https://exemple.com/bateaux_celebres.jpg', CURDATE()),
       (64, 7, 'Quel est le nom du bateau qui a transporté les premiers colons britanniques en Australie en 1788 ?',
        'https://exemple.com/bateaux_celebres.jpg', CURDATE()),
       (65, 7, 'Quel est le nom du bateau qui a transporté les Mayflower Pilgrims en Amérique en 1620 ?',
        'https://exemple.com/bateaux_celebres.jpg', CURDATE()),
       (66, 7,
        'Quel est le nom du navire britannique qui a été coulé par l\'U-47 allemand pendant la Seconde Guerre mondiale ?',
        'https://exemple.com/bateaux_celebres.jpg', CURDATE()),
       (67, 7,
        'Quel est le nom du bateau qui a été utilisé par l\'explorateur Roald Amundsen pour atteindre le pôle Sud en 1911 ?',
        'https://exemple.com/bateaux_celebres.jpg', CURDATE()),
       (68, 7, 'Quel est le nom du bateau qui a transporté les colons du Mayflower en 1620 ?',
        'https://exemple.com/bateaux_celebres.jpg', CURDATE()),
       (69, 7, 'Quel est le nom du bateau qui a été utilisé par Jacques-Yves Cousteau pour explorer les fonds marins ?',
        'https://exemple.com/bateaux_celebres.jpg', CURDATE()),
       (70, 7,
        'Quel est le nom du navire américain qui a été coulé par les Japonais lors de l\'attaque de Pearl Harbor en 1941 ?',
        'https://exemple.com/bateaux_celebres.jpg', CURDATE());
-- La catastrophe nucléaire de Tchernobyl
INSERT INTO questions (id, id_quiz, question, lien_image, date_creation)
VALUES (71, 8, 'Quand a eu lieu l\'accident nucléaire de Tchernobyl ?', 'https://exemple.com/tchernobyl.jpg',
        CURDATE()),
       (72, 8, 'Quelles ont été les causes de l\'accident nucléaire de Tchernobyl ?',
        'https://exemple.com/tchernobyl.jpg',
        CURDATE()),
       (73, 8, 'Quels ont été les impacts environnementaux de l\'accident nucléaire de Tchernobyl ?',
        'https://exemple.com/tchernobyl.jpg', CURDATE()),
       (74, 8, 'Combien de temps a-t-il fallu pour construire le sarcophage de Tchernobyl ?',
        'https://exemple.com/tchernobyl.jpg', CURDATE()),
       (75, 8, 'Comment le sarcophage de Tchernobyl a-t-il été construit ?', 'https://exemple.com/tchernobyl.jpg',
        CURDATE()),
       (76, 8, 'Quels sont les effets à long terme de l\'exposition aux radiations pour les survivants de Tchernobyl ?',
        'https://exemple.com/tchernobyl.jpg', CURDATE()),
       (77, 8, 'Quel est l\'état actuel de la zone d\'exclusion de Tchernobyl ?', 'https://exemple.com/tchernobyl.jpg',
        CURDATE()),
       (78, 8,
        'Quelles leçons ont été tirées de l\'accident nucléaire de Tchernobyl pour l\'industrie nucléaire mondiale ?',
        'https://exemple.com/tchernobyl.jpg', CURDATE()),
       (79, 8, 'Comment les autorités ont-elles géré la crise après l\'accident nucléaire de Tchernobyl ?',
        'https://exemple.com/tchernobyl.jpg', CURDATE()),
       (80, 8, 'Quels ont été les effets économiques de l\'accident nucléaire de Tchernobyl sur l\'Union soviétique ?',
        'https://exemple.com/tchernobyl.jpg', CURDATE());
-- Les découvertes de la mission Mars Rover
INSERT INTO questions (id, id_quiz, question, lien_image, date_creation)
VALUES (81, 9, 'Quand la mission Mars Rover a-t-elle été lancée ?', 'https://exemple.com/mars_rover.jpg', CURDATE()),
       (82, 9, 'Quel est le nom de la première mission Mars Rover lancée en 1996 ?',
        'https://exemple.com/mars_rover.jpg', CURDATE()),
       (83, 9, 'Combien de missions Mars Rover ont été lancées jusqu’à présent ?', 'https://exemple.com/mars_rover.jpg',
        CURDATE()),
       (84, 9, 'Quel est l’objectif de la mission Mars Rover ?', 'https://exemple.com/mars_rover.jpg', CURDATE()),
       (85, 9, 'Quels types d’instruments le rover utilise-t-il pour étudier la surface de Mars ?',
        'https://exemple.com/mars_rover.jpg', CURDATE()),
       (86, 9, 'Comment la mission Mars Rover collecte-t-elle des échantillons ?', 'https://exemple.com/mars_rover.jpg',
        CURDATE()),
       (87, 9, 'Quel type de roches la mission Mars Rover a-t-elle découvert sur Mars ?',
        'https://exemple.com/mars_rover.jpg', CURDATE()),
       (88, 9, 'Comment les scientifiques étudient-ils les images de la mission Mars Rover ?',
        'https://exemple.com/mars_rover.jpg', CURDATE()),
       (89, 9, 'Quel est le rôle du laser du rover dans la mission Mars Rover ?', 'https://exemple.com/mars_rover.jpg',
        CURDATE()),
       (90, 9, 'Comment la mission Mars Rover peut-elle aider à préparer une future mission habitée sur Mars ?',
        'https://exemple.com/mars_rover.jpg', CURDATE());
-- La révolution des énergies renouvelables
INSERT INTO questions (id, id_quiz, question, lien_image, date_creation)
VALUES (91, 10, 'Quelles sont les principales sources d’énergie renouvelable ?',
        'https://exemple.com/energies_renouvelables.jpg', CURDATE()),
       (92, 10, 'Comment fonctionne une éolienne ?', 'https://exemple.com/eolienne.jpg', CURDATE()),
       (93, 10, 'Quelle est la différence entre l’énergie solaire thermique et photovoltaïque ?',
        'https://exemple.com/energie_solaire.jpg', CURDATE()),
       (94, 10, 'Comment fonctionne une centrale hydroélectrique ?', 'https://exemple.com/hydroelectrique.jpg',
        CURDATE()),
       (95, 10, 'Qu’est-ce qu’un panneau solaire ?', 'https://exemple.com/panneau_solaire.jpg', CURDATE()),
       (96, 10, 'Quelles sont les avantages et les inconvénients de l’énergie éolienne ?',
        'https://exemple.com/eolienne.jpg', CURDATE()),
       (97, 10, 'Comment fonctionne une centrale géothermique ?', 'https://exemple.com/geothermie.jpg', CURDATE()),
       (98, 10, 'Qu’est-ce qu’une pile à combustible ?', 'https://exemple.com/pile_combustible.jpg', CURDATE()),
       (99, 10, 'Quels sont les défis à relever pour une utilisation plus répandue des énergies renouvelables ?',
        'https://exemple.com/defis_energies_renouvelables.jpg', CURDATE()),
       (100, 10, 'Comment peut-on stocker l’énergie produite par des sources renouvelables ?',
        'https://exemple.com/stockage_energie.jpg', CURDATE());
-- Formule 1
INSERT INTO questions (id, id_quiz, question, lien_image, date_creation)
VALUES (101, 11, 'Quelle est la vitesse maximale atteinte en Formule 1 ?', 'https://exemple.com/formule1.jpg',
        CURDATE()),
       (102, 11, 'Combien de titres de champion du monde a remporté Michael Schumacher ?',
        'https://exemple.com/formule1.jpg', CURDATE()),
       (103, 11, 'Quelle est la marque de pneumatiques la plus utilisée en Formule 1 ?',
        'https://exemple.com/formule1.jpg', CURDATE()),
       (104, 11, 'Quelle est la longueur d\'un Grand Prix de Formule 1 ?', 'https://exemple.com/formule1.jpg',
        CURDATE()),
       (105, 11, 'Quelle est la voiture de Formule 1 la plus titrée de l\'histoire ?',
        'https://exemple.com/formule1.jpg', CURDATE()),
       (106, 11, 'Quel est le circuit de Formule 1 le plus long ?', 'https://exemple.com/formule1.jpg', CURDATE()),
       (107, 11, 'Combien de pilotes participent à un Grand Prix de Formule 1 ?', 'https://exemple.com/formule1.jpg',
        CURDATE()),
       (108, 11, 'Quel est le pilote de Formule 1 avec le plus grand nombre de victoires en carrière ?',
        'https://exemple.com/formule1.jpg', CURDATE()),
       (109, 11, 'Quelle est la marque de voiture la plus victorieuse en Formule 1 ?',
        'https://exemple.com/formule1.jpg', CURDATE()),
       (110, 11, 'Quel est le Grand Prix de Formule 1 le plus ancien ?', 'https://exemple.com/formule1.jpg', CURDATE());
-- Olympique Lyonnais
INSERT INTO questions (id, id_quiz, question, lien_image, date_creation)
VALUES (111, 12, 'Quelle est la date de fondation de l''Olympique Lyonnais ?', 'https://exemple.com/ol.jpg', CURDATE()),
       (112, 12, 'Qui est le président actuel de l''Olympique Lyonnais ?', 'https://exemple.com/ol.jpg', CURDATE()),
       (113, 12, 'Combien de fois l''Olympique Lyonnais a-t-il remporté le championnat de France de football ?',
        'https://exemple.com/ol.jpg', CURDATE()),
       (114, 12, 'Quel est le joueur ayant inscrit le plus de buts avec l''Olympique Lyonnais ?',
        'https://exemple.com/ol.jpg', CURDATE()),
       (115, 12, 'Quel est le stade de l''Olympique Lyonnais ?', 'https://exemple.com/ol.jpg', CURDATE()),
       (116, 12, 'Combien de fois l''Olympique Lyonnais a-t-il remporté la Ligue des Champions féminine ?',
        'https://exemple.com/ol.jpg', CURDATE()),
       (117, 12, 'Quel est le surnom de l''Olympique Lyonnais ?', 'https://exemple.com/ol.jpg', CURDATE()),
       (118, 12, 'Quel est le plus grand rival de l''Olympique Lyonnais ?', 'https://exemple.com/ol.jpg', CURDATE()),
       (119, 12, 'Quel est le joueur le plus capé de l''histoire de l''Olympique Lyonnais ?',
        'https://exemple.com/ol.jpg', CURDATE()),
       (120, 12, 'Quel est le record de victoires consécutives en championnat de l''Olympique Lyonnais ?',
        'https://exemple.com/ol.jpg', CURDATE());

# Réponses
INSERT INTO reponses (id, label, is_valid, id_question)
VALUES (1, 'Le perroquet gris du Gabon', 0, 1),
       (2, 'Le corbeau', 1, 1),
       (3, 'Le cacatoès', 0, 1),
       (4, 'La pie', 0, 1);
INSERT INTO reponses (id, label, is_valid, id_question)
VALUES (5, 'Par des chants', 0, 2),
       (6, 'Par des mouvements du corps', 0, 2),
       (7, 'Par des cris', 1, 2),
       (8, 'Par des sécrétions chimiques', 0, 2);
INSERT INTO reponses (id, label, is_valid, id_question)
VALUES (9, 'Il est capable de fabriquer et d’utiliser des outils pour se nourrir', 1, 3),
       (10, 'Il est le plus grand corbeau au monde', 0, 3),
       (11, 'Il peut imiter le langage humain', 0, 3),
       (12, 'Il est capable de voler à une vitesse de plus de 80 km/h', 0, 3);
INSERT INTO reponses (id, label, is_valid, id_question)
VALUES (13, 'Omnivore', 1, 4),
       (14, 'Herbivore', 0, 4),
       (15, 'Carnivore', 0, 4),
       (16, 'Frugivore', 0, 4);
INSERT INTO reponses (id, label, is_valid, id_question)
VALUES (17, 'Ils chassent en groupe pour encercler leur proie', 0, 5),
       (18, 'Ils attendent que la proie soit blessée ou morte', 0, 5),
       (19, 'Ils utilisent des outils pour atteindre leur proie', 1, 5),
       (20, 'Ils capturent principalement des poissons', 0, 5);
INSERT INTO reponses (id, label, is_valid, id_question)
VALUES (21, 'Environ 8 ans', 0, 6),
       (22, 'Environ 15 ans', 0, 6),
       (23, 'Environ 20 ans', 1, 6),
       (24, 'Environ 30 ans', 0, 6);
INSERT INTO reponses (id, label, is_valid, id_question)
VALUES (25, 'En se regroupant en grand nombre pour intimider le prédateur', 0, 7),
       (26, 'En utilisant leur intelligence pour élaborer des stratégies de défense', 1, 7),
       (27, 'En se cachant dans les arbres ou les buissons', 0, 7),
       (28, 'Ils n\'ont pas de méthode particulière pour se protéger', 0, 7);
INSERT INTO reponses (id, label, is_valid, id_question)
VALUES (29, 'Les corbeaux sont associés à la mort dans plusieurs cultures', 0, 8),
       (30, 'Dans la mythologie nordique, le dieu Odin est accompagné de deux corbeaux', 1, 8),
       (31, 'Dans la mythologie grecque, Apollon a été puni en étant transformé en corbeau', 0, 8),
       (32, 'Les corbeaux sont considérés comme des messagers entre vivants et morts', 0, 8);
INSERT INTO reponses (id, label, is_valid, id_question)
VALUES (33, 'Le corbeau freux', 1, 9),
       (34, 'Le corbeau corbivau', 0, 9),
       (35, 'Le grand corbeau', 0, 9),
       (36, 'Le corbeau choucas', 0, 9);
INSERT INTO reponses (id, label, is_valid, id_question)
VALUES (37, 'En modifiant leur comportement alimentaire', 0, 10),
       (38, 'En s\'adaptant à de nouveaux habitats', 1, 10),
       (39, 'En modifiant leur régime alimentaire', 0, 10),
       (40, 'En migrant vers des zones plus favorables', 0, 10);
