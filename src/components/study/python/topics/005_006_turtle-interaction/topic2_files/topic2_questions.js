// src/components/study/python/topics/005_006_turtle-interaction/topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is the key difference between `screen.onkeypress()` and `screen.onkeyrelease()`?",
    shortAnswer: "`onkeypress()` fires the moment a key is depressed; `onkeyrelease()` fires when the physical key springs back up.",
    explanation: "Pairing press and release events enables continuous multi-key state tracking.",
    hint: "Which event fires on key down versus key up?",
    level: "basic",
    codeExample: "screen.onkeypress(press_handler, 'Up')\nscreen.onkeyrelease(release_handler, 'Up')"
  },
  {
    question: "Why does directly moving an object inside `onkeypress()` cause jerky, stuttering motion?",
    shortAnswer: "Because the OS introduces a 500ms initial repeat delay before sending repeated keystrokes.",
    explanation: "Direct event moving relies on OS typing repeat rates instead of the game's internal 60 FPS clock.",
    hint: "What OS typing behavior causes a stutter before continuous movement?",
    level: "basic",
    codeExample: "# BAD: def move_up(): t.forward(10)"
  },
  {
    question: "How do you achieve silky-smooth 60 FPS 8-directional movement in Python Turtle?",
    shortAnswer: "Maintain a `keys = {}` state dictionary toggled by `onkeypress`/`onkeyrelease`, and apply velocity inside a 16ms `ontimer` loop.",
    explanation: "Decoupling key state tracking from physics integration eliminates all input stutter.",
    hint: "What pattern tracks held keys for a 60 FPS physics loop?",
    level: "moderate",
    codeExample: "keys['Up'] = True\n# in loop: if keys['Up']: y += speed"
  },
  {
    question: "What is the exact keysym string for the Spacebar in Python Turtle?",
    shortAnswer: "`'space'` (all lowercase).",
    explanation: "Tkinter requires `'space'` in lowercase; writing `'Space'` or `'SPACE'` causes the binding to be ignored.",
    hint: "Is Space capitalized or lowercase in Turtle?",
    level: "basic",
    codeExample: "screen.onkeypress(fire, 'space')"
  },
  {
    question: "How do you bind the Enter / Return key in Python Turtle?",
    shortAnswer: "`'Return'` (capitalized R).",
    explanation: "Tkinter uses the standard X11 keysym `'Return'` for the Enter key.",
    hint: "What is the exact keysym string for the Enter key?",
    level: "basic",
    codeExample: "screen.onkeypress(start_game, 'Return')"
  },
  {
    question: "How do you handle diagonal movement (e.g. moving Up and Right simultaneously)?",
    shortAnswer: "Check both `keys['Up']` and `keys['Right']` on the same frame, applying both `vy += speed` and `vx += speed`.",
    explanation: "Key state dictionaries allow any number of simultaneous keys to combine vectors naturally.",
    hint: "How does a key state dictionary enable diagonal movement?",
    level: "moderate",
    codeExample: "if keys['Up']: y += speed\nif keys['Right']: x += speed"
  },
  {
    question: "What is the exact keysym string for the Escape key?",
    shortAnswer: "`'Escape'` (capitalized E).",
    explanation: "Standard Tkinter keysym string for the Esc key.",
    hint: "How is the Escape key formatted in Turtle?",
    level: "basic",
    codeExample: "screen.onkeypress(pause_game, 'Escape')"
  },
  {
    question: "Why should you bind both `'w'` and `'W'` for character movement?",
    shortAnswer: "Because keypress strings are case-sensitive; binding only `'w'` fails when the player has Caps Lock turned on.",
    explanation: "Binding both uppercase and lowercase variants prevents Caps Lock control lockouts.",
    hint: "Why is case sensitivity important for WASD controls?",
    level: "basic",
    codeExample: "screen.onkeypress(move_w, 'w')\nscreen.onkeypress(move_w, 'W')"
  },
  {
    question: "How do you bind the 4 Arrow Keys in Python Turtle?",
    shortAnswer: "`'Up'`, `'Down'`, `'Left'`, `'Right'` (all with capitalized initial letters).",
    explanation: "Tkinter standardizes arrow keys as title-cased direction names.",
    hint: "What are the keysym names for the 4 arrow keys?",
    level: "basic",
    codeExample: "for k in ['Up', 'Down', 'Left', 'Right']: screen.onkeypress(handlers[k], k)"
  },
  {
    question: "What is Key Ghosting / Key Jamming in hardware keyboards?",
    shortAnswer: "A hardware limitation where cheap keyboards cannot register more than 3 simultaneous keypresses in the same circuit zone.",
    explanation: "Gaming keyboards use anti-ghosting matrices to allow 10+ simultaneous keypresses.",
    hint: "What hardware limitation prevents multiple simultaneous keys from registering?",
    level: "advanced",
    codeExample: "# Hardware key ghosting limitation"
  },
  {
    question: "How do you normalize diagonal movement speed so diagonal flight isn't 41% faster?",
    shortAnswer: "If moving diagonally, divide displacement by `sqrt(2)` (~1.414) so total speed equals `speed`.",
    explanation: "Vector normalization prevents the classic diagonal speed boost exploit.",
    hint: "Why is vector normalization required for diagonal movement?",
    level: "moderate",
    codeExample: "if dx != 0 and dy != 0:\n    dx *= 0.7071; dy *= 0.7071"
  },
  {
    question: "What is the keysym string for the Backspace key in Turtle?",
    shortAnswer: "`'BackSpace'` (capital B and capital S).",
    explanation: "Tkinter uses camel-cased `'BackSpace'` for the backspace key.",
    hint: "How is the Backspace key formatted in keysym strings?",
    level: "moderate",
    codeExample: "screen.onkeypress(delete_char, 'BackSpace')"
  },
  {
    question: "How do you bind the Tab key in Python Turtle?",
    shortAnswer: "`'Tab'` (capital T).",
    explanation: "Tkinter standard keysym for the tabulator key.",
    hint: "What is the keysym name for the Tab key?",
    level: "basic",
    codeExample: "screen.onkeypress(switch_target, 'Tab')"
  },
  {
    question: "How do you bind number keys (0 through 9) across the top of the keyboard?",
    shortAnswer: "Pass string literals `'0'`, `'1'`, `'2'`, ... `'9'` to `onkeypress`.",
    explanation: "Numeric keys match their single-character string representations.",
    hint: "How are numeric keys bound in onkeypress?",
    level: "basic",
    codeExample: "screen.onkeypress(select_weapon_1, '1')"
  },
  {
    question: "What is the difference between `screen.onkey(fun, key)` and `screen.onkeypress(fun, key)` in Python 3.12+?",
    shortAnswer: "In modern Python Turtle, `onkey` and `onkeypress` are identical aliases that bind keypress events.",
    explanation: "In historical Python 2.x, `onkey` bound to key release; modern versions standardized `onkey` to keypress.",
    hint: "Are onkey and onkeypress interchangeable in modern Python?",
    level: "moderate",
    codeExample: "screen.onkeypress(fn, 'space')"
  },
  {
    question: "How do you create an interactive cheat code sequence (e.g. Konami Code: Up Up Down Down)?",
    shortAnswer: "Append pressed keys to a `history` list and check if `history[-10:] == konami_sequence` on each keypress.",
    explanation: "Buffer slicing easily matches secret input sequences.",
    hint: "How are cheat code input sequences detected in code?",
    level: "advanced",
    codeExample: "if key_history[-4:] == ['Up', 'Up', 'Down', 'Down']: unlock_cheat()"
  },
  {
    question: "How do you bind function keys (`F1` through `F12`) in Turtle?",
    shortAnswer: "Use strings `'F1'`, `'F2'`, ... `'F12'` (capital F followed by number).",
    explanation: "Standard keysym names for keyboard function row keys.",
    hint: "How are F1 to F12 keys bound in Turtle?",
    level: "basic",
    codeExample: "screen.onkeypress(toggle_fullscreen, 'F11')"
  },
  {
    question: "Why does pressing and holding a key trigger multiple `onkeypress` events on Windows?",
    shortAnswer: "Windows OS fires repeated keydown messages based on system keyboard repeat delay settings.",
    explanation: "Key state dictionaries ignore duplicate keypress signals once `keys[k] = True` is already set.",
    hint: "Why does the OS send duplicate keydown messages during holds?",
    level: "advanced",
    codeExample: "# Key state dict naturally deduplicates OS key repeats"
  },
  {
    question: "How do you clear all active keys when the game is paused or loses focus?",
    shortAnswer: "`for k in keys: keys[k] = False` or `keys.clear()`.",
    explanation: "Wiping active key states prevents 'phantom sticky key' bugs upon resuming.",
    hint: "How do you reset all held keys upon pausing?",
    level: "basic",
    codeExample: "for k in keys_pressed: keys_pressed[k] = False"
  },
  {
    question: "How do you bind punctuation keys like Plus, Minus, Comma, Period?",
    shortAnswer: "Use their literal characters: `'+'`, `'-'`, `','`, `'.'`. (or keysyms `'plus'`, `'minus'`).",
    explanation: "Punctuation characters can be bound directly.",
    hint: "How are plus and minus keys bound in onkeypress?",
    level: "basic",
    codeExample: "screen.onkeypress(zoom_in, '+'); screen.onkeypress(zoom_out, '-')"
  },
  {
    question: "What is Key Mapping / Re-binding in game options menus?",
    shortAnswer: "Storing actions in a dictionary (e.g. `controls['jump'] = 'space'`) and dynamically rebinding `onkeypress` based on user config.",
    explanation: "Abstracting physical keys to logical actions allows custom player keybindings.",
    hint: "How do custom key remapping systems work in games?",
    level: "advanced",
    codeExample: "controls = {'jump': 'space', 'fire': 'f'}"
  },
  {
    question: "How do you create a smooth car steering system with acceleration and steering angle?",
    shortAnswer: "Up/Down adjusts `speed += acceleration`; Left/Right adjusts `heading += turn_speed`; position steps along `heading` vector.",
    explanation: "Car steering separates throttle acceleration from rotational angular velocity.",
    hint: "How does car steering physics differ from 4-directional grid movement?",
    level: "moderate",
    codeExample: "if keys['Up']: speed += 0.5\nif keys['Left']: angle += 5"
  },
  {
    question: "What is the keysym string for the Delete key in Python Turtle?",
    shortAnswer: "`'Delete'` (capital D).",
    explanation: "Tkinter standard keysym for the forward delete key.",
    hint: "What is the keysym string for Delete?",
    level: "basic",
    codeExample: "screen.onkeypress(delete_selected, 'Delete')"
  },
  {
    question: "How do you bind mouse buttons alongside keyboard inputs?",
    shortAnswer: "Use `screen.onclick()` for left click, `screen.onclick(fun, 2)` for middle click, and `screen.onclick(fun, 3)` for right click.",
    explanation: "Turtle supports all 3 primary mouse buttons.",
    hint: "How do you bind middle and right mouse clicks in Turtle?",
    level: "moderate",
    codeExample: "screen.onclick(primary_fire, 1)\nscreen.onclick(alt_fire, 3)"
  },
  {
    question: "Why should player movement speeds be expressed in pixels-per-second rather than pixels-per-frame?",
    shortAnswer: "To ensure that multiplying by delta-time `dt` produces identical real-world movement speed across all computer displays.",
    explanation: "Framerate-independent kinematic design guarantees fair multiplayer and consistent gameplay.",
    hint: "Why express movement in pixels/sec with delta time?",
    level: "moderate",
    codeExample: "x += speed_px_per_sec * dt"
  },
  {
    question: "How do you bind WASD controls efficiently using a loop?",
    shortAnswer: "`for k in ['w', 'a', 's', 'd']: screen.onkeypress(partial(set_key, k, True), k); screen.onkeyrelease(partial(set_key, k, False), k)`.",
    explanation: "Loops combined with `functools.partial` bind multi-key pairs cleanly in 2 lines.",
    hint: "How can a loop bind WASD press and release pairs compactly?",
    level: "advanced",
    codeExample: "for k in ['w','a','s','d']: bind_press_release(k)"
  },
  {
    question: "What is the difference between Discrete Actions (e.g. jump/fire) and Continuous Actions (e.g. walk/steer)?",
    shortAnswer: "Discrete actions execute once per key tap; continuous actions require holding the key down over multiple animation frames.",
    explanation: "Discrete actions use single callbacks; continuous actions use key state dictionaries.",
    hint: "How do one-shot actions differ from continuous held movement?",
    level: "basic",
    codeExample: "# Discrete: fire_bullet() | Continuous: keys['Right'] = True"
  },
  {
    question: "How do you implement rapid-fire automatic weapons while spacebar is held down?",
    shortAnswer: "Set `keys['space'] = True` on press; inside the 60 FPS loop, fire a bullet every 10 frames if `keys['space']` is True.",
    explanation: "Cooldown frame timers combined with key state tracking create automatic firing mechanisms.",
    hint: "How do cooldown timers create automatic firing loops?",
    level: "moderate",
    codeExample: "if keys['space'] and cooldown == 0: fire(); cooldown = 10"
  },
  {
    question: "What is the 3-step Golden Rule for Professional Keyboard Input in Python Turtle?",
    shortAnswer: "1. Maintain a `keys` state dictionary | 2. Bind `onkeypress` to True and `onkeyrelease` to False | 3. Update physics in 60 FPS `ontimer` loop.",
    explanation: "This 3-step blueprint guarantees butter-smooth, arcade-grade multi-key control.",
    hint: "What 3 steps build professional multi-key flight controls in Turtle?",
    level: "basic",
    codeExample: "# 1. Key dict -> 2. onkeypress/onkeyrelease pairs -> 3. 60 FPS loop"
  },
  {
    question: "How does key state dictionary tracking prepare developers for game development in PyGame and Unity?",
    shortAnswer: "Because PyGame's `pygame.key.get_pressed()` and Unity's `Input.GetKey()` use the exact same continuous boolean state polling architecture.",
    explanation: "Continuous input architecture is universal across all commercial game engines.",
    hint: "How does Turtle key state tracking map to PyGame and Unity input systems?",
    level: "basic",
    codeExample: "# Direct mapping to PyGame and Unity input architecture"
  }
];

export default questions;
