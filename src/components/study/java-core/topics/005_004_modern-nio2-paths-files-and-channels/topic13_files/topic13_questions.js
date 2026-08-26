const topic13_questions = [
  {
    "question": "What is the purpose of calling 'ByteBuffer.flip()' before reading data out of a ByteBuffer in Java NIO?",
    "shortAnswer": "When writing data into a ByteBuffer (via channel.read(buf) or buf.put()), the 'position' pointer advances towards 'capacity'. Calling 'flip()' sets 'limit' to the current position (marking the end of valid data) and resets 'position' back to 0. This switches the buffer state from 'Writing Mode' to 'Reading Mode' so you can read the written data from the beginning.",
    "explanation": "Fundamental lifecycle rule of Java NIO ByteBuffers.",
    "hint": "Sets limit to current position and resets position to 0, switching buffer to reading mode.",
    "level": "Advanced",
    "codeExample": "buf.clear(); channel.read(buf); buf.flip(); while(buf.hasRemaining()) { buf.get(); }"
  }
];

export default topic13_questions;