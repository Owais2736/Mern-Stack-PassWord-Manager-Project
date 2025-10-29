import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const initialForm = { site: "", userName: "", password: "" };

const DataBaseManager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3005/password/getPassword");
    let passwords = await req.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    // IF ANY such id  exisits in the db delete it

    await fetch("http://localhost:3005/password/deletePassword", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: form.id }),
    });

    const updated = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(updated);
    // localStorage.setItem("passwords", JSON.stringify(updated));

    await fetch("http://localhost:3005/password/save-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });

    toast.success("password saved successfully");
    setForm(initialForm);
  };

  const deletePassword = async (id) => {
    const isConfirmed = window.confirm("Do you want to delete this password?");
    if (isConfirmed) {
      const updatedArray = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(updatedArray);
      //   localStorage.setItem("passwords", JSON.stringify(updatedArray));
      await fetch("http://localhost:3005/password/deletePassword", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("password delete successfully");
    }
  };

  const editPassword = (id) => {
    console.log("delete in id", id);
    setForm({ ...passwordArray.filter((item) => item?.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item?.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 px-8 py-10 rounded-3xl bg-[#0a0f1c]/90 backdrop-blur-md border border-teal-500/20 shadow-[0_0_30px_rgba(45,212,191,0.1)] text-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/40 via-transparent to-[#2dd4bf]/5 pointer-events-none"></div>

      <h1 className="text-center font-extrabold text-4xl text-teal-400 tracking-wide drop-shadow-[0_0_6px_#2dd4bf]">
        Vaultify Manager
      </h1>
      <p className="text-center text-gray-400 text-sm mt-2">
        Your encrypted digital vault — sleek, secure, and local 🔒
      </p>

      {/* Inputs */}
      <div className="flex flex-col gap-5 mt-10">
        <input
          value={form.site}
          name="site"
          onChange={handleChange}
          placeholder="Website or App Name"
          className="px-4 py-3 bg-[#111827]/70 border border-teal-500/20 rounded-xl text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-teal-400 outline-none transition-all"
        />
        <div className="flex flex-col md:flex-row gap-4">
          <input
            value={form.userName}
            name="userName"
            onChange={handleChange}
            placeholder="Username / Email"
            className="flex-1 px-4 py-3 bg-[#111827]/70 border border-teal-500/20 rounded-xl text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-teal-400 outline-none transition-all"
          />
          <div className="relative flex-1">
            <input
              value={form.password}
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 bg-[#111827]/70 border border-teal-500/20 rounded-xl text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-teal-400 outline-none transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-400 transition-colors"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <button
          onClick={savePassword}
          className="mt-4 flex justify-center items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-black font-semibold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:shadow-[0_0_30px_rgba(45,212,191,0.6)] transition-all mx-auto"
        >
          <lord-icon
            src="https://cdn.lordicon.com/vjgknpfx.json"
            trigger="hover"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          Save Password
        </button>
      </div>

      {/* Table Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-teal-400 mb-4 tracking-wide">
          Saved Passwords
        </h2>

        {passwordArray.length === 0 ? (
          <div className="text-center text-gray-500 italic py-6">
            No passwords stored yet...
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-teal-500/20 shadow-md backdrop-blur-sm">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="bg-[#0b132b]/70 text-teal-300 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3">Site</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Password</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-500/10 bg-[#0f172a]/50">
                {passwordArray.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#1e293b]/60 transition-all duration-200"
                  >
                    <td className="px-6 py-3">{item.site}</td>
                    <td className="px-6 py-3">{item.userName}</td>
                    <td className="px-6 py-3">
                      {"*".repeat(item.password.length)}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => editPassword(item.id)}
                        className="text-teal-400 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePassword(item.id)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataBaseManager;
