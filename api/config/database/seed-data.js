import { sequelize, User, Media, Recipe, Ingredient } from '../../models/index.js';
import argon2 from 'argon2';

await sequelize.sync({ force: true }); // reset DB

async function seedDatabase() {
  try {
    // --- Users (10) ---
    const userData = [
      { username: 'cinedelices', password: 'Gr0sGourmand2025', role: 'admin', email: 'cine.delices@miam.com' },
      { username: 'emberfox', password: 'hunter2024', role: 'member', email: 'foxyfoxx@gmail.com' },
      { username: 'midnightowl', password: 'secure9876', role: 'member', email: 'oiseaudenuits@hotmail.fr' },
      { username: 'lunalatte', password: 'mocha123', role: 'member', email: 'coffee.break@miam.com' },
      { username: 'ironchef', password: 'bladecook99', role: 'admin', email: 'samuraibarbeuque@oishii.jp' },
      { username: 'spicequeen', password: 'curry2025', role: 'member', email: 'tacospicy@maxichaud.hot' },
      { username: 'breadmaster', password: 'baguette77', role: 'member', email: 'baguettesupreme45@boulan.ger' },
      { username: 'pixelchef', password: '8bitcuisine', role: 'member', email: '8bitcuisine@boop.fr' },
      { username: 'velvetknife', password: 'sharpdish', role: 'admin', email: 'couteau.tire@sharp.com' },
      { username: 'greenleaf', password: 'veganhero', role: 'member', email: 'vegan1sm4ever@gmail.fr' },
    ];

    // hash all passwords
    for (const user of userData) {
      user.password = await argon2.hash(user.password);
    }

    // now bulkCreate
    const users = await User.bulkCreate(userData, { returning: true });


    // --- Media (10) ---
    const media = await Media.bulkCreate([
      {
        title: 'Matrix',
        description: "Programmeur anonyme dans un service administratif le jour, Thomas Anderson devient Neo la nuit venue. Sous ce pseudonyme, il est l'un des pirates les plus recherchés du cyber-espace. À cheval entre deux mondes, Neo est assailli par d'étranges songes et des messages cryptés provenant d'un certain Morpheus. Celui-ci l'exhorte à aller au-delà des apparences et à trouver la réponse à la question qui hante constamment ses pensées : qu'est-ce que la Matrice ?",
        img_url: 'matrix.png',
        release_date: new Date('2022-11-15'),
        category: 'film',
        is_validated: true,
        validated_by: users[0].id,
      },
      {
        title: 'Game of thrones',
        description: "Neuf familles nobles rivalisent pour le contrôle du Trône de Fer dans les sept royaumes de Westeros. Pendant ce temps, des anciennes créatures mythiques oubliées reviennent pour faire des ravages.",
        img_url: 'got.jpg',
        release_date: new Date('2023-03-08'),
        category: 'série',
        is_validated: false,
        validated_by: users[0].id,
      },
      {
        title: 'Le voyage de Chihiro',
        description: "Au cours d'un voyage en voiture, la famille de Chihiro,10 ans, fait une halte dans un parc à thème qui semble abandonné. Ses parents découvrent des mets succulents dans un restaurant et commencent à manger. Ils se retrouvent alors transformés en cochons. Prise de panique, Chihiro s'enfuit et rencontre l'énigmatique Haku, qui lui explique le fonctionnement de l'univers dans lequel elle vient de pénétrer. Pour sauver ses parents, la fillette va devoir faire face à la terrible sorcière Yubaba.",
        img_url: 'chihiro.webp',
        release_date: new Date('2021-07-21'),
        category: 'manga',
        is_validated: true,
        validated_by: users[1].id,
      },
      {
        title: 'La couleur des sentimets',
        description: "Eugenia Skeeter Phelan est de retour dans sa petite ville de Jackson, Mississippi, au début des années 1960, après des études à l'université. Ses amies d'enfance se sont mariées, mais elle ne souhaite rien tant que de devenir écrivain. Elle prend la responsabilité de la chronique ménagère du journal local et, pour se familiariser avec son sujet, dont elle ignore tout, obtient de son amie Elizabeth la permission d'interroger sa domestique noire, Aibileen.",
        img_url: 'lacouleurdessentimets.png',
        release_date: new Date('2020-05-12'),
        category: 'film',
        is_validated: true,
        validated_by: users[4].id,
      },
      {
        title: 'Naruto',
        description: "Naruto (ナルト?) est un shōnen manga écrit et dessiné par Masashi Kishimoto. Naruto est prépublié dans l'hebdomadaire Weekly Shōnen Jump de l'éditeur Shūeisha entre septembre 1999 et novembre 2014. La série a été compilée en 72 tomes. La version française du manga est publiée par Kana entre mars 2002 et novembre 2016.Une adaptation en anime est réalisée par les studios Pierrot et Aniplex et est diffusée sur TV Tokyo du 3 octobre 2002 au 8 février 2007. La seconde partie du récit, renommée Naruto Shippuden lors de son adaptation, est diffusée du 15 février 2007 au 23 mars 2017. L'anime est diffusé en France du 2 janvier 2006 au 7 février 2018 sur Game One, ainsi que sur NT1 et sur Adult Swim depuis la rentrée 2007. En Belgique, elle est diffusée sur RTL Club depuis la rentrée 2008 sur Club RTL. Les épisodes sont également proposés en version originale sous-titrée en français en simulcast sur J-One, et sur les plates-formes Anime Digital Network, Netflix et Prime Video.",
        img_url: 'naruto.png',
        release_date: new Date('2024-09-01'),
        category: 'manga',
        is_validated: true,
        validated_by: users[0].id,
      },
      {
        title: 'Garfield',
        description: "Les aventures de Garfield, le chat le plus paresseux de la Terre et de Jon, son maître simplet mais sympathique. Le matou sarcastique va devoir apprendre à partager sa vie bien tranquille avec un nouveau colocataire, le chien fou Odie. D'abord excédé, il se révèlera par la suite responsable et héroïque.",
        img_url: 'garfield.png',
        release_date: new Date('2019-02-10'),
        category: 'film',
        is_validated: true,
        validated_by: users[2].id,
      },
      {
        title: 'Narnia',
        description: "Le Monde de Narnia ou Les Chroniques de Narnia au Québec est une série de films américains, inspirée par la série de romans Le Monde de Narnia de l'écrivain C. S. Lewis. Cette saga est composée de trois opus : 2005 : Le Monde de Narnia : Le Lion, la Sorcière blanche et l'Armoire magique",
        img_url: 'narnia.jpg',
        release_date: new Date('2023-11-30'),
        category: 'film',
        is_validated: true,
        validated_by: users[3].id,
      },
      {
        title: 'The Bear',
        description: "Un jeune cuisinier qui a travaillé dans les meilleurs restaurants gastronomiques du pays retourne au bercail et retrouve la grisaille de Chicago pour reprendre la sandwicherie de son frère.",
        img_url: 'thebear.jpeg',
        release_date: new Date('2022-06-14'),
        category: 'film',
        is_validated: true,
        validated_by: users[1].id,
      },
      {
        title: 'The Avengers',
        description: "Avengers est une série de films crossovers appartenant à l'univers cinématographique Marvel fondée sur les personnages de comics créés par Stan Lee et Jack Kirby. Elle est composée de quatre opus : Avengers, réalisé par Joss Whedon ; Avengers : L'Ère d'Ultron, réalisé par Joss Whedon ;",
        img_url: 'avenger.jpeg',
        release_date: new Date('2021-12-05'),
        category: 'film',
        is_validated: true,
        validated_by: users[4].id,
      },
      {
        title: 'Seigneur des Anneaux',
        description: "Un jeune et timide hobbit, Frodon Sacquet, hérite d'un anneau magique. Sous ses apparences de simple bijou, il s'agit en réalité d'un instrument de pouvoir absolu qui permettrait à Sauron, le Seigneur des ténèbres, de régner sur la Terre du Milieu et de réduire en esclavage ses peuples. Frodon doit parvenir, avec l'aide de la Communauté de l'Anneau, composée de huit compagnons venus de différents royaumes, jusqu'à la Montagne du Destin pour le détruire.",
        img_url: 'leseigneurdesanneaux.jpeg',
        release_date: new Date('2020-03-20'),
        category: 'film',
        is_validated: true,
        validated_by: users[0].id,
      },
    ], { returning: true });



    // --- Recipes (10) ---
    const recipes = await Recipe.bulkCreate([
      {
        title: 'Lasagne',
        instructions: `
      1. Préchauffez le four à 180°C.
      2. Faites revenir la viande hachée avec l'oignon et l'ail dans une poêle.
      3. Ajoutez la sauce tomate, sel, poivre et laissez mijoter 15 minutes.
      4. Dans un plat à gratin, alternez couches de sauce, feuilles de lasagne et béchamel.
      5. Terminez par une couche de béchamel et parsemez de fromage.
    `,
        time: 50,
        difficulty: 4.5,
        img_url: 'lasagne.jpeg',
        category: 'plat',
        is_validated: true,
        validated_by: users[0].id,
      },
      {
        title: 'Loukoums',
        instructions: `
      1. Faites fondre le chocolat au bain-marie.
      2. Séparez les blancs des jaunes d'œufs. Montez les blancs en neige ferme.
      3. Incorporez délicatement les jaunes au chocolat fondu, puis ajoutez le sucre.
      4. Incorporez ensuite les blancs en neige en soulevant la masse.
      5. Versez dans des moules individuels et laissez prendre au réfrigérateur pendant au moins 2 heures.
    `,
        time: 25,
        difficulty: 6.5,
        img_url: 'Loukoums.jpeg',
        category: 'dessert',
        is_validated: true,
        validated_by: users[0].id,
      },
      {
        title: 'Piccata de poulet',
        instructions: `
      1. Coupez les blancs de poulet en fines escalopes.
      2. Salez, poivrez et farinez légèrement les morceaux.
      3. Faites chauffer l'huile d'olive dans une poêle et faites dorer le poulet des deux côtés.
      4. Ajoutez le jus de citron, le bouillon de volaille et les câpres.
      5. Laissez mijoter quelques minutes jusqu'à ce que la sauce épaississe légèrement.
    `,
        time: 15,
        difficulty: 2,
        img_url: 'Piccatadepoulet.jpeg',
        category: 'entrée',
        is_validated: true,
        validated_by: users[0].id,
      },
      {
        title: 'Shawarma',
        instructions: `
      1. Coupez la viande en fines tranches et faites-la mariner avec les épices, l'ail, le yaourt et le jus de citron pendant au moins 2 heures.
      2. Faites cuire la viande dans une poêle chaude jusqu'à ce qu'elle soit bien dorée.
      3. Réchauffez les pains pita.
      4. Garnissez les pains avec la viande, des légumes frais (tomates, concombres, oignons) et une sauce au yaourt.
      5. Roulez les pains et servez chaud.
    `,
        time: 35,
        difficulty: 5,
        img_url: 'Shawarma.jpeg',
        category: 'plat',
        is_validated: true,
        validated_by: users[4].id,
      },
      {
        title: 'Lembas',
        instructions: `
      1. Préchauffez le four à 180°C.
      2. Mélangez la farine, le sucre, la levure et le sel dans un bol.
      3. Ajoutez le beurre coupé en petits morceaux et travaillez du bout des doigts jusqu'à obtenir une texture sableuse.
      4. Incorporez l'œuf et le lait pour former une pâte homogène.
      5. Étalez la pâte sur une surface farinée, découpez en carrés et enfournez pendant 12-15 minutes jusqu'à ce qu'ils soient dorés.
    `,
        time: 40,
        difficulty: 6,
        img_url: 'Lembas.jpeg',
        category: 'dessert',
        is_validated: false,
        validated_by: users[0].id,
      },
      {
        title: 'Steak Frites',
        instructions: `
        1. Assaisonnez les steaks avec du sel et du poivre.
        2. Faites chauffer une poêle avec un peu d'huile et faites cuire les steaks selon votre préférence (saignant, à point, bien cuit).
        3. Pendant ce temps, épluchez les pommes de terre et coupez-les en fines frites.
        4. Faites-les frire dans de l'huile chaude jusqu'à ce qu'elles soient dorées et croustillantes.
        5. Égouttez les frites sur du papier absorbant, salez-les et servez avec les steaks.
    `,
        time: 40,
        difficulty: 5,
        img_url: 'steakfrites.jpeg',
        category: 'plat',
        is_validated: true,
        validated_by: users[3].id,
      },
      {
        title: 'Ramen',
        instructions: `
      1. Faites cuire les nouilles ramen selon les instructions du paquet, égouttez et réservez.
      2. Dans une casserole, faites chauffer le bouillon de poulet avec la sauce soja, le miso, l'ail et le gingembre.
      3. Ajoutez les légumes (champignons, épinards, maïs) et laissez mijoter quelques minutes.
      4. Dans une poêle, faites cuire la viande de votre choix (porc, poulet) et réservez.
      5. Répartissez les nouilles dans des bols, versez le bouillon chaud par-dessus, ajoutez la viande cuite et garnissez avec un œuf mollet, des oignons verts et des graines de sésame.
    `,
        time: 10,
        difficulty: 1.5,
        img_url: 'ramen.jpeg',
        category: 'entrée',
        is_validated: true,
        validated_by: users[2].id,
      },
      {
        title: 'Onigiri',
        instructions: `
      1. Rincez le riz à l'eau froide jusqu'à ce que l'eau soit claire. Égouttez.
      2. Faites cuire le riz dans une casserole avec l'eau selon les instructions du paquet. Laissez reposer 10 minutes après cuisson.
      3. Humidifiez vos mains avec de l'eau salée pour éviter que le riz ne colle.
      4. Prenez une portion de riz et formez une boule ou un triangle en y insérant une garniture au centre (saumon, umeboshi, thon mayo).
      5. Enveloppez chaque onigiri d'une bande de nori (algue) si désiré et servez.
    `,
        time: 45,
        difficulty: 7,
        img_url: 'onigiri.jpeg',
        category: 'plat',
        is_validated: true,
        validated_by: users[1].id,
      },
      {
        title: 'Lemoncakes',
        instructions: `
      1. Préchauffez le four à 180°C.
      2. Dans un bol, mélangez la farine, le sucre, la levure et le sel.
      3. Ajoutez le beurre fondu, les œufs, le lait et le zeste de citron. Mélangez jusqu'à obtenir une pâte homogène.
      4. Versez la pâte dans des moules à muffins beurrés ou garnis de caissettes en papier.
      5. Enfournez pendant 20-25 minutes jusqu'à ce que les cakes soient dorés et qu'un cure-dent inséré au centre en ressorte propre.
    `,
        time: 50,
        difficulty: 4,
        img_url: 'lemoncakes.jpeg',
        category: 'dessert',
        is_validated: true,
        validated_by: users[0].id,
      },
      {
        title: 'Tarte au Chocolat',
        instructions: `
      1. Préchauffez le four à 180°C.
      2. Étalez la pâte sablée dans un moule à tarte et piquez le fond avec une fourchette.
      3. Faites cuire la pâte à blanc pendant 15 minutes, puis laissez refroidir.
      4. Faites fondre le chocolat avec la crème liquide au bain-marie jusqu'à obtenir une ganache lisse.
      5. Versez la ganache sur le fond de tarte refroidi et laissez prendre au réfrigérateur pendant au moins 2 heures avant de servir.
    `,
        time: 35,
        difficulty: 3.5,
        img_url: 'tarteauchocolat.jpeg',
        category: 'entrée',
        is_validated: false,
        validated_by: users[5].id,
      },
    ], { returning: true });

    // --- Ingredients (19) ---
    const ingredients = await Ingredient.bulkCreate([
      { name: 'Courgette', culinary_profile: 'végétarien', is_validated: true, validated_by: users[0].id },
      { name: 'Carotte', culinary_profile: 'végétarien', is_validated: true, validated_by: users[0].id },
      { name: 'Œuf', culinary_profile: 'salé', is_validated: true, validated_by: users[0].id },
      { name: 'Crème fraîche', culinary_profile: 'salé', is_validated: true, validated_by: users[0].id },
      { name: 'Chocolat noir', culinary_profile: 'sucré', is_validated: true, validated_by: users[0].id },
      { name: 'Sucre en poudre', culinary_profile: 'sucré', is_validated: true, validated_by: users[0].id },
      { name: 'Concombre', culinary_profile: 'végétarien', is_validated: true, validated_by: users[0].id },
      { name: 'Menthe fraîche', culinary_profile: 'amer', is_validated: true, validated_by: users[0].id },
      { name: 'Tomate', culinary_profile: 'végétarien', is_validated: true, validated_by: users[0].id },
      { name: 'Mozzarella', culinary_profile: 'salé', is_validated: true, validated_by: users[0].id },
      { name: 'Mascarpone', culinary_profile: 'sucré', is_validated: true, validated_by: users[0].id },
      { name: 'Café fort', culinary_profile: 'amer', is_validated: true, validated_by: users[0].id },
      { name: 'Pois chiches', culinary_profile: 'végétarien', is_validated: true, validated_by: users[0].id },
      { name: 'Épices curry', culinary_profile: 'amer', is_validated: true, validated_by: users[0].id },
      { name: 'Champignons de Paris', culinary_profile: 'végétarien', is_validated: true, validated_by: users[0].id },
      { name: 'Riz arborio', culinary_profile: 'végétarien', is_validated: true, validated_by: users[0].id },
      { name: 'Cerises fraîches', culinary_profile: 'sucré', is_validated: true, validated_by: users[0].id },
      { name: 'Bouillon de volaille', culinary_profile: 'salé', is_validated: true, validated_by: users[0].id },
      { name: 'Cuisse de poulet', culinary_profile: 'viande', is_validated: false, validated_by: users[0].id},
    ], { returning: true });


    // --- Recipe ⇔ Ingredient associations ---
    await recipes[0].addIngredient(ingredients[0].id, { through: { quantity: 2, unit: 'pièce' } }); // Courgette
    await recipes[0].addIngredient(ingredients[1].id, { through: { quantity: 2, unit: 'pièce' } }); // Carotte
    await recipes[0].addIngredient(ingredients[2].id, { through: { quantity: 3, unit: 'pièce' } }); // Œuf
    await recipes[0].addIngredient(ingredients[3].id, { through: { quantity: 20, unit: 'cl' } });   // Crème fraîche

    await recipes[1].addIngredient(ingredients[4].id, { through: { quantity: 200, unit: 'g' } });   // Chocolat noir
    await recipes[1].addIngredient(ingredients[2].id, { through: { quantity: 3, unit: 'pièce' } }); // Œuf
    await recipes[1].addIngredient(ingredients[5].id, { through: { quantity: 50, unit: 'g' } });    // Sucre

    await recipes[2].addIngredient(ingredients[6].id, { through: { quantity: 2, unit: 'pièce' } }); // Concombre
    await recipes[2].addIngredient(ingredients[7].id, { through: { quantity: 5, unit: 'feuille' } }); // Menthe
    await recipes[2].addIngredient(ingredients[3].id, { through: { quantity: 10, unit: 'cl' } });   // Crème fraîche

    await recipes[3].addIngredient(ingredients[8].id, { through: { quantity: 3, unit: 'pièce' } }); // Tomate
    await recipes[3].addIngredient(ingredients[9].id, { through: { quantity: 200, unit: 'g' } });   // Mozzarella

    await recipes[4].addIngredient(ingredients[11].id, { through: { quantity: 20, unit: 'cl' } });  // Café
    await recipes[4].addIngredient(ingredients[10].id, { through: { quantity: 250, unit: 'g' } });  // Mascarpone
    await recipes[4].addIngredient(ingredients[2].id, { through: { quantity: 3, unit: 'pièce' } }); // Œuf
    await recipes[4].addIngredient(ingredients[5].id, { through: { quantity: 50, unit: 'g' } });    // Sucre

    await recipes[5].addIngredient(ingredients[12].id, { through: { quantity: 400, unit: 'g' } });  // Pois chiches
    await recipes[5].addIngredient(ingredients[13].id, { through: { quantity: 2, unit: 'c.à.s' } }); // Curry
    await recipes[5].addIngredient(ingredients[8].id, { through: { quantity: 2, unit: 'pièce' } }); // Tomate

    await recipes[6].addIngredient(ingredients[8].id, { through: { quantity: 2, unit: 'pièce' } }); // Tomate
    await recipes[6].addIngredient(ingredients[6].id, { through: { quantity: 1, unit: 'pièce' } }); // Concombre
    await recipes[6].addIngredient(ingredients[9].id, { through: { quantity: 100, unit: 'g' } });   // Mozzarella

    await recipes[7].addIngredient(ingredients[14].id, { through: { quantity: 250, unit: 'g' } });  // Champignons
    await recipes[7].addIngredient(ingredients[15].id, { through: { quantity: 200, unit: 'g' } });  // Riz arborio
    await recipes[7].addIngredient(ingredients[3].id, { through: { quantity: 10, unit: 'cl' } });   // Crème fraîche

    await recipes[8].addIngredient(ingredients[16].id, { through: { quantity: 300, unit: 'g' } });  // Cerises
    await recipes[8].addIngredient(ingredients[2].id, { through: { quantity: 2, unit: 'pièce' } }); // Œuf
    await recipes[8].addIngredient(ingredients[5].id, { through: { quantity: 50, unit: 'g' } });    // Sucre

    await recipes[9].addIngredient(ingredients[17].id, { through: { quantity: 50, unit: 'cl' } });  // Bouillon
    await recipes[9].addIngredient(ingredients[14].id, { through: { quantity: 100, unit: 'g' } });  // Champignons
    await recipes[9].addIngredient(ingredients[8].id, { through: { quantity: 1, unit: 'pièce' } }); // Tomate



    // --- Recipe ⇔ Media associations ---

  await recipes[0].addMedias([media[5].id]);
  await recipes[1].addMedias([media[6].id]);
  await recipes[2].addMedias([media[7].id]); 
  await recipes[3].addMedias([media[8].id]); 
  await recipes[4].addMedias([media[9].id]);
  await recipes[5].addMedias([media[0].id]); 
  await recipes[6].addMedias([media[4].id]); 
  await recipes[7].addMedias([media[2].id]); 
  await recipes[8].addMedias([media[1].id]); 
  await recipes[9].addMedias([media[3].id]); 


    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
