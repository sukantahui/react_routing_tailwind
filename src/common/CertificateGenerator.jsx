import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { 
  UserIcon, 
  AcademicCapIcon, 
  CalendarIcon, 
  ClockIcon, 
  UserGroupIcon,
  IdentificationIcon 
} from "@heroicons/react/24/outline";
import CertificateCanvas from "./CertificateCanvas";

const CertificateGenerator = () => {
  // Static image states (same as before)
  const [bgImage, setBgImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [instructorSignImage, setInstructorSignImage] = useState(null);
  const [directorSignImage, setDirectorSignImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Form handling with react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "Ritaja Ghosh",
      course: "React Development",
      date: "March 15, 2026",
      duration: "4 Weeks",
      instructor: "Sukanta Hui",
      director: "Tanusree Hui",
      certNumber: "CNAT-2026-001",
    },
  });

  // Watch all fields for live preview
  const formData = watch();

  const courseOptions = [
    "Diploma in Computer Application",
    "Diploma in Financial Application",
    "React Development",
    "JavaScript Basics",
    "Python Programming",
    "Data Science Fundamentals",
    "Web Development Bootcamp",
    "Mobile App Development",
  ];

  // Load images (same as before, with error handling)
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = 4;
    let hasError = false;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        if (hasError) setLoadError(true);
        setImagesLoaded(true);
      }
    };

    const handleError = (imgName) => {
      console.error(`Failed to load image: ${imgName}`);
      hasError = true;
      checkAllLoaded();
    };

    const bg = new Image();
    bg.onload = () => { setBgImage(bg); checkAllLoaded(); };
    bg.onerror = () => handleError("/assets/certificate-bg.png");
    bg.src = "/assets/certificate-bg.png";

    const logo = new Image();
    logo.onload = () => { setLogoImage(logo); checkAllLoaded(); };
    logo.onerror = () => handleError("/assets/cnat.png");
    logo.src = "/assets/cnat.png";

    const s1 = new Image();
    s1.onload = () => { setInstructorSignImage(s1); checkAllLoaded(); };
    s1.onerror = () => handleError("/assets/instructor-sign.png");
    s1.src = "/assets/instructor-sign.png";

    const s2 = new Image();
    s2.onload = () => { setDirectorSignImage(s2); checkAllLoaded(); };
    s2.onerror = () => handleError("/assets/director-sign.png");
    s2.src = "/assets/director-sign.png";
  }, []);

  const onSubmit = (data) => {
    // In this live-preview scenario, we don't need to do anything on submit
    console.log("Form data", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Form Panel */}
          <div className="p-8 lg:p-10 bg-white border-r border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Certificate Details</h2>
            <p className="text-gray-500 mb-8">Fill in the information below to generate a professional certificate.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Student Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Student name is required" })}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Course Selection */}
              <div>
                <label htmlFor="course" className="block text-sm font-semibold text-gray-700 mb-1">
                  Course <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <AcademicCapIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    id="course"
                    {...register("course", { required: "Course is required" })}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white ${
                      errors.course ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {courseOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.course && (
                  <p className="mt-1 text-sm text-red-600">{errors.course.message}</p>
                )}
              </div>

              {/* Date and Duration - two columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1">
                    Completion Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="date"
                      type="text"
                      {...register("date", { 
                        required: "Date is required",
                        pattern: {
                          value: /^[A-Za-z]+ \d{1,2}, \d{4}$/,
                          message: "Use format: March 15, 2026"
                        }
                      })}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.date ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="March 15, 2026"
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-1">
                    Duration
                  </label>
                  <div className="relative">
                    <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="duration"
                      type="text"
                      {...register("duration")}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 4 Weeks"
                    />
                  </div>
                </div>
              </div>

              {/* Instructor and Director */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="instructor" className="block text-sm font-semibold text-gray-700 mb-1">
                    Instructor Name
                  </label>
                  <div className="relative">
                    <UserGroupIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="instructor"
                      type="text"
                      {...register("instructor")}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Jane Smith"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="director" className="block text-sm font-semibold text-gray-700 mb-1">
                    Director Name
                  </label>
                  <div className="relative">
                    <UserGroupIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="director"
                      type="text"
                      {...register("director")}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Sukanta Hui"
                    />
                  </div>
                </div>
              </div>

              {/* Certificate Number */}
              <div>
                <label htmlFor="certNumber" className="block text-sm font-semibold text-gray-700 mb-1">
                  Certificate Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <IdentificationIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="certNumber"
                    type="text"
                    {...register("certNumber", { 
                      required: "Certificate number is required",
                      pattern: {
                        value: /^CNAT-\d{4}-\d{3}$/,
                        message: "Format: CNAT-2026-001"
                      }
                    })}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.certNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="CNAT-2026-001"
                  />
                </div>
                {errors.certNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.certNumber.message}</p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Certificate
                </button>
                <button
                  type="button"
                  onClick={() => reset()}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Preview Panel */}
          <div className="bg-gray-50 p-8 lg:p-10 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 self-start">Live Preview</h3>
            <div className="w-full flex justify-center">
              {!imagesLoaded ? (
                <div className="w-full max-w-sm border shadow-lg rounded-lg bg-white p-8 text-center">
                  <p className="text-gray-500">Loading images...</p>
                </div>
              ) : loadError ? (
                <div className="w-full max-w-sm border shadow-lg rounded-lg bg-red-50 p-8 text-center">
                  <p className="text-red-600">Failed to load certificate assets.</p>
                </div>
              ) : (
                <CertificateCanvas
                  name={formData.name}
                  course={formData.course}
                  date={formData.date}
                  duration={formData.duration}
                  instructor={formData.instructor}
                  director={formData.director}
                  certNumber={formData.certNumber}
                  bgImage={bgImage}
                  logoImage={logoImage}
                  instructorSignImage={instructorSignImage}
                  directorSignImage={directorSignImage}
                />
              )}
            </div>
            <p className="text-sm text-gray-400 mt-4 text-center">
              Changes update automatically in the preview.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;