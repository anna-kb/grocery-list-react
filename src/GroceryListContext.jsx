import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "./useLocalStorage";
import { clamp } from "./Utility";
import { Prev } from "react-bootstrap/esm/PageItem";

const GroceryListContext = React.createContext();

export function useGroceryList() {
  return useContext(GroceryListContext);
}

export const GroceryListProvider = ({ children }) => {
  const [groceryItems, setGroceryItems] = useLocalStorage("groceryItems", []);
  const [foodTypes, setFoodTypes] = useState([
    {
      label: "Fruits and Vegetables",
      value: 1,
    },
    {
      label: "Meat and Seafood",
      value: 2,
    },
    {
      label: "Pantry",
      value: 3,
    },
    {
      label: "Dairy and Eggs",
      value: 4,
    },
    {
      label: "Other",
      value: 5,
    },
  ]);
  const [maxBudget, setMaxBudget] = useState(300);

  function addGroceryItem(name, amount, cost, type) {
    setGroceryItems((prevGroceryItems) => {
      const index = prevGroceryItems.findIndex(
        (foodItem) =>
          foodItem.name === name &&
          foodItem.cost == cost &&
          foodItem.type == type
      );
      if (index !== -1) {
        prevGroceryItems[index].amount = amount;
        return [...prevGroceryItems];
      }

      return [...prevGroceryItems, { id: uuidV4(), name, amount, cost, type }];
    });
  }

  function deleteGroceryItem(id) {
    setGroceryItems((prevGroceryItems) => {
      return prevGroceryItems.filter((foodItem) => foodItem.id !== id);
    });
  }

  function editGroceryItem(updatedItem) {
    const index = groceryItems.findIndex((item) => item.id == updatedItem.id);
    const updatedList = [...groceryItems];
    updatedList[index] = updatedItem;
    setGroceryItems(updatedList);

    return groceryItems;
  }

  function getTotalCost() {
    return groceryItems.reduce(
      (total, item) => total + item.cost * item.amount,
      0
    );
  }

  function setNewMaxBudget(amount) {
    setMaxBudget(clamp(amount, 0, amount));
  }

  return (
    <GroceryListContext.Provider
      value={{
        groceryItems,
        foodTypes,
        maxBudget,
        addGroceryItem,
        editGroceryItem,
        deleteGroceryItem,
        getTotalCost,
        setNewMaxBudget,
      }}
    >
      {children}
    </GroceryListContext.Provider>
  );
};
