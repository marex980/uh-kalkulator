'use client';

import { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from '@apollo/client';

// GraphQL queries and mutations
const GET_INGREDIENTS = gql`
  query GetIngredients {
    ingredients {
      id
      name
      carbsPer100g
    }
  }
`;

const ADD_INGREDIENT = gql`
  mutation AddIngredient($name: String!, $carbsPer100g: Float!) {
    addIngredient(name: $name, carbsPer100g: $carbsPer100g) {
      id
      name
      carbsPer100g
    }
  }
`;

// const DELETE_INGREDIENT = gql`
//   mutation DeleteIngredient($id: Int!) {
//     deleteIngredient(id: $id)
//   }
// `;

interface SelectedIngredient {
  id: number;
  name: string;
  carbsPer100g: number;
  grams: number;
  carbAmount: number;
}

const Home: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [selectedIngredient, setSelectedIngredient] = useState<{ id: number; name: string; carbsPer100g: number } | null>(null);
  const [grams, setGrams] = useState<number>(100);
  const [currentCarbAmount, setCurrentCarbAmount] = useState<number>(100);

  //const { loading, error, data, refetch } = useQuery(GET_INGREDIENTS);
  const { loading, error, data, refetch } = useQuery<{ ingredients: { id: number; name: string; carbsPer100g: number }[] }>(GET_INGREDIENTS);

  const [addIngredientMutation] = useMutation(ADD_INGREDIENT);
  //const [deleteIngredientMutation] = useMutation(DELETE_INGREDIENT);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (selectedIngredient && grams > 0) {
      const carbAmount = (selectedIngredient.carbsPer100g * grams) / 100;
      setCurrentCarbAmount(carbAmount);

      const total = selectedIngredients.reduce(
        (sum, ingredient) => sum + ingredient.carbAmount,
        0
      ) + carbAmount;
      setTotalCarbs(total);
    } else {
      setCurrentCarbAmount(0);
    }
  }, [grams, selectedIngredient, selectedIngredients]);

  const handleAddIngredient = async () => {
    if (selectedIngredient && grams > 0) {
      try {
        // Call the GraphQL mutation to add the ingredient to the database
        await addIngredientMutation({
          variables: {
            name: selectedIngredient.name,
            carbsPer100g: selectedIngredient.carbsPer100g,
          },
        });

        // Refetch the ingredients to get the updated list
        await refetch();

        const newIngredient: SelectedIngredient = {
          ...selectedIngredient,
          grams,
          carbAmount: currentCarbAmount,
        };

        setSelectedIngredients([...selectedIngredients, newIngredient]);
        setSelectedIngredient(null);
        setGrams(100);
        setCurrentCarbAmount(0);
      } catch (error) {
        console.error('Error adding ingredient:', error);
      }
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

  if (!hasMounted || loading) return null;
  if (error) return <p>Error loading ingredients</p>;

  return (
    <main className="text-center m-auto p-4 max-w-4xl">
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
            if (data?.ingredients) { // Add this check to ensure data is not undefined
              const selected = data.ingredients.find(
                (ingredient: { name: string }) => ingredient.name === e.target.value
              );
              setSelectedIngredient(selected || null);
            }
          }}
        >
          <option value="">-- Izaberi namirnicu --</option>
          {data?.ingredients
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((ingredient: { id: number; name: string }) => (
              <option key={ingredient.id} value={ingredient.name}>
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
              Ugljenih hidrata u {grams}g {selectedIngredient.name}:{" "}
              {currentCarbAmount.toFixed(2)}g
            </p>
          </>
        )}

        <button className="bg-blue-500 text-white p-2 mt-2" onClick={handleAddIngredient}>
          Dodaj namirnicu
        </button>
      </div>

      <ul className="mt-4 text-left border-t-2">
        {selectedIngredients.map((ingredient, index) => (
          <li key={index} className="mb-2">
            {ingredient.name} - {ingredient.grams}g (
            <span className="text-xl font-bold">{ingredient.carbAmount.toFixed(2)}g ugljenih hidrata</span>)
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
        <strong>UKUPNO UGLJENIH HIDRATA: <span className={"text-3xl"}>{totalCarbs.toFixed(2)}g</span></strong>
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
