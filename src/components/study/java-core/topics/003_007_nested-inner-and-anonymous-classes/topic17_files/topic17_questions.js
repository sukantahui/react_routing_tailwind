const topic17_questions = [
  {
    "question": "How do nested classes, static data models, and anonymous event listeners collaborate in enterprise callback architectures?",
    "shortAnswer": "1. 'Static Nested Classes' model immutable event payloads (e.g. AdmissionEvent) with zero outer overhead. 2. 'Member Inner Classes' manage stateful publishing/subscription lifecycles bound to the engine. 3. 'Anonymous Classes & Lambdas' provide pluggable handler implementations on the fly.",
    "explanation": "This architecture is the core foundation behind Spring ApplicationEvents and Java AWT/Swing.",
    "hint": "Static nested classes model event data; inner classes manage dispatching; anonymous classes handle callbacks.",
    "level": "Advanced",
    "codeExample": "dispatcher.subscribe(new Listener() { public void onEvent(Event e) {} });"
  }
];

export default topic17_questions;