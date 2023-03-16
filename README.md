# <span style="color:#DC3535">>Projet Big Data<</span>

## <span style="color:#F49D1A">0- Brainstorming </span>
<br>

## <span style="color:#F49D1A">I- Support/Application </span>
 
### <span style="color:#FFE15D"><u>Techno :</u></span>
* Front: Angular<br>
* Back: Python (Flask)<br>
* Hébergement : AWS

### <span style="color:#FFE15D"><u>Interface user :</u></span>

* Choisir un thème
* Lancer un quiz
* Creation compte
    * Item création compte
    * Formulaire infos perso
* Connexion compte
* Mdp oublié
* Contacter admin
    * Fomulaire de contact
    * Signaler question ou réponse fausse
* Exporter template quiz
* Import template quiz

### <span style="color:#FFE15D"><u>Interface Admin :</u></span>

* Ajouter/supprimer quiz (archive ?)
* Ajouter/supprimer user
* Ticket ?

## <span style="color:#F49D1A">II- BDD MySQL sur le cloud
</span>

### <span style="color:#FFE15D"><u>Tables :</u></span>

* <b><span style="color:#73777B">Quiz</span></b>
    * id_quiz | name | id_theme | id_user | state | date_creation 
* <b><span style="color:#73777B">Question</span></b>
    * id_question | id_quiz | question | picture | id_answer | date_creation 
* <b><span style="color:#73777B">User</span></b>
    * id_user | login | password | age | sexe | id_theme_prefere | id_role 
* <b><span style="color:#73777B">Role</span></b>
    * id_role | name_role
* <b><span style="color:#73777B">Theme</span></b>
    * id_theme | name_theme
* <b><span style="color:#73777B">Question_theme</span></b>
    * id_question | id_theme
* <b><span style="color:#73777B">Reponse</span></b>
    * id_reponse | name_question | isValid | id_question
* <b><span style="color:#73777B">Result</span></b>
    * id_result | id_quiz | id_user | score | timestamp

## <span style="color:#F49D1A">III- Dataviz</span>

## <span style="color:#F49D1A">IV- IA</span>

### <span style="color:#FFE15D"><u>Modèle :</u></span>

* ML -> solution 4 :<br>
- données d'entrainement : https://commonvoice.mozilla.org/fr/datasets <br>
- surentrainement d'un modèle complexe type Wav2Vec : https://github.com/facebookresearch/fairseq/blob/main/examples/wav2vec/README.md<br>
- TSD à déterminer en fonction du bruit<br>

Récup les questions --> https://quipoquiz.com/module/sed/quiz/fr/start_quiz.snc?quiz=514<br>
Récup des réponses --> https://quipoquiz.com/module/sed/quiz/fr/answer_question.snc?quiz=514&answer=true&question=16628
