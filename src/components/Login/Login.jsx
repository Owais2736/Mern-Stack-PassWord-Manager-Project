"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  // const delay = async (delay) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, delay * 1000);
  //   });
  // };

  const onSubmit = async (data) => {
    // await delay(2); // add network delay

    await fetch("http://localhost:3005/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    toast.success("Login Successfully");
    navigate("/password-manager");

    // if (data.userName !== "Owais") {
    //   setError("authentication", { message: "Invalid userName" });
    // }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Welcome Back
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("userName", {
                required: "This field is required",
                minLength: { value: 3, message: "Min length is 3" },
                maxLength: { value: 28, message: "Max length is 28" },
              })}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email", {
                required: "This field is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password", {
                required: "This field is required",
                minLength: { value: 4, message: "Min length is 4" },
                maxLength: { value: 12, message: "Max length is 12" },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {errors.authentication && (
            <p className="text-red-500 text-center mb-3">
              {errors.authentication.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-70"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Don’t have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
