import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Save, BookOpen } from "lucide-react";

import { resultService } from "../services/resultService";

const defaultForm = {
  admissionId: "",
  theoryMarks: "",
  practicalMarks: "",
  totalTheoryMarks: "",
  totalPracticalMarks: "",
  resultDate: "",
};

const AddResult = () => {

  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [showDevTools, setShowDevTools] = useState(false);

  const getSwalTheme = () => ({
    background: "#111827",
    color: "#f9fafb",
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#6b7280",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculatePercentage = () => {
    if (
      formData.theoryMarks &&
      formData.practicalMarks &&
      formData.totalTheoryMarks &&
      formData.totalPracticalMarks
    ) {
      const obtained =
        Number(formData.theoryMarks) + Number(formData.practicalMarks);

      const total =
        Number(formData.totalTheoryMarks) +
        Number(formData.totalPracticalMarks);

      return ((obtained / total) * 100).toFixed(2);
    }

    return null;
  };

  const percentage = calculatePercentage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: "Save Result?",
      icon: "question",
      showCancelButton: true,
      ...getSwalTheme(),
    });

    if (!confirm.isConfirmed) return;

    setLoading(true);

    try {
      await resultService.create(formData);

      await Swal.fire({
        icon: "success",
        title: "Result Saved",
        timer: 2000,
        showConfirmButton: false,
        ...getSwalTheme(),
      });

      setFormData(defaultForm);

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Error saving result",
        text: error.message,
        ...getSwalTheme(),
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 pt-24 p-6">

      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-900 border border-gray-800 rounded-3xl p-8"
        >

          <h2 className="text-2xl font-bold text-sky-400 mb-6 flex items-center gap-2">
            <BookOpen /> Add Result
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              label="Admission ID"
              name="admissionId"
              type="number"
              value={formData.admissionId}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-4">

              <Input
                label="Theory Marks"
                name="theoryMarks"
                type="number"
                value={formData.theoryMarks}
                onChange={handleChange}
              />

              <Input
                label="Practical Marks"
                name="practicalMarks"
                type="number"
                value={formData.practicalMarks}
                onChange={handleChange}
              />

            </div>

            <div className="grid grid-cols-2 gap-4">

              <Input
                label="Total Theory Marks"
                name="totalTheoryMarks"
                type="number"
                value={formData.totalTheoryMarks}
                onChange={handleChange}
              />

              <Input
                label="Total Practical Marks"
                name="totalPracticalMarks"
                type="number"
                value={formData.totalPracticalMarks}
                onChange={handleChange}
              />

            </div>

            <Input
              label="Result Date"
              name="resultDate"
              type="date"
              value={formData.resultDate}
              onChange={handleChange}
            />

            {percentage && (
              <div className="bg-gray-800 p-3 rounded-lg text-sm text-green-400">
                Percentage Preview: {percentage}%
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-sky-500 px-6 py-2 rounded-xl flex items-center gap-2"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Result"}
            </button>

          </form>

        </motion.div>

        {/* Developer Tools */}

        {import.meta.env.DEV && (

          <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-5">

            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-sky-400">
                🧑‍💻 Developer Tools
              </h2>

              <button
                onClick={() => setShowDevTools(!showDevTools)}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm"
              >
                {showDevTools ? "Hide" : "Show"}
              </button>
            </div>

            {showDevTools && (
              <div className="grid md:grid-cols-2 gap-4 text-xs">

                <div>
                  <div className="text-gray-400 mb-1">Form Data</div>
                  <pre className="bg-black p-3 rounded-lg text-green-400 overflow-x-auto">
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                </div>

                <div>
                  <div className="text-gray-400 mb-1">API Payload</div>
                  <pre className="bg-black p-3 rounded-lg text-yellow-400 overflow-x-auto">
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                </div>

                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-gray-400">Calculated Percentage</div>
                  <div className="text-lg font-semibold text-green-400">
                    {percentage ?? "N/A"}
                  </div>
                </div>

              </div>
            )}

          </div>

        )}

      </div>

    </div>
  );
};

function Input({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div className="flex flex-col mb-2">
      <label className="text-sm text-gray-400 mb-1">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2"
      />
    </div>
  );
}

export default AddResult;
