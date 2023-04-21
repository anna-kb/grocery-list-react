import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { Form, FormControl, Stack } from "react-bootstrap";
import GroceryItem from "./GroceryItem";
import { levenshtein, jaccard, splitString } from "./Utility";

export default function SearchItems({ groceryItems }) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (query === "") return groceryItems;

    const tempFiltered = [];

    //Splitting the query search terms into required and fuzzy words
    const requiredQueryWords = splitString(query).filter((w) => {
      return w.startsWith('"') && w.endsWith('"');
    });
    requiredQueryWords.forEach(
      (w, i) => (requiredQueryWords[i] = w.replace(/"/g, "").toLowerCase())
    );

    const queryWords = splitString(query).filter((w) => {
      return !requiredQueryWords.includes(w);
    });
    queryWords.forEach((w, i) => (queryWords[i] = w.toLowerCase()));

    //separating the groceryItems by word, and associating it back to the index
    const groceryItemsSplit = [];
    groceryItems.forEach((item, i) => {
      const split = splitString(item.name);
      ~split.forEach((word) => {
        groceryItemsSplit.push({ name: word.toLowerCase(), index: i });
      });
    });

    // Simply look to see if any item includes the query
    tempFiltered.push(
      ...groceryItems.filter((item) => {
        return item.name
          .toLowerCase()
          .includes(query.replace(/"/g, "").trim().toLowerCase());
      })
    );

    //Check if any of the words also can potentially be a match
    groceryItemsSplit.forEach((item) => {
      queryWords.forEach((w) => {
        if (levenshtein(item.name, w) < 3 && jaccard(item.name, w) > 0.7) {
          if (!tempFiltered.includes(groceryItems[item.index]))
            tempFiltered.push(groceryItems[item.index]);
        }
      });
    });

    //check the list of required Words and eliminate the items that do not include them
    if (requiredQueryWords.length !== 0) {
      const requiredItems = [];
      groceryItemsSplit.forEach((item) => {
        if (requiredQueryWords.includes(item.name.toLowerCase())) {
          requiredItems.push(groceryItems[item.index]);
        }
      });

      return tempFiltered.filter((item) => requiredItems.includes(item));
    }

    return tempFiltered;
  }, [groceryItems, query]);

  function handleChange(e) {
    setQuery((prevQuery) => {
      return e.target.value;
    });
  }

  function getFilteredItems() {
    return filteredItems;
  }

  return (
    <div>
      <Form>
        <FormControl
          className="my-sm-4"
          type="text"
          name="searchBar"
          autoComplete="off"
          value={query}
          placeholder={"Search for an item here..."}
          onChange={handleChange}
        ></FormControl>
      </Form>
      <Stack className="my-sm-4">
        {getFilteredItems().map((item) => (
          <GroceryItem key={item.id} item={item} />
        ))}
      </Stack>
    </div>
  );
}
