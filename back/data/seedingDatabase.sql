-- Création de données de test pour notre BDD

BEGIN;


INSERT INTO "menu"
  ("title", "description", "price_in_euro", "img")
VALUES
  ('Menu { Plat / Boisson / Dessert }', 'Menu complet', '.', '.'),
  ('Menu { Plat / Boisson ou Dessert }', 'Menu a choix', '.', '.'),
  ('Menu { Enfant }', 'Menu pour les petits', '.', '.')
;

INSERT INTO "plat"
  ("title", "description", "price_in_euro", "img")
VALUES
  ('Fajitas Boeuf', 'Rumsteak de bœuf, oignons et poivrons. Plat à confectionner soi-même, servi avec du fromage râpé, du guacamole et des tortillas.', '.', '.'),
  ('Fajitas Poulet', 'Escalope de poulet mariné aux épices mexicaines, oignons et poivrons. Plat à confectionner soi-même, servi avec du fromage râpé, du guacamole et des tortillas.', '.', '.'),
  ('Burritos poulet', 'Suprême de poulet sauté aux deux poivrons, épices mexicaines, fromage le tout enroulé dans une tortilla.', '.', '.'),
  ('Quesadillas de boeuf', 'Tortilla garnie de viande de bœuf hachée, poivrons rouges et verts, oignons, fromage et épices.', '.', '.'),
  ('Chili cone carne', 'Viande de bœuf hachée, duo de poivrons, haricots rouges, le tout légèrement relevé par des épices mexicaines et servi avec une quenelle de crème fraiche.', '.', '.')
;

INSERT INTO "drink"
  ("title", "soft", "price_in_euro", "img")
VALUES
  ('Coca-cola', '1', '.', '.'),
  ('Coca-cola zéro', '1', '.', '.'),
  ('Coca-cola cherry', '1', '.', '.'),
  ('Ice tea', '1', '.', '.'),
  ('Oasis tropical', '1', '.', '.'),
  ('Oasis pomme cassis framboise', '1', '.', '.'),
  ('Corona', '0', '.', '.'),
  ('Desperados', '0', '.', '.'),
  ('Pinacolada', '0', '.', '.')
;

INSERT INTO "dessert"
  ("title", "price_in_euro", "img")
VALUES
  ('Tiramisu', '.', '.'),
  ('Fruit de saison', '.', '.'),
  ('Cookie double chocolat', '.', '.'),
  ('Compote de pomme', '.', '.'),
  ('Compote de poire', '.', '.')
;

INSERT INTO "user"
  ("username", "email", "password", "firstname", "lastname", "address", "role")
VALUES
  ('MiguelTL', 'Miguel@tacolover.io', '123456', 'Miguel', 'Tacolover', '.', 'Admin'),
  ('ViolettaTL', 'Violetta@tacolover.io', '54321', 'Violetta', 'Tacolover', '.', 'Editor'),
  ('JeanDuPuis', 'JeanDuPuis@gmail.com', '56789', 'Jean', 'Du Puis', '25 rue de la base de loisir, 92456 Clachy', 'registered')
;

INSERT INTO "restaurant"
  ("name", "address")
VALUES
  ('Taco Lover { La ville du bois }', '35 rue de la Croix Saint-Jacques 91620 La Ville du Bois'),
  ('Taco Lover { Paris }', '6 Bd Poissonnière, 75009 Paris'),
  ('Taco Lover { Nantes }', '13 Rue de Gorges, 44000 Nantes')
;


INSERT INTO "tag" 
  ("name", "color")
VALUES 
  ('PROMO', '#FF00FF'),
  ('BEST', '#000005'),
  ('SPICY', '#00FF00')
;

INSERT INTO "menu_has_plat" 
  (menu_id, plat_id) 
VALUES 
  (1, 1), -- Menu complet 
  (1, 2), -- Menu complet 
  (1, 3), -- Menu complet 
  (1, 4), -- Menu complet 
  (1, 5), -- Menu complet 
  (2, 1), -- Menu a choix
  (2, 2), -- Menu a choix
  (2, 3), -- Menu a choix
  (2, 4), -- Menu a choix
  (2, 5), -- Menu a choix
  (3, 4) -- Menu enfant
;

INSERT INTO "menu_has_drink" 
  (menu_id, drink_id) 
VALUES 
  (1, 1), -- Menu complet 
  (1, 2), -- Menu complet 
  (1, 3), -- Menu complet 
  (1, 4), -- Menu complet 
  (1, 5), -- Menu complet 
  (1, 6), -- Menu complet 
  (1, 7), -- Menu complet 
  (1, 8), -- Menu complet 
  (1, 9), -- Menu complet 
  (2, 1), -- Menu a choix
  (2, 2), -- Menu a choix
  (2, 3), -- Menu a choix
  (2, 4), -- Menu a choix
  (2, 5), -- Menu a choix
  (2, 6), -- Menu a choix
  (2, 7), -- Menu a choix
  (2, 8), -- Menu a choix
  (2, 9), -- Menu a choix
  (3, 1), -- Menu enfant
  (3, 2), -- Menu enfant
  (3, 3), -- Menu enfant
  (3, 4), -- Menu enfant
  (3, 5), -- Menu enfant
  (3, 6) -- Menu enfant
;

INSERT INTO "menu_has_dessert" 
  (menu_id, dessert_id) 
VALUES 
  (1, 1), -- Menu complet 
  (1, 2), -- Menu complet 
  (1, 3), -- Menu complet 
  (1, 4), -- Menu complet 
  (1, 5), -- Menu complet 
  (2, 1), -- Menu a choix
  (2, 2), -- Menu a choix
  (2, 3), -- Menu a choix
  (2, 4), -- Menu a choix
  (2, 5), -- Menu a choix
  (3, 4), -- Menu enfant
  (3, 5) -- Menu enfant
;

INSERT INTO "plat_has_tag" 
  (plat_id, tag_id) 
VALUES 
  (2, 2), --
  (3, 3), --
  (4, 1), --
  (5, 3) --
;

SELECT setval('menu_id_seq', (SELECT MAX(id) from "menu")); 
SELECT setval('drink_id_seq', (SELECT MAX(id) from "drink")); 
SELECT setval('dessert_id_seq', (SELECT MAX(id) from "dessert")); 
SELECT setval('plat_id_seq', (SELECT MAX(id) from "plat"));
SELECT setval('restaurant_id_seq', (SELECT MAX(id) from "restaurant")); 
SELECT setval('tag_id_seq', (SELECT MAX(id) from "tag")); 
SELECT setval('user_id_seq', (SELECT MAX(id) from "user")); 

COMMIT;
