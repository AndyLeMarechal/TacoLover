import {Drink, Dessert, Menu, Plat, Restaurant, Tag, User } from "../src/models/index.js";
import { sequelize } from "../src/models/sequelize-client.js";

seedDatabase();


async function seedDatabase() {
  console.log("🔄 TacoLover seeding started...");

 

  // Create Menu
  const menu1 = await Menu.create(
    { title: 'Menu { Plat / Boisson / Dessert }', description: 'Menu complet', price:'€', img: '.' });

  const menu2 = await Menu.create(
    { title: 'Menu { Plat / Boisson ou Dessert }', description: 'Menu a choix', price:'€', img: '.' });

  const menu3 = await Menu.create(
    { title: 'Menu { Enfant }', description:'Menu pour les petits', price: '€', img: '.' });


  // Create Plat
  const plat1 = await Plat.create(
    {title: 'Fajitas Boeuf', description: 'Rumsteak de bœuf, oignons et poivrons. Plat à confectionner soi-même, servi avec du fromage râpé, du guacamole et des tortillas.', price:'€', img: '.'});

  const plat2 = await Plat.create(
    {title: 'Fajitas Poulet', description: 'Escalope de poulet mariné aux épices mexicaines, oignons et poivrons. Plat à confectionner soi-même, servi avec du fromage râpé, du guacamole et des tortillas.', price:'€', img: '.'});

  const plat3 = await Plat.create(    
    {title: 'Burritos poulet', description: 'Suprême de poulet sauté aux deux poivrons, épices mexicaines, fromage le tout enroulé dans une tortilla.', price:'€', img: '.'});

  const plat4 = await Plat.create( 
    {title: 'Quesadillas de boeuf', description: 'Tortilla garnie de viande de bœuf hachée, poivrons rouges et verts, oignons, fromage et épices.', price:'€', img: '.'});

  const plat5 = await Plat.create( 
    {title: 'Chili cone carne', description: 'Viande de bœuf hachée, duo de poivrons, haricots rouges, le tout légèrement relevé par des épices mexicaines et servi avec une quenelle de crème fraiche.', price:'€', img: '.'});


  // Create Drink
  const drink1 = await Drink.create(
    {title: 'Coca-cola', soft: '1', price:'€', img: '.'});

  const drink2 = await Drink.create(
    {title: 'Coca-cola zéro', soft: '1', price:'€', img: '.'});

  const drink3 = await Drink.create(
    {title: 'Coca-cola cherry', soft: '1', price:'€', img: '.'});

  const drink4 = await Drink.create(
    {title: 'Ice tea', soft: '1', price:'€', img: '.'});

  const drink5 = await Drink.create(
    {title: 'Oasis tropical', soft: '1', price:'€', img: '.'});

  const drink6 = await Drink.create(
    {title: 'Oasis pomme cassis framboise', soft: '1', price:'€', img: '.'});

  const drink7 = await Drink.create(
    {title: 'Corona', soft: '0', price:'€', img: '.'});

  const drink8 = await Drink.create(
    {title: 'Desperados', soft: '0', price:'€', img: '.'});

  const drink9 = await Drink.create(
    {title: 'Pinacolada', soft: '0', price:'€', img: '.'});


  // Create Dessert
  const dessert1 = await Dessert.create(
    {title: 'Tiramisu', price:'€', img: '.'});

  const dessert2 = await Dessert.create(
    {title: 'Fruit de saison', price:'€', img: '.'});

  const dessert3 = await Dessert.create(
    {title: 'Cookie double chocolat', price:'€', img: '.'});

  const dessert4 = await Dessert.create(
    {title: 'Compote de pomme', price:'€', img: '.'});

  const dessert5 = await Dessert.create(
    {title: 'Compote de poire', price:'€', img: '.'});


  // Create User
  await User.bulkCreate([
    {username: 'MiguelTL', email: 'Miguel@tacolover.io', password: '123456', firstname:'Miguel', lastname: 'Tacolover', address: '.', role: 'Admin'},

    {username: 'ViolettaTL', email: 'Violetta@tacolover.io', password: '54321', firstname:'Violetta', lastname: 'Tacolover', address: '.', role: 'Editor'},

    {username: 'JeanDuPuis', email: 'JeanDuPuis@gmail.com', password: '56789', firstname:'Jean', lastname: 'Du Puis', address: '25 rue de la base de loisir, 92456 Clachy', role: 'registered'}]);


  // Create User
  await Restaurant.bulkCreate([

    {name: 'Taco Lover { La ville du bois }', address: '35 rue de la Croix Saint-Jacques 91620 La Ville du Bois'},


    {name: 'Taco Lover { Paris }', address: '6 Bd Poissonnière, 75009 Paris'},


    {name: 'Taco Lover { Nantes }', address: '13 Rue de Gorges, 44000 Nantes'}]);

  // Create Tags
  const promoTag = await Tag.create({ name: 'PROMO',       color: '#FF00FF' });
  const bestProductTag   = await Tag.create({ name: 'BEST PRODUCT',    color: '#000000' });
  const spicyTag    = await Tag.create({ name: 'SPICY', color: '#00FF00' });

  // Add Plat to Menu
  await MenuHasPlat(menu1.id, plat1.id);

  await MenuHasPlat(menu1.id, plat2.id);

  await MenuHasPlat(menu1.id, plat3.id);

  await MenuHasPlat(menu1.id, plat4.id);

  await MenuHasPlat(menu1.id, plat5.id);

  await MenuHasPlat(menu2.id, plat1.id);

  await MenuHasPlat(menu2.id, plat2.id);

  await MenuHasPlat(menu2.id, plat3.id);

  await MenuHasPlat(menu2.id, plat4.id);

  await MenuHasPlat(menu2.id, plat5.id);

  await MenuHasPlat(menu3.id, plat4.id);


  //Add Drink to Menu
  await MenuHasDrink(menu1.id, drink1.id);
  await MenuHasDrink(menu1.id, drink2.id);
  await MenuHasDrink(menu1.id, drink3.id);
  await MenuHasDrink(menu1.id, drink4.id);
  await MenuHasDrink(menu1.id, drink5.id);
  await MenuHasDrink(menu1.id, drink6.id);
  await MenuHasDrink(menu1.id, drink7.id);
  await MenuHasDrink(menu1.id, drink8.id);
  await MenuHasDrink(menu1.id, drink9.id);

  await MenuHasDrink(menu2.id, drink1.id);
  await MenuHasDrink(menu2.id, drink2.id);
  await MenuHasDrink(menu2.id, drink3.id);
  await MenuHasDrink(menu2.id, drink4.id);
  await MenuHasDrink(menu2.id, drink5.id);
  await MenuHasDrink(menu2.id, drink6.id);
  await MenuHasDrink(menu2.id, drink7.id);
  await MenuHasDrink(menu2.id, drink8.id);
  await MenuHasDrink(menu2.id, drink9.id);

  await MenuHasDrink(menu3.id, drink1.id);
  await MenuHasDrink(menu3.id, drink2.id);
  await MenuHasDrink(menu3.id, drink3.id);
  await MenuHasDrink(menu3.id, drink4.id);
  await MenuHasDrink(menu3.id, drink5.id);
  await MenuHasDrink(menu3.id, drink6.id);


  // Add Dessert to Menu
  await MenuHasDessert(menu1.id, dessert1.id);
  await MenuHasDessert(menu1.id, dessert2.id);
  await MenuHasDessert(menu1.id, dessert3.id);
  await MenuHasDessert(menu1.id, dessert4.id);
  await MenuHasDessert(menu1.id, dessert5.id);

  await MenuHasDessert(menu2.id, dessert1.id);
  await MenuHasDessert(menu2.id, dessert2.id);
  await MenuHasDessert(menu2.id, dessert3.id);
  await MenuHasDessert(menu2.id, dessert4.id);
  await MenuHasDessert(menu2.id, dessert5.id);

  await MenuHasDessert(menu3.id, dessert4.id);
  await MenuHasDessert(menu3.id, dessert5.id);


  // Add Tag to Plat
  await platHasTag(plat2.id, bestProductTag.id);
  await platHasTag(plat3.id, spicyTag.id);
  await platHasTag(plat4.id, promoTag.id);
  await platHasTag(plat5.id, spicyTag.id);

  console.log("✅ TacoLover seed done with success !");
  
  console.log("🧹 Clean up by closing database connexion");
  await sequelize.close();
}

async function MenuHasPlat(menuId, platId) {
  const menu = await Menu.findOne({where: {id: menuId}});
  await menu.addPlat(platId);
}

async function MenuHasDrink(menuId, drinkId) {
  const menu = await Menu.findOne({ where: { id: menuId }});
  await menu.addDrink(drinkId);
}

async function MenuHasDessert(menuId, dessertId) {
  const menu = await Menu.findOne({ where: { id: menuId }});
  await menu.addDessert(dessertId);
}

async function platHasTag(platId, TagId) {
  const plat = await Plat.findOne({ where: { id: platId }});
  await plat.addTag(TagId);
}
