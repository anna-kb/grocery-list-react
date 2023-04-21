import React from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { useRef, useState } from "react";
import { useGroceryList } from "./GroceryListContext";

export default function AddItemModal({ show, handleClose }) {
  const nameRef = useRef();
  const [type, setType] = useState(0);
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [amount, setAmount] = useState(1);
  const [autoSet, setAutoSet] = useState(false);

  const { addGroceryItem } = useGroceryList();
  const { foodTypes } = useGroceryList();
  const { groceryItems } = useGroceryList();

  function handleSubmit(e) {
    e.preventDefault();

    addGroceryItem(
      nameRef.current.value,
      parseFloat(amount || "1"),
      parseFloat(cost || "0"),
      type === 0 ? 5 : type
    );

    handleSelfClose();
  }

  const handleFocus = (event) => {
    event.target.placeholder = "";
  };

  function handleSelect(eventKey, event) {
    event.preventDefault();
    console.log(eventKey);
    setType(parseFloat(eventKey));
  }

  function handleSelfClose() {
    setType(0);
    setName("");
    setCost(0);
    setAmount(1);
    handleClose();
  }

  function handleNameChange(e) {
    const inputValue = e.target.value;
    setName(inputValue);

    const namedItem = groceryItems.find(
      (item) => item.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (namedItem) {
      setCost(namedItem.cost);
      setAmount(namedItem.amount);
      setType(namedItem.type);
      setAutoSet(true);
    } else if (autoSet) {
      setCost(0);
      setAmount(1);
      setType(5);
      setAutoSet(false);
    }
  }

  return (
    <Modal show={show} onHide={handleSelfClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Grocery Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label className="me-2">Name</Form.Label>
            <Form.Control
              type="text"
              required
              ref={nameRef}
              defaultValue={name}
              name="itemName"
              autoComplete="itemName"
              placeholder="Apples, chicken, cereal..."
              onFocus={handleFocus}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label className="me-2">Amount</Form.Label>
            <Form.Control
              type="number"
              //  ref={amountRef}
              autoComplete="off"
              step={1}
              min={1}
              placeholder={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="cost">
            <Form.Label className="me-2">Cost Per item</Form.Label>
            <Form.Control
              type="number"
              step={0.01}
              //ref={costRef}
              autoComplete="off"
              placeholder={0}
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </Form.Group>
          <Dropdown onSelect={handleSelect} required>
            <Dropdown.Toggle>
              {type === 0
                ? "Food Type"
                : foodTypes.find((t) => t.value === type)?.label}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {foodTypes.map((type) => (
                <Dropdown.Item key={type.value} eventKey={type.value}>
                  {type.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
