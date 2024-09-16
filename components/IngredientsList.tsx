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
    { name: "Пасуљ са сувим месом", carbsPer100g: 20 },
    { name: "Ђувеч", carbsPer100g: 10 },
    { name: "Месо - Фаширана шницла", carbsPer100g: 17 },
    { name: "Супа са кнедлама", carbsPer100g: 5 },
    { name: "Мусака од кромпира", carbsPer100g: 14 },
    { name: "Супа пилећа", carbsPer100g: 3 },
    { name: "Месо - печена пилетина", carbsPer100g: 3 },
    { name: "Боранија са јунетином", carbsPer100g: 7 },
  ];
  
  export default ingredientsList;