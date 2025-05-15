import { useForm } from "react-hook-form"
import { RegisterData } from "../Types";





const Register = () => {

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      reset: () => reset(),
    },
  });

  const onSubmit = async  (data: RegisterData ) => {
    
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          password: data.password
          
        })
    });

    const result = await response.json();
    if (!response.ok) {
      alert(`Fel: ${result.message}`);
    } else {
      alert(result.message);
      reset(); 
      window.location.href = "/profile";
    }

    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }

    
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <input
          type="text"
          {...register("firstName", { required: true, minLength: 3 })}
          placeholder="First Name"
          className="border p-2 w-full"
        />
        <input
          type="text"
          {...register("lastName", { required: true, minLength: 3 })}
          placeholder="Last Name"
          className="border p-2 w-full"
        />
        <input
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          placeholder="Password"
          className="border p-2 w-full"
        />
        <input
          type="password"
          {...register("confirmPassword", { required: true, minLength: 6, validate: (value) => value === watch("password") || "Passwords do not match" })}
          placeholder="Confirm Password"
          className="border p-2 w-full"
          
        />
        <button
          type="submit"
          className="bg-gray-500 text-white px-4 py-2 rounded w-full hover:cursor-pointer hover:bg-gray-300"
          >
          Register
        </button>
      
      </form>
    </div>
  );
};
export default Register;