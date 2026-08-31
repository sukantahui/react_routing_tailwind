// src/components/study/python/topics/005_006_turtle-interaction/topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the primary function of `screen.listen()` in Python Turtle?",
    shortAnswer: "It gives keyboard focus to the Turtle canvas window so that keypress events can be captured and dispatched to callbacks.",
    explanation: "Without `screen.listen()`, the operating system does not route keyboard inputs to the application.",
    hint: "What function claims keyboard focus for the Turtle window?",
    level: "basic",
    codeExample: "screen.listen()"
  },
  {
    question: "What happens if a program defines `screen.onkeypress(move, 'Up')` but forgets to call `screen.listen()`?",
    shortAnswer: "The program runs without errors, but pressing the Up arrow key does absolutely nothing because the canvas lacks keyboard focus.",
    explanation: "Missing `listen()` is the most common reason keyboard bindings fail in beginner projects.",
    hint: "Why do arrow keys fail to respond if listen() is omitted?",
    level: "basic",
    codeExample: "# Keypresses ignored without screen.listen()"
  },
  {
    question: "What does the term 'Keyboard Focus' mean in operating system window management?",
    shortAnswer: "The state of being the active GUI window selected by the OS to receive all physical keystroke events.",
    explanation: "Only one desktop window holds keyboard focus at any given moment.",
    hint: "What determines which desktop window receives your typing?",
    level: "basic",
    codeExample: "# OS routes keys to focused window only"
  },
  {
    question: "Why do mouse clicks (`screen.onclick`) often work even if `screen.listen()` was not called?",
    shortAnswer: "Because mouse clicks carry spatial `(x, y)` coordinate pointers directly to the window beneath the cursor, unlike keyboard events.",
    explanation: "Mouse events carry implicit coordinate targeting; keyboard events require explicit window focus.",
    hint: "Why do mouse events work without listen() while keyboard events fail?",
    level: "moderate",
    codeExample: "# Mouse clicks target window under pointer directly"
  },
  {
    question: "What is the 'Auto-Refocus' pattern in Python Turtle?",
    shortAnswer: "Calling `screen.listen()` inside `screen.onclick()` so clicking anywhere on canvas reclaims lost keyboard focus.",
    explanation: "Guarantees keyboard controls resume working if the user previously clicked an external window.",
    hint: "How does binding listen() to mouse clicks protect against lost focus?",
    level: "moderate",
    codeExample: "def on_click(x, y):\n    screen.listen()  # Reclaims focus\n    handle_click(x, y)"
  },
  {
    question: "Where in your code script should `screen.listen()` be called?",
    shortAnswer: "After defining your key bindings (`onkeypress`) and before starting the main event loop (`screen.mainloop()`).",
    explanation: "Calling `listen()` during window setup ensures focus is claimed immediately upon launch.",
    hint: "Where is listen() placed relative to onkeypress and mainloop?",
    level: "basic",
    codeExample: "screen.onkeypress(move, 'Up')\nscreen.listen()\nscreen.mainloop()"
  },
  {
    question: "What Tkinter underlying method does `screen.listen()` invoke?",
    shortAnswer: "`canvas.focus_force()` or `canvas.focus_set()`.",
    explanation: "`screen.listen()` is Turtle's wrapper around Tkinter's low-level widget focus API.",
    hint: "What Tkinter method does listen() wrap under the hood?",
    level: "advanced",
    codeExample: "# canvas.focus_force() in Tkinter"
  },
  {
    question: "Can `screen.listen()` be called multiple times during program execution?",
    shortAnswer: "Yes, calling `screen.listen()` multiple times is completely safe and ensures focus remains active.",
    explanation: "`listen()` is idempotent and causes zero negative side effects when called repeatedly.",
    hint: "Is it safe to call screen.listen() repeatedly?",
    level: "basic",
    codeExample: "screen.listen()  # Safe to call multiple times"
  },
  {
    question: "What causes a Turtle window to lose keyboard focus during runtime?",
    shortAnswer: "The user clicking on another application, a popup input dialog appearing, or interacting with the OS taskbar.",
    explanation: "Switching active applications shifts OS keyboard focus away from Turtle.",
    hint: "What user actions cause windows to drop focus?",
    level: "basic",
    codeExample: "# Focus lost when switching to browser/terminal"
  },
  {
    question: "How do you know if a Turtle window currently holds keyboard focus?",
    shortAnswer: "The window title bar is highlighted/active, and pressing bound keys immediately triggers their respective callbacks.",
    explanation: "Visual title bar styling and responsive callbacks confirm active focus.",
    hint: "What visual and behavioral cues indicate active window focus?",
    level: "basic",
    codeExample: "# Active title bar indicates focus"
  },
  {
    question: "How does `turtle.listen()` compare to `screen.listen()`?",
    shortAnswer: "They are aliases for the exact same function in Python's standard library.",
    explanation: "`turtle.listen()` delegates to the active `Screen` singleton.",
    hint: "Are turtle.listen() and screen.listen() identical?",
    level: "basic",
    codeExample: "screen.listen()  # Standard OOP style"
  },
  {
    question: "Why should `screen.listen()` be re-issued after using `turtle.textinput()` or `turtle.numinput()`?",
    shortAnswer: "Because the popup dialog box takes focus away from the main canvas; calling `screen.listen()` restores focus to the game.",
    explanation: "Dismissing dialogs leaves focus in an ambiguous state without explicit re-focusing.",
    hint: "Why re-call listen() after a popup input dialog closes?",
    level: "moderate",
    codeExample: "name = screen.textinput('Name', 'Enter:')\nscreen.listen()  # Restore focus!"
  },
  {
    question: "What is Window Focus Trapping in web and desktop UIs?",
    shortAnswer: "Constraining keyboard navigation (e.g. Tab/Esc) inside a modal dialog until the user completes or closes the prompt.",
    explanation: "Focus trapping is an essential accessibility pattern for modal interfaces.",
    hint: "What UI pattern confines keyboard focus inside modal windows?",
    level: "advanced",
    codeExample: "# Modal focus trap architecture"
  },
  {
    question: "Does `screen.listen()` need to be called inside a `while True:` loop?",
    shortAnswer: "No, calling `screen.listen()` once during initialization is sufficient; calling it inside a 60 FPS loop is redundant.",
    explanation: "Focus remains active until explicitly stolen by another application.",
    hint: "Should listen() be called repeatedly inside animation loops?",
    level: "moderate",
    codeExample: "# Call listen() once during setup"
  },
  {
    question: "How does `screen.listen()` interact with fullscreen mode?",
    shortAnswer: "In fullscreen mode, `screen.listen()` claims exclusive focus, preventing background apps from intercepting keys.",
    explanation: "Fullscreen mode secures uninterrupted keyboard game inputs.",
    hint: "How does listen() behave in fullscreen game displays?",
    level: "moderate",
    codeExample: "screen.setup(width=1.0, height=1.0); screen.listen()"
  },
  {
    question: "What is the Focus-In and Focus-Out event pair in GUI programming?",
    shortAnswer: "`<FocusIn>` fires when the window gains focus; `<FocusOut>` fires when the window loses focus (e.g. auto-pausing a game).",
    explanation: "Handling focus events allows games to automatically pause when minimized or tabbed out.",
    hint: "What events detect when a window gains or loses user attention?",
    level: "advanced",
    codeExample: "# Auto-pause game on <FocusOut>"
  },
  {
    question: "How can you auto-pause a Turtle game when the user clicks away from the window?",
    shortAnswer: "Bind Tkinter's `<FocusOut>` event to an `auto_pause()` callback using `screen.getcanvas().bind('<FocusOut>', on_focus_lost)`.",
    explanation: "Direct Tkinter widget binding enables low-level OS focus state detection.",
    hint: "How do you detect lost focus using Tkinter canvas bindings?",
    level: "expert",
    codeExample: "screen.getcanvas().bind('<FocusOut>', lambda e: pause_game())"
  },
  {
    question: "Why does clicking on the Turtle window title bar sometimes not transfer keyboard focus to the canvas?",
    shortAnswer: "Because clicking the title bar focuses the OS window frame rather than the inner Tkinter canvas widget.",
    explanation: "Calling `screen.listen()` forces focus directly onto the canvas widget itself.",
    hint: "Why is canvas-level focus distinct from window-frame focus?",
    level: "advanced",
    codeExample: "# canvas.focus_force() ensures canvas widget focus"
  },
  {
    question: "How do you verify in code that `screen.listen()` is functioning properly?",
    shortAnswer: "Bind a debug key (e.g. `screen.onkeypress(lambda: print('KEY_OK'), 'space')`) and test spacebar responses.",
    explanation: "Quick test callbacks confirm keyboard event capture pipeline integrity.",
    hint: "How do you test that listen() is capturing inputs successfully?",
    level: "basic",
    codeExample: "screen.onkeypress(lambda: print('OK'), 'space')"
  },
  {
    question: "What is the relationship between `screen.listen()` and `screen.tracer(0)`?",
    shortAnswer: "They operate independently; `tracer(0)` manages display double-buffering, while `listen()` manages keyboard event focus.",
    explanation: "Decoupling visual rendering from input focus allows simultaneous high-speed graphics and responsive controls.",
    hint: "Does tracer(0) affect how screen.listen() operates?",
    level: "moderate",
    codeExample: "screen.tracer(0)\nscreen.listen()"
  },
  {
    question: "How does `screen.listen()` handle non-English keyboard layouts (e.g. AZERTY, Cyrillic)?",
    shortAnswer: "It captures the Unicode keysym produced by the active OS keyboard layout.",
    explanation: "Tkinter resolves keys according to the operating system's active input method.",
    hint: "How are non-QWERTY keyboard layouts handled by listen()?",
    level: "moderate",
    codeExample: "# Resolves OS active keyboard layout keysyms"
  },
  {
    question: "Can multiple canvases in a multi-window Python app listen simultaneously?",
    shortAnswer: "No, only one canvas widget can hold active keyboard focus at any single instant.",
    explanation: "Focus must be transferred dynamically when users click between separate windows.",
    hint: "Can two windows hold keyboard focus at the exact same instant?",
    level: "moderate",
    codeExample: "# Focus shifts dynamically between windows"
  },
  {
    question: "What is a 'Phantom Key' issue when switching focus?",
    shortAnswer: "When a key is held down while focus is lost, causing the key to remain stuck in the 'down' state indefinitely.",
    explanation: "Releasing key states upon `<FocusOut>` prevents phantom sticky keys.",
    hint: "What happens if a key is held while alt-tabbing away from a game?",
    level: "advanced",
    codeExample: "def on_focus_lost(e): pressed_keys.clear()"
  },
  {
    question: "Why should games display a 'Click to Play' overlay when focus is lost?",
    shortAnswer: "To inform the user why controls aren't responding and prompt them to click to re-engage `screen.listen()`.",
    explanation: "Clear UX messaging prevents player confusion when focus drops.",
    hint: "Why do web and desktop games show 'Click to Resume' overlays?",
    level: "basic",
    codeExample: "# Show 'Click to Focus' overlay when unfocused"
  },
  {
    question: "How do you program a joystick or gamepad controller in Python Turtle?",
    shortAnswer: "Use a library like `pygame.joystick` or `inputs` in a timer loop, updating ship coordinates based on stick axis values.",
    explanation: "Timer loops can poll external hardware controllers alongside standard Turtle events.",
    hint: "How are external gamepads integrated into Turtle games?",
    level: "expert",
    codeExample: "# Poll pygame.joystick inside ontimer loop"
  },
  {
    question: "What is the difference between `canvas.focus_set()` and `canvas.focus_force()`?",
    shortAnswer: "`focus_set()` requests focus politely; `focus_force()` forcefully seizes focus even if another widget currently owns it.",
    explanation: "`screen.listen()` uses force-focus to ensure prompt input response.",
    hint: "Which focus method forcefully seizes keyboard attention?",
    level: "expert",
    codeExample: "# focus_force() guarantees immediate focus capture"
  },
  {
    question: "How do you bind hotkeys that work regardless of Caps Lock state?",
    shortAnswer: "Bind both lowercase and uppercase variants: `screen.onkeypress(fire, 'f'); screen.onkeypress(fire, 'F')`.",
    explanation: "Binding both cases ensures player controls work whether Caps Lock is on or off.",
    hint: "How do you ensure keys work regardless of Caps Lock?",
    level: "basic",
    codeExample: "screen.onkeypress(fire, 'f'); screen.onkeypress(fire, 'F')"
  },
  {
    question: "Why should `screen.listen()` always be paired with user instructions on screen?",
    shortAnswer: "So users immediately know which keys are bound and how to interact with the application.",
    explanation: "Displaying on-screen control guides improves user experience.",
    hint: "Why is displaying control instructions on screen a best practice?",
    level: "basic",
    codeExample: "t.write('Use Arrow Keys to Move')"
  },
  {
    question: "What is the 3-step Golden Rule for Keyboard Focus in Python Turtle?",
    shortAnswer: "1. Bind keys with `onkeypress()` | 2. Call `screen.listen()` | 3. Add auto-refocus inside `screen.onclick()`.",
    explanation: "This 3-step blueprint guarantees permanent, glitch-free keyboard responsiveness across all environments.",
    hint: "What 3 steps guarantee robust keyboard focus in Turtle?",
    level: "basic",
    codeExample: "# 1. Bind keys → 2. screen.listen() → 3. Auto-refocus on click"
  },
  {
    question: "How does understanding window focus prepare developers for web frontends?",
    shortAnswer: "Because web browsers manage focus across DOM elements using identical concepts: `element.focus()`, `element.blur()`, `tabIndex`, and focus traps.",
    explanation: "Window focus principles are universal across desktop and web application engineering.",
    hint: "How does desktop focus connect to DOM element.focus() in web development?",
    level: "basic",
    codeExample: "# Universal GUI window and DOM focus management"
  }
];

export default questions;
