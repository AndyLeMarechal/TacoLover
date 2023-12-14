import {Drink, Dessert, Menu, Plat, Restaurant, Tag, User, MenuHasPlat, MenuHasDrink, MenuHasDessert, PlatHasTag } from "../src/models/index.js";
import { sequelize } from "../src/models/sequelize-client.js";

createTables();


async function createTables() {
  console.log("🔄 TacoLover tables creation started...");

  console.log("\t- Dropping existing tables first");
  await Drink.drop({ cascade: true });
  await Dessert.drop({ cascade: true });
  await Menu.drop({ cascade: true });
  await Plat.drop({ cascade: true });
  await Restaurant.drop({ cascade: true });
  await Tag.drop({ cascade: true });
  await User.drop({ cascade: true });
  await MenuHasPlat.drop({ cascade: true });
  await MenuHasDrink.drop({ cascade: true });
  await MenuHasDessert.drop({ cascade: true });
  await PlatHasTag.drop({ cascade: true });

  console.log("\t- Creating new tables");
  await Drink.sync();
  await Dessert.sync();
  await Menu.sync();
  await Plat.sync();
  await Restaurant.sync();
  await Tag.sync();
  await User.sync();
  await MenuHasPlat.sync();
  await MenuHasDrink.sync();
  await MenuHasDessert.sync();
  await PlatHasTag.sync();
  

  console.log("✅ TacoLover tables created with success !");
  
  console.log("🧹 Clean up by closing database connexion\n");
  await sequelize.close();
}