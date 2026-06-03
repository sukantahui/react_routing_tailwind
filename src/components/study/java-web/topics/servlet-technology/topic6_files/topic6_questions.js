const questions = [
  {
    question: "What is the Part API in Servlet 3.0?",
    shortAnswer: "A built-in API for processing multipart/form-data file uploads without external libraries.",
    explanation: "Part objects represent each uploaded file or form field in a multipart request.",
    hint: "It replaces Apache Commons FileUpload.",
    level: "basic",
    codeExample: "Part filePart = request.getPart(\"fileInput\"); filePart.write(\"/path/saved.txt\");"
  },
  {
    question: "Which annotation must be added to a servlet to enable multipart parsing?",
    shortAnswer: "@MultipartConfig",
    explanation: "This annotation tells the container to parse the request as multipart/form-data.",
    hint: "Without it, getPart() throws IllegalStateException.",
    level: "basic"
  },
  {
    question: "What HTML form attribute is required for file upload?",
    shortAnswer: "enctype='multipart/form-data'",
    explanation: "It tells the browser to encode the form as multipart data.",
    level: "basic"
  },
  // ... generate 28 more covering:
  // - getPart vs getParts, difference
  // - getSubmittedFileName() method
  // - Setting maxFileSize and maxRequestSize in @MultipartConfig
  // - Handling empty parts
  // - Validating file content type
  // - Security risks (path traversal, file type spoofing)
  // - Download headers (Content-Disposition, Content-Type)
  // - Streaming large downloads without memory issues
  // - Using Part.write() vs manual InputStream copy
  // - Temporary file location and thresholds
  // - Asynchronous file uploads (Servlet 3.0 async)
  // - Progress listeners for upload (advanced)
  // - Storing uploaded files in database (BLOB) vs filesystem
  // - Serving files with proper caching headers
  // - Resumeable downloads (Range header)
  // - Cross-origin resource sharing (CORS) for uploads
  // - And more – total 30
];

export default questions;