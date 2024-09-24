import React from 'react';
import './MerchCards.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const merchItems = [
  {
    id: 1,
    title: 'Camiseta',
    description: 'Camiseta de algodón con logo estampado.',
    price: '$20',
    image: 'camiseta.jpg',
  },
  {
    id: 2,
    title: 'Gorra',
    description: 'Gorra ajustable con logo bordado.',
    price: '$15',
    image: 'gorra.jpg',
  },
  {
    id: 3,
    title: 'Taza',
    description: 'Taza de cerámica con diseño exclusivo.',
    price: '$10',
    image: 'taza.jpg',
  },
];

const MerchCards = () => {
  return (
    <Container>
      <Row>
        {merchItems.map((item) => (
          <Col md={4} key={item.id} className="mb-4">
            <Card className="merch-card">
              <Card.Img variant="top" src={item.image} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text className="price">{item.price}</Card.Text>
                <Button variant="primary">Comprar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MerchCards;
