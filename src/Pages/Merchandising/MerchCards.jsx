import React from "react";
import "./MerchCards.css";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const merchItems = [
  {
    id: 1,
    title: "Camiseta",
    description: "Camiseta de algodón con logo.",
    price: "$20",
    image:
      "https://acdn.mitiendanube.com/stores/402/355/products/ciro-281-95e19d81d66b40e3ac16733798408667-640-0.jpeg",
  },
  {
    id: 2,
    title: "Gorra",
    description: "Gorra ajustable con logo bordado.",
    price: "$15",
    image: "https://http2.mlstatic.com/D_952208-MLA78086262299_072024-O.jpg",
  },
  {
    id: 3,
    title: "Taza",
    description: "Taza de cerámica con diseño exclusivo.",
    price: "$10",
    image:
      "https://http2.mlstatic.com/D_Q_NP_2X_858454-MLA78085401617_072024-T.webp",
  },
  {
    id: 4,
    title: "Camiseta",
    description: "Camiseta de algodón con logo.",
    price: "$20",
    image:
      "https://static.wixstatic.com/media/5854b3_94468b2cc18e40ceba7282c448634bb7~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg",
  },
  {
    id: 5,
    title: "Gorra",
    description: "Gorra ajustable con logo bordado.",
    price: "$15",
    image:
      "https://acdn.mitiendanube.com/stores/422/826/products/g11-99fb8cd00844377a8d17099133985007-640-0.jpg",
  },
  {
    id: 6,
    title: "Taza",
    description: "Taza de cerámica con diseño exclusivo.",
    price: "$10",
    image:
      "https://dehoynopasa.com.ar/storage/2023/09/Divididos_02N_11zon-scaled.webp",
  },
  {
    id: 7,
    title: "Camiseta",
    description: "Camiseta de algodón con logo.",
    price: "$20",
    image:
      "https://acdn.mitiendanube.com/stores/402/355/products/la-renga-8921-41850e47e51280f60116893877339610-640-0.jpg",
  },
  {
    id: 8,
    title: "Gorra",
    description: "Gorra ajustable con logo bordado.",
    price: "$15",
    image:
      "https://acdn.mitiendanube.com/stores/405/662/products/gorra-la-renga1-5706612e61df8a1d1716497636164436-640-0.jpg",
  },
  {
    id: 9,
    title: "Taza",
    description: "Taza de cerámica con diseño exclusivo.",
    price: "$10",
    image: "https://http2.mlstatic.com/D_659825-MLA77007715016_062024-O.jpg",
  },
];

const MerchCards = () => {
  return (
    <Container>
      <Row>
        {merchItems.map((item) => (
          <Col xs={12} sm={6} md={4} className="mt-4 mb-4" key={item.id}>
            <Card className="merch-card">
              <Card.Img variant="top" src={item.image} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text className="price">{item.price}</Card.Text>
                <div className="buy-button">
                  <Button variant="primary">Comprar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MerchCards;
