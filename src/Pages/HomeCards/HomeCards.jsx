import React from 'react';
import "../HomeCards/HomeCards.css"

const events = [
  { id: 1, date: '07 SEP', title: 'NORTE ROCK 🎸', description: 'AV. PERON Y BASCARY / YERBA BUENA - TUCUMÁN' },
  { id: 2, date: '14 SEP', title: 'FESTIVAL DEL LIMÓM 2024 🍋', description: 'Club Atlético Villa Mitre / Chacabuco 539 - Tafí Viejo'},
  { id: 3, date: '15 SEP', title: 'FESTIVAL DEL LIMÓM 2024 🍋', description: 'Club Atlético Villa Mitre / Chacabuco 539 - Tafí Viejo'},
  { id: 4, date: '05 OCT', title: 'AIR BAG 🎤', description: 'Club Atlético Central Cordoba / Av. Alem 790 – Tucumán' },
  { id: 5, date: '19 OCT', title: 'DESTINO SAN JAVIER - SINFÓNICO 🗣️', description: 'Teatro Mercedes Sorsa / San Martín 479 - Tucumán' },
  { id: 6, date: '08 NOV', title: 'EXPERIENCIA QUEEN 🧑🏻‍🎤', description: 'Teatro Mercedes Sorsa / San Martín 479 - Tucumán' },
  { id: 7, date: '14 DIC', title: 'MARIA BECERRA 💃🏻', description: 'Hipodromo de tucuman / Av. Leguizamo 800 - Tucumán' },
  { id: 8, date: '01 ENE', title: 'PROXIMAMENTE', description: 'PROXIMAMENTE' },
];

const EventCard = ({ date, title, description }) => (
  <div className="event-card">
    <div className="event-date">{date}</div>
    <div className="event-content">
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="event-button">Más información</button>
    </div>
  </div>
);

const EventsSection = () => (
  <section className="events-section">
    <h2>EVENTOS!</h2>
    <div className="events-grid">
      {events.map(event => (
        <EventCard
          key={event.id}
          date={event.date}
          title={event.title}
          description={event.description}
        />
      ))}
    </div>
  </section>
);

export default EventsSection;
