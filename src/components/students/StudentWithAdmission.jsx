import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { studentService } from "../../services/studentService";

export default function StudentWithAdmission() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 pt-24 p-6 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-[90vw] mx-auto bg-gray-900/80 border border-gray-800 rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-sky-400 mb-8 text-center">
          Add New Student
        </h1>

        <form className="space-y-5">
          {/* All fields one by one */}
          <Input label="Student Name" name="student_name" required />
          <Input label="Nickname" name="nickname" required />
          <Input label="Email" name="email" type="email" required />

          {/* Date of Birth and Blood Group in same line */}
          <div className="flex flex-col md:flex-row md:gap-6">
            <div className="flex-1">
              <Input label="Date of Birth" name="dob" type="date" required />
            </div>
            <div className="flex-1">
              <Select
                label="Blood Group"
                name="blood_group"
                required
                options={[
                  { label: "A+", value: "A+" },
                  { label: "A−", value: "A−" },
                  { label: "B+", value: "B+" },
                  { label: "B−", value: "B−" },
                  { label: "AB+", value: "AB+" },
                  { label: "AB−", value: "AB−" },
                  { label: "O+", value: "O+" },
                  { label: "O−", value: "O−" },
                ]}
              />
            </div>
          </div>

          <Input label="Father's Name" name="father_name" />
          <Input label="Mother's Name" name="mother_name" />
          <Input label="Guardian Name" name="guardian_name" />
          <Select
            label="Guardian Relation"
            name="guardian_relation"
            options={[
              { label: "Father", value: "Father" },
              { label: "Mother", value: "Mother" },
              { label: "Brother", value: "Brother" },
              { label: "Sister", value: "Sister" },
              { label: "Uncle", value: "Uncle" },
              { label: "Aunt", value: "Aunt" },
              { label: "Grandfather", value: "Grandfather" },
              { label: "Grandmother", value: "Grandmother" },
              { label: "Other", value: "Other" },
            ]}
          />
          <Input label="Guardian Phone" name="guardian_phone" />
          <Input label="Phone 1" name="phone1" />
          <Input label="Phone 2" name="phone2" />
          <Input label="WhatsApp" name="whatsapp" />
          <Input label="Address" name="address" />
          <Input label="City" name="city" />
          <Input label="PIN Code" name="pin" />

          {/* Assign Courses  */}
          <h1 className="text-2xl font-semibold w-full text-center text-yellow-400 mt-10 mb-1">
            ASSIGN COURSES
          </h1>
          <div className="min-h-[20vh] w-full">
            <div className="space-y-5">
              {/* Student Select */}
              <Select
                label="Student"
                name="studentId"
                required/>

              {/* Course Select */}
              <Select
                label="Course"
                name="courseId"
                required/>

              {/* Course Fees */}
              <Input
                label="Course Fees"
                name="courseFees"
                type="number"
                required
                min="0"
                step="0.01"
                placeholder="Enter amount"
              />

              {/* Admission Date */}
              <Input
                label="Admission Date"
                name="admissionDate"
                type="date"
                required
              />

              {/* Submit Button (styled like AddStudent) */}
              <div className="flex justify-end pt-4">
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-200 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* 🔹 Input Component */
function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-400 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );
}

/* 🔹 Select Component */
function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-400 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <option value="">Select {label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
