import { Container, CloseButton, Col, Row } from "react-bootstrap";
import { moneyFormatter } from "./Utility";
import { useGroceryList } from "./GroceryListContext";
import "./styles.css";
import EditItemModal from "./EditItemModal";
import { useState } from "react";

export default function GroceryItem({ item }) {
  const { deleteGroceryItem } = useGroceryList();
  const [showModal, setShowModal] = useState(false);
  const [hover, setHover] = useState(false);

  const containerButtonStyle = {
    backgroundColor: getBackGroundColor(),
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
    transform: hover ? "scale(1.015)" : "scale(1)",
  };

  const handleRemoveClick = () => {
    deleteGroceryItem(item.id);
  };

  function getBackGroundColor() {
    switch (item.type) {
      case 1:
        return "#A0e49c";
      case 2:
        return "#E4b59c";
      case 3:
        return "#9cc7e4";
      case 4:
        return "#E4de9c";
      case 5:
        return "#B1cbc6";
      default:
        return "#f2f2f2";
    }
  }

  function getCost() {
    return item.amount * item.cost;
  }

  return (
    <div>
      <Container
        className="grocery-container"
        style={containerButtonStyle}
        onClick={() => setShowModal(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Row>
          <Col style={{ overflow: "hidden" }}>{item.name}</Col>
          <Col xs={2} style={{ overflow: "hidden" }}>
            {item.amount}
          </Col>
          <Col xs={2} style={{ overflow: "hidden" }}>
            {item.cost != 0 && `at ${moneyFormatter(item.cost)} each`}
          </Col>
          <Col xs={2} style={{ overflow: "hidden" }}>
            {item.cost != 0 && moneyFormatter(getCost())}
          </Col>
          <Col xs={1} style={{ overflow: "hidden" }}>
            <CloseButton onClick={handleRemoveClick} />
          </Col>
        </Row>
      </Container>
      <EditItemModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        item={item}
      />
    </div>
  );
}
