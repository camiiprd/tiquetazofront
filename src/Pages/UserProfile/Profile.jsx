import React, { useState } from 'react';
import '../UserProfile/Profile.css'; 

function Profile() {
  const defaultAvatar = 'https://via.placeholder.com/150'; 
  const [user, setUser] = useState({
    name: 'Juan Perez',
    email: 'jperez@gmail.com',
    location: 'Tucuman, Argentina',
    phone: '+54 3815555555',
    avatar: defaultAvatar, 
  });

  const [isEditing, setIsEditing] = useState(false); 
  const [newAvatarUrl, setNewAvatarUrl] = useState(''); 

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
    setIsEditing(!isEditing);
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
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Correo electrónico"
          />
          <input
            type="text"
            name="location"
            value={user.location}
            onChange={handleInputChange}
            placeholder="Ubicación"
          />
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            placeholder="Teléfono"
          />
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
            <li><strong>Teléfono:</strong> {user.phone}</li>
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
