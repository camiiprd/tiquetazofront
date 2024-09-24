import React from 'react';
import "../../Pages/HomeCards/HomeCards.css"

const events = [
  /*{ id: 1, date: '07 SEP', title: 'NORTE ROCK 🎸', description: 'AV. PERON Y BASCARY / YERBA BUENA - TUCUMÁN', },
  { id: 2, date: '14 SEP', title: 'FESTIVAL DEL LIMÓM 2024 🍋', description: 'Club Atlético Villa Mitre / Chacabuco 539 - Tafí Viejo', },
  { id: 3, date: '15 SEP', title: 'FESTIVAL DEL LIMÓM 2024 🍋', description: 'Club Atlético Villa Mitre / Chacabuco 539 - Tafí Viejo'},
  { id: 4, date: '05 OCT', title: 'AIR BAG 🎤', description: 'Club Atlético Central Cordoba / Av. Alem 790 – Tucumán' },
  { id: 5, date: '19 OCT', title: 'DESTINO SAN JAVIER - SINFÓNICO 🗣️', description: 'Teatro Mercedes Sorsa / San Martín 479 - Tucumán' },
  { id: 6, date: '08 NOV', title: 'EXPERIENCIA QUEEN 🧑🏻‍🎤', description: 'Teatro Mercedes Sorsa / San Martín 479 - Tucumán' },
  { id: 7, date: '14 DIC', title: 'MARIA BECERRA 💃🏻', description: 'Hipodromo de tucuman / Av. Leguizamo 800 - Tucumán' },
  { id: 8, date: '01 ENE', title: 'PROXIMAMENTE', description: 'PROXIMAMENTE' },*/
  { id: 9, date: '7 y 8 de Diciembre', title: 'BUENOS AIRES TRAP', description: 'PARQUE DE LA CIUDA Av. Cruz y Escalada Buenos Aires CABA',imageUrl:' https://prod-cms-static.ticketek.com.ar/sites/default/files/images/show-header/bat_960_x_400_copia.jpg' },
  { id: 10, date: '17 de mayo año 2025', title: 'REIK', description: 'Quality Arena Av. Cruz Roja N° 200 Córdoba Córdoba',imageUrl:'https://prod-cms-static.ticketek.com.ar/sites/default/files/images/show-header/reik_sq.png' },
  { id: 11, date: '1 al 3 de Noviembre ', title: 'EXPO CANNABIS', description: 'La Rural Av. Sarmiento 2704 Capital Federal',imageUrl:'https://prod-cms-static.ticketek.com.ar/sites/default/files/images/show-header/can960.png' },
  { id: 12, date: '27 de Octubre', title: 'HARRY POTTER Y LA PIEDRA FILOSOFAL EN CONCIERTO', description: 'Quality Arena Av. Cruz Roja N° 200 Córdoba Córdoba',imageUrl:'https://prod-cms-static.ticketek.com.ar/sites/default/files/images/show-header/harryp_q_s.png' },
  { id: 13, date: '11 y 12 de Octubre ', title: 'JORGE ROJAS', description: 'Quality Arena Av. Cruz Roja N° 200 Córdoba Córdoba',imageUrl:'https://prod-cms-static.ticketek.com.ar/sites/default/files/images/show-header/jr-s.png' },
  { id: 14, date: '9 de Noviembre', title: 'LOS SALIERIS DE CHARLY', description: 'Teatro El Círculo, de Rosario Laprida 1223 Santa Fé Rosario',imageUrl:'https://prod-cms-static.ticketek.com.ar/sites/default/files/images/show-header/salieris960.png' },
  { id: 15, date: '19 de Octubre', title: 'CIRO Y LOS PERSAS', description: 'Ex Rural Bv. Oroño 2493 Santa Fe Rosario ',imageUrl:'https://prod-cms-static.ticketek.com.ar/sites/default/files/images/show-header/cir960_0.png' },
  { id: 16, date: '2 de octubre', title: 'TRIBUTO A FREDDIE MERCURY', description: 'Teatro El Círculo, de Rosario Laprida 1223 Santa Fé Rosario',imageUrl:'https://prod-cms-static.ticketek.com.ar/sites/default/files/images/show-header/fred960_0.png' },
  
];

const EventCard = ({ date, title, description ,imageUrl}) => (
  <div className="event-card ">
   <img src={imageUrl} alt={title} className=" img-fluid event-image" />
       <div className="event-content">
      <h2>{date}</h2>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="event-button">COMPRAR</button>
    </div>
  </div>
);

const EventsSection = () => (
  <section className="events-section">
    <h2>EVENTOS</h2>
    <div className="events-grid">
      {events.map(event => (
        <EventCard
          key={event.id}
          date={event.date}
          title={event.title}
          description={event.description}
          imageUrl={event.imageUrl}  
        />
      ))}
    </div>
  </section>
);

export default EventsSection;
