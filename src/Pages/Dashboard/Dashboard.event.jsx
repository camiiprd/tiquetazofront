// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './DashboardStyle.css';
import Modal from 'react-modal';

const apiEventUrl = 'http://localhost:4000/api/eventos'; // API de eventos
const apiUrlCategories = 'http://localhost:4000/api/categorias'; // API de categorías

const Event = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: '',
    tickets: 0,
    categoria: '',
  });
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    image: '',
  });

  const [editingEvent, setEditingEvent] = useState(null);
  const [modalType, setModalType] = useState(null); // 'createEvent', 'editEvent', 'createCategory', 'editCategory', 'deleteEvent', 'deleteCategory'

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
    setCategories(data);
  };

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  // Crear un evento
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const eventDate = new Date(newEvent.date);
    const today = new Date();

    // Validar que la fecha no sea anterior a la fecha actual
    if (newEvent.tickets < 0 || newEvent.description.length > 60 || eventDate < today) {
      alert('Asegúrate de que los boletos no sean negativos, la descripción no exceda 60 caracteres y la fecha sea hoy o futura.');
      return;
    }

    const response = await fetch(apiEventUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });
    if (response.ok) {
      setNewEvent({ title: '', description: '', date: '', location: '', image: '', tickets: 0, categoria: '' });
      setModalType(null);
      fetchEvents();
    }
  };

  // Crear o modificar una categoría
  const handleCreateOrUpdateCategory = async (e) => {
    e.preventDefault();
    const url = modalType === 'editCategory' ? `${apiUrlCategories}/${newCategory._id}` : apiUrlCategories;
    const method = modalType === 'editCategory' ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    });
    if (response.ok) {
      setModalType(null);
      fetchCategories();
    }
  };

  // Eliminar un evento
  const handleDeleteEvent = async () => {
    const response = await fetch(`${apiEventUrl}/${editingEvent._id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setModalType(null);
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
      categoria: event.categoria ? event.categoria._id : '',
    });
    setModalType('editEvent');
  };

  // Actualizar un evento
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const eventDate = new Date(newEvent.date);
    const today = new Date();

    // Validar que la fecha no sea anterior a la fecha actual
    if (newEvent.tickets < 0 || newEvent.description.length > 60 || eventDate < today) {
      alert('Asegúrate de que los boletos no sean negativos, la descripción no exceda 60 caracteres y la fecha sea hoy o futura.');
      return;
    }

    const response = await fetch(`${apiEventUrl}/${editingEvent._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });
    if (response.ok) {
      setModalType(null);
      fetchEvents();
    }
  };

  return (
    <div className="container">
      <h1>Eventos</h1>
      <button onClick={() => setModalType('createEvent')}>Crear Evento</button>
      <button onClick={() => setModalType('createCategory')}>Crear Categoría</button>

      <h2>Lista de Eventos</h2>
      <table className="table">
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
                <button onClick={() => { handleEditEvent(event); setModalType('editEvent'); }}>Modificar</button>
                <button onClick={() => { setEditingEvent(event); setModalType('deleteEvent'); }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modales */}
      <Modal isOpen={modalType === 'createEvent'} onRequestClose={() => setModalType(null)}>
        <h2>Crear Evento</h2>
        <form onSubmit={handleCreateEvent}>
          <input type="text" placeholder="Título" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
          <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required />
          <input type="text" placeholder="Ubicación" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} required />
          <input type="text" placeholder="URL de imagen" value={newEvent.image} onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })} />
          <textarea placeholder="Descripción" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} maxLength={80} />
          <input type="number" placeholder="Boletos" value={newEvent.tickets} onChange={(e) => setNewEvent({ ...newEvent, tickets: Math.max(0, Number(e.target.value)) })} required />
          <select value={newEvent.categoria} onChange={(e) => setNewEvent({ ...newEvent, categoria: e.target.value })} required>
            <option value="">Seleccionar Categoría</option>
            {categories.map((categoria) => (
              <option key={categoria._id} value={categoria._id}>{categoria.name}</option>
            ))}
          </select>
          <button type="submit">Crear Evento</button>
          <button type="button" onClick={() => setModalType(null)}>Cerrar</button>
        </form>
      </Modal>

      <Modal isOpen={modalType === 'editEvent'} onRequestClose={() => setModalType(null)}>
        <h2>Modificar Evento</h2>
        <form onSubmit={handleUpdateEvent}>
          <input type="text" placeholder="Título" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
          <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required />
          <input type="text" placeholder="Ubicación" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} required />
          <input type="text" placeholder="URL de imagen" value={newEvent.image} onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })} />
          <textarea placeholder="Descripción" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} maxLength={80} />
          <input type="number" placeholder="Boletos" value={newEvent.tickets} onChange={(e) => setNewEvent({ ...newEvent, tickets: Math.max(0, Number(e.target.value)) })} required />
          <select value={newEvent.categoria} onChange={(e) => setNewEvent({ ...newEvent, categoria: e.target.value })} required>
            <option value="">Seleccionar Categoría</option>
            {categories.map((categoria) => (
              <option key={categoria._id} value={categoria._id}>{categoria.name}</option>
            ))}
          </select>
          <button type="submit">Actualizar Evento</button>
          <button type="button" onClick={() => setModalType(null)}>Cerrar</button>
        </form>
      </Modal>

      <Modal isOpen={modalType === 'deleteEvent'} onRequestClose={() => setModalType(null)}>
        <h2>Eliminar Evento</h2>
        <p>¿Estás seguro de que deseas eliminar el evento "{editingEvent?.title}"?</p>
        <button onClick={handleDeleteEvent}>Eliminar</button>
        <button onClick={() => setModalType(null)}>Cancelar</button>
      </Modal>

      <Modal isOpen={modalType === 'createCategory'} onRequestClose={() => setModalType(null)}>
        <h2>Crear Categoría</h2>
        <form onSubmit={handleCreateOrUpdateCategory}>
          <input type="text" placeholder="Nombre de la Categoría" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} required />
          <input type="text" placeholder="Descripción de la Categoría" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
          <input type="text" placeholder="URL de la Imagen" value={newCategory.image} onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })} />
          <button type="submit">Crear Categoría</button>
          <button type="button" onClick={() => setModalType(null)}>Cerrar</button>
        </form>
      </Modal>

      <Modal isOpen={modalType === 'editCategory'} onRequestClose={() => setModalType(null)}>
        <h2>Modificar Categoría</h2>
        <form onSubmit={handleCreateOrUpdateCategory}>
          <input type="text" placeholder="Nombre de la Categoría" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} required />
          <input type="text" placeholder="Descripción de la Categoría" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
          <input type="text" placeholder="URL de la Imagen" value={newCategory.image} onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })} />
          <button type="submit">Actualizar Categoría</button>
          <button type="button" onClick={() => setModalType(null)}>Cerrar</button>
        </form>
      </Modal>
    </div>
  );
};

export default Event;
