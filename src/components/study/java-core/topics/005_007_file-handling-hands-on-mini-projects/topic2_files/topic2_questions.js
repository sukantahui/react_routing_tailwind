const topic2_questions = [
  {
    "question": "How do custom cryptographic stream filters (like CipherInputStream / CipherOutputStream) protect file data at rest in Java?",
    "shortAnswer": "They wrap underlying file streams in the Decorator pattern. As bytes flow through the stream, the filter applies cryptographic transformations (AES, RSA, or XOR) in chunks on-the-fly before writing encrypted ciphertext to disk or decrypting ciphertext back to plaintext upon reading, without loading entire files into memory.",
    "explanation": "Standard enterprise approach for zero-trust data-at-rest encryption.",
    "hint": "Applies on-the-fly chunk encryption/decryption as bytes flow through stream decorators.",
    "level": "Advanced",
    "codeExample": "CipherOutputStream cos = new CipherOutputStream(new FileOutputStream(file), aesCipher);"
  }
];

export default topic2_questions;