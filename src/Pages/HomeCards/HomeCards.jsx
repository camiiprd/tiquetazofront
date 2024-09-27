// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import "../../Pages/HomeCards/HomeCards.css";
import PropTypes from 'prop-types'; 
const apiEventUrl = 'http://localhost:4000/api/eventos'; // URL de la API de eventos

const EventCard = ({ date, title, description ,imageUrl}) => (
  <div className="event-card">
    <img src={imageUrl} alt={title} className="img-fluid event-image" />
    <div className="event-content">
      <h2>{date}</h2>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="event-button">COMPRAR</button>
    </div>
  </div>
);

EventCard.propTypes = {
  date: PropTypes.string.isRequired,        // date debe ser un string
  title: PropTypes.string.isRequired,       // title debe ser un string
  description: PropTypes.string.isRequired, // description debe ser un string
  imageUrl: PropTypes.string.isRequired,    // imageUrl debe ser un string
};

const EventsSection = () => {
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
            key={event._id}  // Cambié de 'id' a '_id' para ajustarlo a MongoDB
            date={new Date(event.date).toLocaleDateString()} // Formatea la fecha
            title={event.title}
            description={event.description}
            imageUrl={event.image}  // Asegúrate de que la URL de la imagen esté correctamente almacenada
          />
        ))}
      </div>
    </section>
  );
};

export default EventsSection;