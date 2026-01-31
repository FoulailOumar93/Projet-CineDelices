import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFFBEF]">

      {/* VAGUE JAUNE – PLUS COMPACTE */}
      <div className="
        absolute top-0 left-0
        w-[85%] md:w-[55%]
        h-[300px] md:h-[420px]
        bg-[#FFE69D]
        rounded-br-[100%]
        z-0
      " />

      {/* CONTENU */}
      <div className="
        container mx-auto px-4
        relative z-10
        flex flex-col md:flex-row
        items-center justify-between
        py-14 md:py-20
      ">

        {/* LOGO */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src="/images/logo.svg"
            alt="Logo CinéDélices"
            className="
              w-40 sm:w-56 md:w-72
              -rotate-6
              drop-shadow-xl
              hover:scale-105
              transition-transform duration-300
            "
          />
        </div>

        {/* TEXTE */}
        <div className="w-full md:w-1/2 text-center md:text-left">

          <h1 className="
            text-4xl sm:text-5xl lg:text-6xl
            font-bold font-fredoka
            text-[#E8650A]
            mb-5 leading-tight
          ">
            Les Films Se Mangent.
          </h1>

          <p className="
            text-lg sm:text-xl
            text-[#E8650A]
            font-fredoka
            opacity-90
            mb-8
            max-w-lg
            mx-auto md:mx-0
          ">
            Découvre et recrée les recettes inspirées
            de films, séries et mangas cultes.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            {/* CTA PRINCIPAL */}
            <Link
              to="/recipes"
              className="
                bg-[#E8650A]
                text-white
                font-fredoka font-bold
                py-3 px-8
                rounded-full
                shadow-md
                hover:bg-[#d15806]
                transition
              "
            >
              🍽️ Voir les recettes
            </Link>

            {/* CTA SECONDAIRE */}
            <Link
              to="/memberPage"
              className="
                text-[#E8650A]
                font-fredoka font-bold
                py-3 px-8
                rounded-full
                border border-[#E8650A]
                hover:bg-[#FFE69D]
                transition
              "
            >
              + Proposer une recette
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
