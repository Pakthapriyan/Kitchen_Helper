import React, { useState } from "react";

const API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [preference, setPreference] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearch(ingredient);
    setMeals([]);
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}${ingredient}`);
      const data = await res.json();
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
        setError("No recipes found. Try different ingredients.");
      }
    } catch {
      setError("Failed to fetch recipes. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100 px-4 py-8 md:px-10 md:py-14 flex flex-col items-center">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-orange-700 drop-shadow-md mb-3">
          Taylor's Kitchen Helper
        </h1>
        <p className="text-lg text-amber-700">Find easy recipes based on what you have!</p>
      </header>

      <form
        className="w-full flex flex-col md:flex-row items-center gap-4 max-w-3xl mb-12 bg-white p-6 md:p-8 rounded-xl shadow-md"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Enter ingredient(s)..."
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="flex-1 px-5 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 outline-none text-gray-700 mb-2 md:mb-0"
        />
        <input
          type="number"
          min="1"
          placeholder="Max cook time (min)"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
          className="w-36 px-5 py-3 rounded-lg border border-amber-200 text-gray-700 mb-2 md:mb-0"
        />
        <select
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          className="w-40 px-5 py-3 rounded-lg border border-amber-200 text-gray-700 mb-2 md:mb-0"
        >
          <option value="">Any taste</option>
          <option value="Spicy">Spicy</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Healthy">Healthy</option>
        </select>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow transition mb-2 md:mb-0"
        >
          {loading ? "Searching..." : "Find Recipes"}
        </button>
      </form>

      {error && <div className="text-red-600 text-center mb-6">{error}</div>}

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-6xl mx-auto">
  {meals.length > 0 &&
    meals.map((meal) => (
      <div
        key={meal.idMeal}
        className="bg-white rounded-xl shadow-md border border-orange-100 hover:scale-100 transition p-20 mx-auto flex flex-col items-center text-center w-72"
      >
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-44 h-44 object-cover rounded-lg mb-4"
          loading="lazy"
        />
        <h2 className="text-lg font-semibold mb-2 text-orange-700">
          {meal.strMeal}
        </h2>
        <a
          href={`https://www.themealdb.com/meal/${meal.idMeal}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-700 hover:underline font-medium"
        >
          View Recipe
        </a>
      </div>
    ))}
</section>


      {meals.length === 0 && !loading && !error && search && (
        <p className="text-center text-gray-600 mt-10">
          No meals found for: <span className="font-semibold">{search}</span>
        </p>
      )}
    </div>
  );
}

export default App;
