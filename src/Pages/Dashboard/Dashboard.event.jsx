// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiEventUrl = 'http://localhost:4000/api/eventos'; // API de eventos
const apiUrlCategories = 'http://localhost:4000/api/categorias'; // API de categorías

const Event = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]); // Variable para almacenar las categorías
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: '',
    tickets: 0,
    categoria: '', // Añadimos la categoría al estado del nuevo evento
  });
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    image: '',
  }); // Estado para la nueva categoría

  const [editingEvent, setEditingEvent] = useState(null);

  // Obtener eventos
  const fetchEvents = async () => {
    const response = await fetch(apiEventUrl);
    const data = await response.json();
    setEvents(data);
  };

  // Obtener categorías
  const fetchCategories = async () => {
    const response = await fetch(apiUrlCategories);
    const data = await response.json();
    setCategories(data); // Aquí guardamos las categorías
  };

  useEffect(() => {
    fetchEvents();
    fetchCategories(); // Obtener categorías al cargar el componente
  }, []);

  // Crear un evento
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const response = await fetch(apiEventUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });
    if (response.ok) {
      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: '',
        image: '',
        tickets: 0,
        categoria: '', // Reiniciar la categoría seleccionada
      });
      fetchEvents();
    }
  };

  // Crear una categoría
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const response = await fetch(apiUrlCategories, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    });
    if (response.ok) {
      setNewCategory({
        name: '',
        description: '',
        image: '',
      });
      fetchCategories(); // Actualizar la lista de categorías después de crear una nueva
    }
  };

  // Eliminar un evento
  const handleDeleteEvent = async (id) => {
    const response = await fetch(`${apiEventUrl}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchEvents();
    }
  };

  // Iniciar la edición de un evento
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 10),
      location: event.location,
      image: event.image,
      tickets: event.tickets,
      categoria: event.categoria ? event.categoria._id : '', // Verifica si la categoría existe
    });
  };

  // Actualizar un evento
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiEventUrl}/${editingEvent._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });
    if (response.ok) {
      setEditingEvent(null);
      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: '',
        image: '',
        tickets: 0,
        categoria: '', // Reiniciar la categoría seleccionada
      });
      fetchEvents();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Eventos</h1>

      <h2 className="mb-4">{editingEvent ? 'Editar Evento' : 'Crear Evento'}</h2>
      <form onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent} className="mb-5">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="date"
            className="form-control"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ubicación"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="URL de imagen"
            value={newEvent.image}
            onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <textarea
            className="form-control"
            placeholder="Descripción"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Boletos"
            value={newEvent.tickets}
            onChange={(e) => setNewEvent({ ...newEvent, tickets: Number(e.target.value) })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            className="form-control"
            value={newEvent.categoria}
            onChange={(e) => setNewEvent({ ...newEvent, categoria: e.target.value })}
            required
          >
            <option value="">Seleccionar Categoría</option>
            {categories.map((categoria) => (
              <option key={categoria._id} value={categoria._id}>
                {categoria.name} {/* Mostrar el nombre de la categoría */}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {editingEvent ? 'Actualizar' : 'Crear'} Evento
        </button>
      </form>

      <h2 className="mb-4">Crear Categoría</h2>
      <form onSubmit={handleCreateCategory} className="mb-5">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre de la Categoría"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Descripción de la Categoría"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="URL de la Imagen"
            value={newCategory.image}
            onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Categoría</button>
      </form>

      <h2 className="mb-4">Lista de Eventos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha</th>
            <th>Ubicación</th>
            <th>Descripción</th>
            <th>Boletos</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>{event.description}</td>
              <td>{event.tickets}</td>
              <td>{event.categoria ? event.categoria.name : 'Sin categoría'}</td>
              <td>
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleEditEvent(event)}
                  className="btn btn-primary ms-2"
                >
                  Modificar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Event;