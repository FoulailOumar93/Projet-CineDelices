import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-orange-dark mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Non Trouvée</h2>
          <p className="text-gray-600 mb-8">La Page Que Vous Cherchez N'Existe Pas.</p>
          <a 
            href="/" 
            className="bg-orange-dark text-white px-6 py-3 rounded hover:bg-orange-clear transition-colors"
          >
            Retour À L'Accueil
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;