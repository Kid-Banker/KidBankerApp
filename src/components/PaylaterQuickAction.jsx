import { useState } from "react";
import api from "../lib/axios";

export default function PaylaterQuickAction({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Kirim request paylater ke API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!amount || !deadline || !name) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/api/paylater/request", {
        name,
        amount: Number(amount),
        deadline,
      });
      setSuccess("Paylater request created!");
      setAmount("");
      setDeadline("");
      setName("");
      if (onSuccess) onSuccess();
    } catch (e) {
      setError(e.response?.data?.message || "Network error");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        className="w-full mb-2 p-2 border rounded"
        placeholder="Amount (Rp)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min={1}
        disabled={loading}
      />
      <input
        type="date"
        className="w-full mb-2 p-2 border rounded"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        disabled={loading}
      />
      <textarea
        className="w-full mb-2 p-2 border rounded"
        placeholder="Description..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
      {success && <div className="text-green-500 text-xs mb-2">{success}</div>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded font-semibold"
        disabled={loading}
      >
        {loading ? "Requesting..." : "+ Request Paylater"}
      </button>
    </form>
  );
}
