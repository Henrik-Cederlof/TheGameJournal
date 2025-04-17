import IGDBGames from "../components/IGDBGames";

const Games = () => {
  return (
    <div className="container mx-auto px-4 mt-40">
      {/* Rubrik och beskrivning */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Games</h1>
        <p className="text-lg text-gray-600">
          Explore a wide variety of games below.
        </p>
      </div>

      {/* Spelrutnät */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <IGDBGames />
      </div>
    </div>
  );
};

export default Games;