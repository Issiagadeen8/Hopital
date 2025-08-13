# Documentation de l'API REST - Gestion des tâches hospitalières

## Authentification

### POST /api/auth/register
- Inscription d'un utilisateur (admin, docteur, patient)
- Body JSON :
  - nom (string, requis)
  - prenom (string, requis)
  - email (string, requis)
  - password (string, requis)
  - role (string, requis : 'admin', 'docteur', 'patient')
- Réponse : utilisateur créé

### POST /api/auth/login
- Connexion d'un utilisateur
- Body JSON :
  - email (string, requis)
  - password (string, requis)
- Réponse : token JWT et infos utilisateur

---

## Patients

### POST /api/patients
- Créer un patient
- Headers : Authorization: Bearer <token>
- Body JSON :
  - nom (string, requis)
  - prenom (string, requis)
  - dateDeNaissance (date, requis)
- Réponse : patient créé

### GET /api/patients
- Lister tous les patients
- Headers : Authorization: Bearer <token>
- Réponse : liste des patients

### GET /api/patients/:id
- Détail d'un patient
- Headers : Authorization: Bearer <token>
- Réponse : patient

### PUT /api/patients/:id
- Modifier un patient
- Headers : Authorization: Bearer <token>
- Body JSON : champs à modifier
- Réponse : patient modifié

### DELETE /api/patients/:id
- Supprimer un patient
- Headers : Authorization: Bearer <token>
- Réponse : confirmation

---

## Docteurs

### POST /api/doctors
- Créer un docteur
- Headers : Authorization: Bearer <token>
- Body JSON :
  - nom (string, requis)
  - prenom (string, requis)
  - specialite (string, requis)
  - email (string, requis)
  - telephone (string, optionnel)
  - dateNaissance (date, optionnel)
- Réponse : docteur créé

### GET /api/doctors
- Lister tous les docteurs
- Headers : Authorization: Bearer <token>
- Réponse : liste des docteurs

### GET /api/doctors/:id
- Détail d'un docteur
- Headers : Authorization: Bearer <token>
- Réponse : docteur

### PUT /api/doctors/:id
- Modifier un docteur
- Headers : Authorization: Bearer <token>
- Body JSON : champs à modifier
- Réponse : docteur modifié

### DELETE /api/doctors/:id
- Supprimer un docteur
- Headers : Authorization: Bearer <token>
- Réponse : confirmation

---

## Tâches

### POST /api/taches
- Créer une tâche
- Headers : Authorization: Bearer <token>
- Body JSON :
  - titre (string, requis)
  - description (string, optionnel)
  - statut (string, optionnel : 'en attente', 'en cours', 'terminée')
  - patient (ObjectId, requis)
  - docteur (ObjectId, requis)
- Réponse : tâche créée

### GET /api/taches
- Lister toutes les tâches
- Headers : Authorization: Bearer <token>
- Réponse : liste des tâches (avec patient et docteur)

### GET /api/taches/:id
- Détail d'une tâche
- Headers : Authorization: Bearer <token>
- Réponse : tâche (avec patient et docteur)

### PUT /api/taches/:id
- Modifier une tâche
- Headers : Authorization: Bearer <token>
- Body JSON : champs à modifier
- Réponse : tâche modifiée

### DELETE /api/taches/:id
- Supprimer une tâche
- Headers : Authorization: Bearer <token>
- Réponse : confirmation

---

## Sécurité
- Toutes les routes (sauf /auth/register et /auth/login) nécessitent un token JWT dans l'en-tête Authorization.
- Le token s'obtient via la route /api/auth/login.

---

## Exemple d'en-tête Authorization
```
Authorization: Bearer <votre_token_jwt>
```

---

## Contact
Pour toute question, contactez l'équipe de développement.
