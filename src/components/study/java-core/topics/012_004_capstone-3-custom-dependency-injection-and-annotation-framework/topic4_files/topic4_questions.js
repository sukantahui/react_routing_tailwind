const topic4_questions = [
  {
    "question": "How does a 'currentlyInCreation' Set effectively detect circular dependencies in Dependency Injection containers?",
    "shortAnswer": "Before resolving a bean's dependencies, the class is added to the Set. If a recursive dependency resolution attempts to add the same class again before the first creation completes, Set.add() returns false, immediately detecting the circular graph cycle.",
    "explanation": "Graph cycle detection using depth-first search tracking.",
    "hint": "Set.add() returning false signals that the class is already being constructed higher up the call stack.",
    "level": "Intermediate",
    "codeExample": "if (!inCreationSet.add(clazz)) throw new CircularDependencyException();"
  },
  {
    "question": "How does Spring solve circular dependencies for setter/field injection using 3-level caching?",
    "shortAnswer": "Spring exposes an un-populated early singleton object reference in a third-level cache (singletonFactories) before injecting its fields, allowing dependent beans to receive the early reference before full initialization completes.",
    "explanation": "Spring's three-level cache architecture (DefaultSingletonBeanRegistry).",
    "hint": "Exposes early un-initialized singleton reference in third-level cache.",
    "level": "Advanced",
    "codeExample": "singletonFactories.put(beanName, () -> getEarlyBeanReference(beanName, mbd, bean));"
  }
];

export default topic4_questions;
