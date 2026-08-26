const topic10_questions = [
  {
    "question": "Where were Anonymous Inner Classes predominantly used prior to Java 8?",
    "shortAnswer": "1. GUI event listeners (e.g. Swing 'button.addActionListener(new ActionListener() { ... })'). 2. Multithreading ('new Thread(new Runnable() { ... }).start()'). 3. Collections sorting ('Collections.sort(list, new Comparator<T>() { ... })').",
    "explanation": "Many single-abstract-method (SAM) use cases were superseded by Java 8 lambdas.",
    "hint": "GUI event handlers, Thread Runnables, and Comparator sorting callbacks.",
    "level": "Beginner",
    "codeExample": "button.addActionListener(new ActionListener() { public void actionPerformed(ActionEvent e) {} });"
  }
];

export default topic10_questions;