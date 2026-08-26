const topic10_questions = [
  {
    "question": "How does the signature 'Collections.copy(List<? super T> dest, List<? extends T> src)' demonstrate maximum API flexibility?",
    "shortAnswer": "Without wildcards ('copy(List<T> dest, List<T> src)'), copying a 'List<Integer>' into a 'List<Number>' would fail compilation due to invariance. By applying PECS, 'src' is declared as '? extends T' (Producer) and 'dest' is declared as '? super T' (Consumer). When T=Integer, src can be 'List<Integer>' and dest can be 'List<Number>' or 'List<Object>', providing total polymorphic flexibility.",
    "explanation": "Standard design pattern found throughout java.util.Collections and java.util.stream.",
    "hint": "Allows copying from specialized subtypes (List<Integer>) into generalized supertypes (List<Number>).",
    "level": "Advanced",
    "codeExample": "Collections.copy(numberList, integerList); // Works seamlessly via PECS!"
  }
];

export default topic10_questions;