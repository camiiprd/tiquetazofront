import React, { useState, useEffect } from 'react';
import "../../Pages/HomeCards/HomeCards.css";
import PropTypes from 'prop-types';

const apiEventUrl = 'http://localhost:4000/api/eventos'; // URL de la API de eventos

const EventCard = ({ date, title, description, imageUrl, price, addToCart }) => {
  return (
    <div className="event-card">
      <img src={imageUrl} alt={title} className="img-fluid event-image" />
      <div className="event-content">
        <h2>{date}</h2>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Precio: ${price}</p>
        {/* El botón "COMPRAR" llama a addToCart cuando se presiona */}
        <button className="event-button" onClick={() => addToCart({ _id: Math.random(), title, price })}>
          COMPRAR
        </button>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,  // Asegurarse de que addToCart es una función pasada como prop
};

const EventsSection = ({ addToCart }) => {
  const [events, setEvents] = useState([]);

  // Obtener los eventos de la API
  const fetchEvents = async () => {
    try {
      const response = await fetch(apiEventUrl);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error al obtener los eventos:", error);
    }
  };

  useEffect(() => {
    fetchEvents(); // Llamar a la función para traer los eventos al cargar el componente
  }, []);

  return (
    <section className="events-section">
      <h2>EVENTOS</h2>
      <div className="events-grid">
        {events.map(event => (
          <EventCard
            key={event._id}
            date={new Date(event.date).toLocaleDateString()}
            title={event.title}
            description={event.description}
            imageUrl={event.image}
            price={event.price}
            addToCart={addToCart}  // Pasamos la función addToCart a EventCard
          />
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
