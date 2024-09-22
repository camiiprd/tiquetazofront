import React from 'react';
import '../Footer/Footer.css';
import contactImage from '../../assets/images/logo.png';

const Footer = () => {
  return (
    <div className="footer">
      {/* Sección Desarrolladores */}
      <div className="footer-section">
        <h5 className="Text-Footer"><strong>Desarrolladores</strong></h5>
        <ul className="developer-list">
          {[
            {
              name: "Camila Prado",
              linkedin: "https://www.linkedin.com/in/camila-prd",
              github: "https://github.com/camiiprd",
            },
            {
              name: "Mariano Godoy",
              linkedin: "https://www.linkedin.com/in/mariano-godoy-230039329",
              github: "https://github.com/YcMedsS",
            },
            {
              name: "Ramiro Sorroza",
              linkedin: "http://www.linkedin.com/in/ramiro-agustin-sorroza-b3a9a328b",
              github: "https://github.com/RamiSorroza",
            },            {
              name: "  Diego Pizarro",
              linkedin: "https://www.linkedin.com/in/diegoandrespizarro?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
              github: "https://github.com/diegoandrespizarro",
            },            {
              name: "Johana Abigail Ale",
              linkedin: "https://www.linkedin.com/in/johana-ale-8378a2317/",
              github: "https://github.com/JohanaAle",
            },            {
              name: "Jeremias Pedraza ",
              linkedin: "https://www.linkedin.com/in/samuel-jeremias-pedraza-6544a3276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
              github: "https://github.com/jpedraza-1",
            },            {
              name: "Lia Lisabet Costilla ",
              linkedin: "https://www.linkedin.com/in/lia-liabet-costilla-a05146225?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
              github: "https://github.com/12-9-1",
            },            {
              name: " Valentino Lencina ",
              linkedin: "https://www.linkedin.com/in/valentino-lencina-089047329/",
              github: "https://github.com/ValeLenci",
            }
          ].map((dev, index) => (
            <li key={index}>
              {dev.name}
              <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="icon bi-linkedin"></i>
              </a>
              <a href={dev.github} target="_blank" rel="noopener noreferrer">
                <i className="icon bi-github"></i>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Logo */}
      <div className="footer-section logo-section">
        <img src={contactImage} alt="Contacto" className="logo-footer" />
      </div>

      {/* Contacto */}
      <div className="footer-section2">
        <h5 className="Text-contact"><strong>Contacto</strong></h5>
        <p><i className="icon bi-envelope"></i> contacto@ejemplo.com</p>
        <p><i className="icon bi-telephone"></i> +54 11 1234 5678</p>
        <h5 className="footer-text"><strong>¡Gracias por visitarnos!</strong></h5>
        <p>Conoce más sobre nosotros presionando el siguiente botón.</p>
        <button className="button-footer"><strong>Sobre Nosotros</strong></button>
      </div>
    </div>
  );
};

export default Footer;
