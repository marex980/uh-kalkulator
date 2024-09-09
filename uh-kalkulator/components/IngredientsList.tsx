export interface Ingredient {
    name: string;
    carbsPer100g: number;
  }
  
  const ingredientsList: Ingredient[] = [
    { name: "Јабука", carbsPer100g: 14 },
    { name: "Банана", carbsPer100g: 23 },
    { name: "Пиринач", carbsPer100g: 28 },
    { name: "Пилетина", carbsPer100g: 0 },
    { name: "Салата", carbsPer100g: 20 },
  ];
  
  export default ingredientsList;