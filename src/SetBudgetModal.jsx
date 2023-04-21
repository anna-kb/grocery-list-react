import React from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { useGroceryList } from "./GroceryListContext";
import { useRef } from "react";

export default function SetBudgetModal({ show, handleClose }) {
  const budgetRef = useRef();
  const { setNewMaxBudget } = useGroceryList();
  const { maxBudget } = useGroceryList();

  function handleSubmit(e) {
    e.preventDefault();
    setNewMaxBudget(budgetRef.current.value);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton> Set Maximum Budget</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="budget">
            <Form.Label className="me-2">Max Budget</Form.Label>
            <Form.Control
              type="number"
              name="budget"
              autoComplete="off"
              ref={budgetRef}
              defaultValue={maxBudget}
              step={0.01}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Set Budget
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
