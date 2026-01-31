const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cdBeige">
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-cdOrange mb-6 font-fredoka">
          À Propos De CinéDélices
        </h1>

        <div className="max-w-4xl text-gray-700 space-y-6 leading-relaxed text-lg">
          <p>
            Bienvenue sur <strong>CinéDélices</strong>, une plateforme qui
            rassemble deux passions universelles : le cinéma et la cuisine.
          </p>

          <p>
            L’objectif du projet est de proposer des recettes inspirées de films
            et de séries, afin d’offrir une expérience immersive qui va au-delà
            du simple visionnage.
          </p>

          <p>
            Chaque recette est pensée comme un lien entre une œuvre et un plat,
            permettant aux utilisateurs de prolonger l’émotion du cinéma à
            travers la gastronomie.
          </p>

          <p className="font-semibold text-cdOrange">
            Merci de faire partie de l’aventure CinéDélices 🍿🍽️
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
