-- Création de données de test pour notre BDD

BEGIN;


INSERT INTO "menu"
  ("id", "title", "description", "price", "img")
VALUES
  (1, 'Menu { Plat / Boisson / Dessert }', 'Menu complet', '€', '.'),
  (2, 'Menu { Plat / Boisson ou Dessert }', 'Menu a choix', '€', '.'),
  (3, 'Menu { Enfant }', 'Menu pour les petits', '€', '.')
;

INSERT INTO "plat"
  ("id", "title", "description", "price", "img")
VALUES
  (1, 'Fajitas Boeuf', 'Rumsteak de bœuf, oignons et poivrons. Plat à confectionner soi-même, servi avec du fromage râpé, du guacamole et des tortillas.', '€', '.'),
  (2, 'Fajitas Poulet', 'Escalope de poulet mariné aux épices mexicaines, oignons et poivrons. Plat à confectionner soi-même, servi avec du fromage râpé, du guacamole et des tortillas.', '€', '.'),
  (3, 'Burritos poulet', 'Suprême de poulet sauté aux deux poivrons, épices mexicaines, fromage le tout enroulé dans une tortilla.', '€', '.'),
  (4, 'Quesadillas de boeuf', 'Tortilla garnie de viande de bœuf hachée, poivrons rouges et verts, oignons, fromage et épices.', '€', '.'),
  (5, 'Chili cone carne', 'Viande de bœuf hachée, duo de poivrons, haricots rouges, le tout légèrement relevé par des épices mexicaines et servi avec une quenelle de crème fraiche.', '€', '.')
;

INSERT INTO "drink"
  ("id", "title", "soft", "price", "img")
VALUES
  (1, 'Coca-cola', '1', '€', '.'),
  (2, 'Coca-cola zéro', '1', '€', '.'),
  (3, 'Coca-cola cherry', '1', '€', '.'),
  (4, 'Ice tea', '1', '€', '.'),
  (5, 'Oasis tropical', '1', '€', '.'),
  (6, 'Oasis pomme cassis framboise', '1', '€', '.'),
  (7, 'Corona', '0', '€', '.'),
  (8, 'Desperados', '0', '€', '.'),
  (9, 'Pinacolada', '0', '€', '.')
;

INSERT INTO "dessert"
  ("id", "title", "price", "img")
VALUES
  (1, 'Tiramisu', '€', '.'),
  (2, 'Fruit de saison', '€', '.'),
  (3, 'Cookie double chocolat', '€', '.'),
  (4, 'Compote de pomme', '€', '.'),
  (5, 'Compote de poire', '€', '.')
;

INSERT INTO "user"
  ("id", "username", "email", "password", "firstname", "lastname", "address", "role")
VALUES
  (1, 'MiguelTL', 'Miguel@tacolover.io', '123456', 'Miguel', 'Tacolover', '.', 'Admin'),
  (2, 'ViolettaTL', 'Violetta@tacolover.io', '54321', 'Violetta', 'Tacolover', '.', 'Editor'),
  (3, 'JeanDuPuis', 'JeanDuPuis@gmail.com', '56789', 'Jean', 'Du Puis', '25 rue de la base de loisir, 92456 Clachy', 'registered')
;

INSERT INTO "restaurant"
  ("id", "name", "address")
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
