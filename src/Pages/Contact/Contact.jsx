import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Contact.css';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({}); 
  
  const validateText = (text) => {
    const regex = /^[a-zA-Z\s]{3,}$/;
    return regex.test(text);
  };

  
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  
  const validateForm = () => {
    const newErrors = {};

    if (!validateText(name)) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres y no puede contener símbolos.';
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Por favor, ingresa un correo válido.';
    }
    if (!validateText(subject)) {
      newErrors.subject = 'El asunto debe tener al menos 3 caracteres y no puede contener símbolos.';
    }
    if (message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!validateForm()) return; 

    try {
      const response = await axios.post('http://localhost:4000/api/contact', {
        name,
        email,
        subject,
        message,
      });

      console.log(response.data);
      alert('Mensaje enviado correctamente y guardado en la base de datos.');
      
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      alert('Error al enviar y guardar el mensaje.');
    }
  };

  return (
    <div id="container">
      <div className="box-info">
        <h1>CONTÁCTATE CON NOSOTROS</h1>
        <div className="data">
          <p><FontAwesomeIcon icon={faPhone} /> 3813028005</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> Tiquetazo!@gmail.com</p>
          <p><FontAwesomeIcon icon={faLocationDot} /> San Juan 300 - San Miguel de Tucumán</p>
        </div>
        <div className="links">
          <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            placeholder="Nombre y apellido"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="input-box">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Asunto"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          {errors.subject && <p className="error">{errors.subject}</p>}
        </div>

        <div className="input-box">
          <textarea
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {errors.message && <p className="error">{errors.message}</p>}
        </div>

        <button type="submit">Enviar mensaje</button>
      </form>
    </div>
  );
};

export default ContactPage;
