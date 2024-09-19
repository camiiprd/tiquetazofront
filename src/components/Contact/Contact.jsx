import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faUser, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import "../Contact/Contact.css"

const ContactPage = () => {
  return (
    <div className="container">
      <div className="box-info">
        <h1>CONTÁCTATE CON NOSOTROS</h1>
        <div className="data">
          <p><FontAwesomeIcon icon={faPhone} /> 3813028005</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> Tiquetazo!@gmail.com</p>
          <p><FontAwesomeIcon icon={faLocationDot} /> San juan 300 - San Miguel de Tucumán</p>
        </div>
        <div className="links">
          <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
        </div>
      </div>
      <form>
        <div className="input-box">
          <input type="text" placeholder="Nombre y apellido" required />
         
        </div>
        <div className="input-box">
          <input type="email" required placeholder="Correo electrónico" />
          
        </div>
        <div className="input-box">
          <input type="text" placeholder="Asunto" required  />
          
        </div>
        <div className="input-box">
          <textarea placeholder="Escribe tu mensaje..." required ></textarea>
        </div>
        <button type="submit">Enviar mensaje</button>
      </form>
    </div>
  );
};

export default ContactPage;
