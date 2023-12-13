-- Création de données de test pour notre BDD

BEGIN;


INSERT INTO "menu"
  ("id", "title", "description")
VALUES
  (1, 'Menu { Plat / Boisson / Dessert }', 'Menu complet'),
  (2, 'Menu { Plat / Boisson ou Dessert }', 'Menu a choix'),
  (3, 'Menu { Enfant }', 'Menu pour les petits')
;

INSERT INTO "plat"
  ("id", "title", "description")
VALUES
  (1, 'Fajitas Boeuf', 'Rumsteak de bœuf, oignons et poivrons. Plat à confectionner soi-même, servi avec du fromage râpé, du guacamole et des tortillas.'),
  (2, 'Fajitas Poulet', 'Escalope de poulet mariné aux épices mexicaines, oignons et poivrons. Plat à confectionner soi-même, servi avec du fromage râpé, du guacamole et des tortillas.'),
  (3, 'Burritos poulet', 'Suprême de poulet sauté aux deux poivrons, épices mexicaines, fromage le tout enroulé dans une tortilla.'),
  (4, 'Quesadillas de boeuf', 'Tortilla garnie de viande de bœuf hachée, poivrons rouges et verts, oignons, fromage et épices.'),
  (5, 'Chili cone carne', 'Viande de bœuf hachée, duo de poivrons, haricots rouges, le tout légèrement relevé par des épices mexicaines et servi avec une quenelle de crème fraiche.')
;

INSERT INTO "boisson"
  ("id", "title", "soft")
VALUES
  (1, 'Coca-cola', '1'),
  (2, 'Coca-cola zéro', '1'),
  (3, 'Coca-cola cherry', '1'),
  (4, 'Ice tea', '1'),
  (5, 'Oasis tropical', '1'),
  (6, 'Oasis pomme cassis framboise', '1'),
  (7, 'Corona', '0'),
  (8, 'Desperados', '0'),
  (9, 'Pinacolada', '0')
;

INSERT INTO "dessert"
  ("id", "title")
VALUES
  (1, 'Tiramisu'),
  (2, 'Fruit de saison'),
  (3, 'Cookie double chocolat')
;

INSERT INTO "user"
  ("id", "username", "email", "password", "firstname", "lastname", "adress", "role")
VALUES
  (1, 'MiguelTL', 'Miguel@tacolover.io', '123456', 'Miguel', 'Tacolover', '.', 'Admin'),
  (2, 'ViolaTL', 'Viola@tacolover.io', '54321', 'Viola', 'Tacolover', '.', 'editor'),
  (3, 'JeanDuPuis', 'JeanDuPuis@gmail.com', '56789', 'Jean', 'Du Puis', '25 rue de la base de loisir, 92456 Clachy', 'Signed')
;

INSERT INTO "restaurant"
  ("id", "name", "adress")
VALUES
  (1, 'Taco Lover { La ville du bois }', '35 rue de la Croix Saint-Jacques 91620 La Ville du Bois'),
  (2, 'Taco Lover { Paris }', '6 Bd Poissonnière, 75009 Paris'),
  (3, 'Taco Lover { Nantes }', '13 Rue de Gorges, 44000 Nantes')
;


INSERT INTO "tag" 
  ("id", "name", "color")
VALUES 
  (1, 'PROMO', '#FF00FF'),
  (2, 'BEST', '#000005'),
  (3, 'SPICY', '#00FF00')
;

-- INSERT INTO 'card_has_tag' 
--   (card_id, tag_id) 
-- VALUES 
--   (1, 3), -- Savon eco-friendly
--   (1, 1), -- Savon urgent
--   (5, 1), -- Nourrir le chat : urgent
--   (4, 2)
-- ;


-- SELECT setval('list_id_seq', (SELECT MAX(id) from 'list'));
-- SELECT setval('card_id_seq', (SELECT MAX(id) from 'card'));
-- SELECT setval('tag_id_seq', (SELECT MAX(id) from 'tag'));


COMMIT;
