export interface Ingredient {
    name: string;
    carbsPer100g: number;
  }
  
  const ingredientsList: Ingredient[] = [
    { name: "Чорба - парадајз без резанаца", carbsPer100g: 4 },
    { name: "Резанци са сиром и јајима", carbsPer100g: 28 },
    { name: "Супа Агро без резанаца", carbsPer100g: 0 },
    { name: "Месо - батак/карабатак", carbsPer100g: 0 },
    { name: "Сатараш", carbsPer100g: 7 },
    { name: "Хлеб - парче", carbsPer100g: 15 },
    { name: "Купус Сладак са јунетином", carbsPer100g: 6 },
    { name: "Чорба - крем", carbsPer100g: 5 },
    { name: "Месо - печење", carbsPer100g: 0 },
    { name: "Поврће мешано", carbsPer100g: 7 },
    { name: "Салата", carbsPer100g: 5 },
    { name: "Ћуфте у парадајз сосу", carbsPer100g: 8 },
    { name: "Колач", carbsPer100g: 50 },
  ];
  
  export default ingredientsList;