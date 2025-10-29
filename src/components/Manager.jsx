import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const initialForm = { site: "", userName: "", password: "" };

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("passwords");
    if (saved) setPasswordArray(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    const updated = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
    toast.success("password saved successfully");
    setForm(initialForm);
  };

  const deletePassword = (id) => {
    const isConfirmed = window.confirm("Do you want to delete this password?");
    if (isConfirmed) {
      const updatedArray = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(updatedArray);
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
      toast.success("password delete successfully");
    }
  };

  const editPassword = (id) => {
    console.log("delete in id", id);
    setForm(passwordArray.filter((item) => item?.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item?.id !== id));
  };

  return (
    <div className="container max-w-3xl mx-auto mt-12 px-8 py-10 rounded-3xl bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] shadow-2xl border border-[#2dd4bf]/40 text-white">
      <h1 className="text-center font-extrabold text-4xl text-mint-400 tracking-wide drop-shadow-lg">
        Password Manager
      </h1>
      <p className="text-center text-gray-400 text-sm mt-1">
        Your private password vault — encrypted and stored locally
      </p>

      {/* Input Section */}
      <div className="flex flex-col gap-4 mt-8">
        <input
          value={form.site}
          name="site"
          onChange={handleChange}
          placeholder="Website / Platform Name"
          className="px-4 py-3 bg-[#0b132b] border border-mint-400/30 rounded-xl text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-mint-400 outline-none transition-all"
        />

        <div className="flex gap-3">
          <input
            value={form.userName}
            name="userName"
            onChange={handleChange}
            placeholder="Username or Email"
            className="w-1/2 px-4 py-3 bg-[#0b132b] border border-mint-400/30 rounded-xl text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-mint-400 outline-none transition-all"
          />

          <div className="relative w-1/2">
            <input
              value={form.password}
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 bg-[#0b132b] border border-mint-400/30 rounded-xl text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-mint-400 outline-none transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-mint-400 transition-colors"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <button
          onClick={savePassword}
          className="mt-3 flex justify-center text-white items-center gap-2 bg-mint-500 hover:bg-mint-400  font-semibold px-6 py-3 rounded-xl shadow-xl hover:shadow-mint-400/40 transition-all w-fit mx-auto"
        >
          <lord-icon
            src="https://cdn.lordicon.com/vjgknpfx.json"
            trigger="hover"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          Save Password
        </button>
      </div>

      {/* Password Table */}
      <div className="password mt-10">
        <h2 className="text-2xl font-bold text-teal-400 mb-4 tracking-wide">
          Saved Passwords
        </h2>

        {passwordArray.length === 0 ? (
          <div className="text-center text-gray-400 mt-6 italic"></div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-teal-500/20 shadow-md backdrop-blur-sm">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="bg-[#0b132b] text-teal-300 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-semibold">Site</th>
                  <th className="px-6 py-3 font-semibold">Username</th>
                  <th className="px-6 py-3 font-semibold">Password</th>
                  <th className="px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-teal-400/10 bg-[#1e293b]/40">
                {passwordArray.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#27364b]/70 transition-colors duration-200"
                  >
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noreferrer"
                          className="truncate max-w-[180px] text-blue-300 hover:underline"
                        >
                          {item.site}
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.site);
                            toast.success("Copied to Clipboard");
                          }}
                          className="text-gray-400 hover:text-teal-400 transition"
                          title="Copy Site"
                        >
                          <FaRegCopy size={15} />
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-[160px]">
                          {item.userName}
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.userName);
                            toast.success("Copied to Clipboard");
                          }}
                          className="text-gray-400 hover:text-teal-400 transition"
                          title="Copy Username"
                        >
                          <FaRegCopy size={15} />
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-[160px]">
                          {item.password}
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.password);
                            toast.success("Copied to Clipboard");
                          }}
                          className="text-gray-400 hover:text-teal-400 transition"
                          title="Copy Password"
                        >
                          <FaRegCopy size={15} />
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap text-sm">
                      <button
                        onClick={() => editPassword(item?.id)}
                        className="text-teal-400 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePassword(item?.id)}
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

export default Manager;
