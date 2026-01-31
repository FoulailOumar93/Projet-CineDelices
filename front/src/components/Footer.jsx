const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2A1A0A] text-[#FFF3E0] text-center py-4">
      <p className="text-sm">
        © {year} CinéDélices — Tous Droits Réservés
      </p>
    </footer>
  );
};

export default Footer;
