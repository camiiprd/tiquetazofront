import React, { useState, useEffect } from 'react';
import '../UserProfile/Profile.css';

function Profile() {
  const defaultAvatar = 'https://via.placeholder.com/150'; 

  // Cargar los datos del usuario desde localStorage o establecer los valores por defecto
  const initialUser = JSON.parse(localStorage.getItem('user')) || {
    name: 'Juan Perez',
    email: 'jperez@gmail.com',
    location: 'Tucuman, Argentina',
    phone: '',
    avatar: defaultAvatar,
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false); 
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [errors, setErrors] = useState({});

  // Guardar los datos en localStorage cada vez que se actualiza el usuario
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const validateFields = () => {
    let errors = {};
    if (!user.name) errors.name = 'El nombre es requerido';
    if (!user.email) {
      errors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'El formato del correo es inválido';
    }
    // El campo de teléfono no es requerido, pero si se ingresa debe tener el formato correcto
    if (user.phone && !/^\+?\d{1,15}$/.test(user.phone)) {
      errors.phone = 'El formato del teléfono es inválido';
    }
    if (!user.location) errors.location = 'La ubicación es requerida';

    return errors;
  };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarUrlChange = () => {
    if (newAvatarUrl) {
      setUser({ ...user, avatar: newAvatarUrl });
      setNewAvatarUrl(''); 
    }
  };

  const handleDeleteAvatar = () => {
    setUser({ ...user, avatar: defaultAvatar });
  };

  const toggleEdit = () => {
    if (isEditing) {
      const validationErrors = validateFields();
      if (Object.keys(validationErrors).length === 0) {
        // Guardar cambios
        setIsEditing(false);
        setErrors({});
      } else {
        setErrors(validationErrors);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleLogout = () => {
    alert('Has cerrado sesión');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar} alt="Foto de perfil" className="profile-avatar" />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>

      {isEditing ? (
        <div className="profile-edit-form">
          <h2>Editar Perfil</h2>
          <div>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              placeholder="Nombre"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <input
              type="text"
              name="location"
              value={user.location}
              onChange={handleInputChange}
              placeholder="Ubicación"
            />
            {errors.location && <span className="error">{errors.location}</span>}
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              placeholder="Teléfono (opcional)"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <label>
            Cambiar foto de perfil (URL):
            <input
              type="text"
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
              placeholder="Ingresa la URL de la imagen"
            />
          </label>
          <button onClick={handleAvatarUrlChange}>Aplicar Nueva Foto</button>
          <button onClick={handleDeleteAvatar}>Eliminar Foto Actual</button>
          <button onClick={toggleEdit}>Guardar Cambios</button>
        </div>
      ) : (
        <div className="profile-details">
          <h2>Detalles del Usuario</h2>
          <ul>
            <li><strong>Ubicación:</strong> {user.location}</li>
            <li><strong>Teléfono:</strong> {user.phone ? user.phone : 'No especificado'}</li>
          </ul>

          <div className="button-container">
            <button onClick={toggleEdit} className="edit-button">Editar Perfil</button>
            <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
