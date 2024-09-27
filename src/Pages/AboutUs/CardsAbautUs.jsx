import CardList from "./CardList";

const CardsAbautUs = () => {
  const cardInfo = [
    {
      title: "Johana Ale",
      text: "Soy una persona con una gran capacidad para resolver problemas, con un interés innato por la tecnología",
      img: "https://res.cloudinary.com/del-men/image/upload/v1727446717/Johana_Ale_wyvxcp.jpg",
      githubLink:"https://github.com/JohanaAle",
    },
    {
      title: "Camila Prado",
      text: "Apasionado por la tecnología y el desarrollo web. Buscando siempre aprender y mejorar",
      img: "https://res.cloudinary.com/del-men/image/upload/v1727446791/Cami_Prado_yontob.jpg",
      githubLink:"https://github.com/camiiprd"
    },
    {
      title: "Diego Pizarro",
      text: "Hola, soy Diego Pizarro. Me dedico al desarrollo web. Me gusta encontrar soluciones simples y útiles en cada proyecto, y siempre busco aprender algo nuevo para mejorar. Disfruto trabajando en equipo y colaborando en proyectos que realmente aporten valor.",
      img: "https://res.cloudinary.com/del-men/image/upload/v1727446791/Diego_Pizarro_nyumcn.jpg",
      githubLink:"https://github.com/diegoandrespizarro"
    },
    {
      title: "Mariano Godoy",
      text: "Ser parte de la solucion es mi forma de actuar, que es donde deben consentrarce las energias",
      img: "https://res.cloudinary.com/del-men/image/upload/v1727446803/Mariano_Godoy_v6scq7.jpg",
      githubLink:"https://github.com/Mariano-Godoy"
    },
    {
      id: 5,
      title: "Ramiro Sorroza",
      text: " Hola! Me dicen Rama tengo 28 años, en mis tiempos libres me gusta jugar al fútbol, tocar la guitarra y andar en moto",
      img: "https://res.cloudinary.com/del-men/image/upload/v1727446808/Ramiro_Sorroza_fwh2zb.jpg",
      githubLink:"https://github.com/RamiSorroza"
    },

    {
      id: 6,
      title: "LIa Costilla",
      text: " Mi objetivo es crear experiencias digitales únicas que conecten a las personas y faciliten sus vidas. Cada línea de código es un paso hacia la excelencia, y estoy comprometida en hacer del mundo digital un lugar más accesible y emocionante.",
      img: "https://res.cloudinary.com/del-men/image/upload/v1727446800/Lia_costilla_xgvce7.jpg",
      githubLink:""
    },
    {
      id: 7,
      title: "Valentino",
      text: " Applications will be available through September 27, 2024. To apply to any of our partners beginning next month, and for any questions you may have about your application, contact the school's admissions office for assistance. Our team thanks you for your understanding and wishes you the best of luck with your future study-abroad plans!",
      img: "https://res.cloudinary.com/del-men/image/upload/v1727446794/Valentino_xeezgy.jpg",
      githubLink:"https://github.com/ValeLenci"
    },
    {
      id: 8,
      title: "Jeremias Pedraza",
      text: "Soy estudiante de Ing en sistemas, y ahora estoy cursando programacion web en RC. Mi objetivo es adquirir todo el aprendizaje posible para asi en un futuro dedicarme a la programacion.",
      img: "https://res.cloudinary.com/del-men/image/upload/v1727446792/Jeremias_Pedraza_zgb2at.jpg",
      githubLink:"https://github.com/jpedraza-1"
    },
    
  ];

  return (
    <>
      <div>
        <CardList cards={cardInfo}
        />
      </div>
    </>
  );
};
export default CardsAbautUs;
