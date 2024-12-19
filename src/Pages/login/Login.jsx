import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/Authcontexts.jsx";
import { Link } from "react-router-dom";

function Login() {
  const { register, handleSubmit, formState: {errors} } = useForm();

  const {signIn, errors: signinErrors} = useAuth()

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      {
        signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2" key={i}>
            {error}
          </div>
        ))
      }
      <h1 className="text-2xl font-bold text-black">Inicio de Sesión</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700  px-4 py-2 rounded-md my-2"
          placeholder="Correo Electronico"
        />
        {errors.email && (
          <p className="text-red-500"> Correo Electronico Requerido</p>
        )}
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
          placeholder="Contraseña"
        />
        {errors.password && (
          <p className="text-red-500"> Contraseña Requerido</p>
        )}

        <button type="submit">Ingresar</button>
        <p className="text-black flex gap-x-2 justify-between">
        ¿No tienes cuenta aún? <Link to="/register" className="text-decoration-none">Registrar</Link>
      </p>
      </form>
      
    </div>
  );
}

export default Login;
