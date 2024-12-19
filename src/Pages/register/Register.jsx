import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/Authcontexts.jsx";
import { useNavigate } from "react-router";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singUp, isAuthenticated, errors: registerErrors} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    await singUp(values);
  });
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {
        registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2" key={i}>
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("userName", { required: true })}
          className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
          placeholder="Usuario"
        />
        {
          errors.userName && (
            <p className="text-red-500"> Usuario Requerido</p>
          )
        }
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
          placeholder="Contraseña"
        />
        {
          errors.password && (
            <p className="text-red-500"> Contraseña Requerido</p>
          )
        }
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700  px-4 py-2 rounded-md my-2"
          placeholder="Correo Electronico"
        />
        {
          errors.email && (
            <p className="text-red-500"> Correo Electronico Requerido</p>
          )
        }
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;