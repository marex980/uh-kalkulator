'use client'

import { useEffect, useState } from "react";
import ingredientsList, { Ingredient } from "../components/IngredientsList"; // Import the list

// Extend Ingredient to include grams and carbAmount
interface SelectedIngredient extends Ingredient {
  grams: number;
  carbAmount: number;
}

const Home: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<
    SelectedIngredient[]
  >([]);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const [grams, setGrams] = useState<number>(100);
  const [currentCarbAmount, setCurrentCarbAmount] = useState<number>(100);

  // Ensure the component only renders after it has mounted on the client
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Automatically update carb calculation and total carbs when grams input changes
  useEffect(() => {
    if (selectedIngredient && grams > 0) {
      const carbAmount = (selectedIngredient.carbsPer100g * grams) / 100;
      setCurrentCarbAmount(carbAmount);

      // Calculate total carbs including the current input before adding it to the list
      const total =
        selectedIngredients.reduce(
          (sum, ingredient) => sum + ingredient.carbAmount,
          0
        ) + carbAmount;
      setTotalCarbs(total);
    } else {
      setCurrentCarbAmount(0);
    }
  }, [grams, selectedIngredient, selectedIngredients]);

  const handleAddIngredient = () => {
    if (selectedIngredient && grams > 0) {
      const newIngredient: SelectedIngredient = {
        ...selectedIngredient,
        grams,
        carbAmount: currentCarbAmount,
      };

      setSelectedIngredients([...selectedIngredients, newIngredient]);

      // Clear the input fields after adding the ingredient
      setSelectedIngredient(null);
      setGrams(0);
      setCurrentCarbAmount(0);
    }
  };

  const handleDeleteIngredient = (index: number) => {
    const ingredientToRemove = selectedIngredients[index];
    const updatedTotal = totalCarbs - ingredientToRemove.carbAmount;
    setTotalCarbs(updatedTotal);
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setSelectedIngredients([]);
    setTotalCarbs(0);
  };

  if (!hasMounted) {
    return null; // Avoid rendering the component server-side
  }

  return (
    <main className="text-center m-auto p-4">
      <h1 className="text-xl font-bold mb-4">Kalkulator Ugljenih hidrata</h1>
      <div>
        <label htmlFor="ingredient" className="block mb-2">
          Izaberi namirnicu
        </label>
        <select
          id="ingredient"
          className="text-black border p-2 mb-4"
          value={selectedIngredient?.name || ""}
          onChange={(e) => {
            const selected = ingredientsList.find(
              (ingredient) => ingredient.name === e.target.value
            );
            setSelectedIngredient(selected || null);
          }}
        >
          <option value="">-- Izaberi namirnicu --</option>
          {ingredientsList
            .sort((a, b) => a.name.localeCompare(b.name)) // Sort the list alphabetically
            .map((ingredient) => (
              <option key={ingredient.name} value={ingredient.name}>
                {ingredient.name}
              </option>
            ))}
        </select>

        {selectedIngredient && (
          <>
            <label htmlFor="grams" className="block mb-2">
              Unesi grame
            </label>
            <input
              type="number"
              id="grams"
              className="text-black border p-2 mb-4"
              value={grams}
              onChange={(e) => setGrams(Number(e.target.value))}
            />
            <p>
              Ugljenih hidtrata u {grams}g {selectedIngredient.name}:{" "}
              {currentCarbAmount.toFixed(2)}g
            </p>
          </>
        )}

        <button className="bg-blue-500 text-white p-2 mt-2" onClick={handleAddIngredient}>
          Dodaj namirnicu
        </button>
      </div>

      <ul className="mt-4 text-left">
        {selectedIngredients.map((ingredient, index) => (
          <li key={index} className="mb-2">
            {ingredient.name} - {ingredient.grams}g (
           <span className="text-xl font-bold"> {ingredient.carbAmount.toFixed(2)}g ugljenih hidrata</span>)
            <button
              className="bg-red-500 text-white ml-4 p-1"
              onClick={() => handleDeleteIngredient(index)}
            >
              Obrisi
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-left border-t-2 py-4">
        <strong>Ukupno ugljenih hidrata: <span className={"text-3xl"}>{totalCarbs.toFixed(2)}</span>g</strong>
      </div>

      <button
        className="bg-gray-500 text-white mt-4 p-2"
        onClick={handleClearAll}
      >
        Obrisi sve
      </button>
    </main>
  );
};

export default Home;
