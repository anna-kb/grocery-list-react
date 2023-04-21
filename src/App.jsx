import { useState } from "react";
import { Container, Button, Stack, ProgressBar } from "react-bootstrap";
import GroceryItem from "./GroceryItem";
import { moneyFormatter } from "./Utility";
import AddItemModal from "./AddItemModal";
import { useGroceryList } from "./GroceryListContext";
import SetBudgetModal from "./SetBudgetModal";
import SearchItems from "./SearchItems";

function App() {
  const [showModals, setShowModals] = useState({
    showAddItem: false,
    showBudget: false,
  });
  const { groceryItems } = useGroceryList();
  const { getTotalCost } = useGroceryList();
  const { maxBudget } = useGroceryList();

  function getProgressBarVariant() {
    const ratio = getTotalCost() / maxBudget;

    if (ratio < 0.75) return "primary";
    if (ratio < 0.9) return "warning";
    return "danger";
  }

  function getSortedItems() {
    return groceryItems.sort((a, b) => a.type - b.type);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Grocery List</h1>
          <Button
            variant="primary"
            onClick={() => setShowModals({ ...showModals, showAddItem: true })}
          >
            Add Item
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => setShowModals({ ...showModals, showBudget: true })}
          >
            Set Budget
          </Button>
        </Stack>
        <Stack className="my-4">
          <SearchItems groceryItems={getSortedItems()} />
        </Stack>
        <Stack direction="vertical" className="mt-4 justify-content-between">
          <Stack
            direction="horizontal"
            className="justify-content-between align-items-baseline"
          >
            <div className="me-2">Total Cost:</div>
            <div className="me-1">
              {moneyFormatter(getTotalCost())}{" "}
              <span>{maxBudget > 0 && `/ ${maxBudget}`}</span>
            </div>
          </Stack>
          <div className="mt-1">
            {maxBudget > 0 && (
              <ProgressBar
                min={0}
                max={maxBudget}
                now={getTotalCost()}
                variant={getProgressBarVariant(maxBudget)}
              />
            )}
          </div>
        </Stack>
      </Container>
      <AddItemModal
        show={showModals.showAddItem}
        handleClose={() => setShowModals({ ...showModals, showAddItem: false })}
      />
      <SetBudgetModal
        show={showModals.showBudget}
        handleClose={() => setShowModals({ ...showModals, showBudget: false })}
      />
    </>
  );
}

export default App;
