import React from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { useRef } from "react";
import { useGroceryList } from "./GroceryListContext";

export default function EditItemModal({ show, handleClose, item }) {
  const nameRef = useRef(item.name);
  const amountRef = useRef(item.amount);
  const costRef = useRef(item.cost);

  const { foodTypes } = useGroceryList();
  const { editGroceryItem } = useGroceryList();

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      ...item,
      name: nameRef.current.value,
      amount: parseFloat(amountRef.current.value || "1"),
      cost: parseFloat(costRef.current.value || "0"),
    };
    editGroceryItem(newItem);
    handleClose();
  }

  function handleSelect(eventKey, event) {
    event.preventDefault();
    console.log(eventKey);
    const newItem = { ...item, type: parseFloat(eventKey) };
    editGroceryItem(newItem);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label className="me-2">Name</Form.Label>
            <Form.Control
              type="text"
              required
              ref={nameRef}
              defaultValue={item.name}
              name="itemName"
              autoComplete="itemName"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label className="me-2">Amount</Form.Label>
            <Form.Control
              type="number"
              ref={amountRef}
              autoComplete="off"
              step={1}
              min={1}
              defaultValue={item.amount}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="cost">
            <Form.Label className="me-2">Cost Per item</Form.Label>
            <Form.Control
              type="number"
              step={0.01}
              ref={costRef}
              autoComplete="off"
              defaultValue={item.cost}
            />
          </Form.Group>
          <Dropdown onSelect={handleSelect} required>
            <Dropdown.Toggle>
              {foodTypes.find((t) => t.value === item.type)?.label}
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
              Edit
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
