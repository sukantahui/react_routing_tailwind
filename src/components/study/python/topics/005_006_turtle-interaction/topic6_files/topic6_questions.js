// src/components/study/python/topics/005_006_turtle-interaction/topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is a Finite State Machine (FSM) in software architecture?",
    shortAnswer: "A behavioral design pattern where an application exists in exactly one state at a time from a finite set of states (e.g. MENU, PLAYING, PAUSED, GAME_OVER).",
    explanation: "FSMs eliminate chaotic spaghetti flags by establishing clear transitions between discrete application modes.",
    hint: "What pattern models application lifecycle as discrete mutually exclusive states?",
    level: "basic",
    codeExample: "state = 'MENU'  # 'MENU' -> 'PLAYING' -> 'GAME_OVER'"
  },
  {
    question: "How does an FSM prevent keyboard inputs from moving a player while the game is paused?",
    shortAnswer: "By checking `if state == 'PLAYING': move_player()` inside the key handler or physics loop.",
    explanation: "State checks filter out inappropriate actions in non-playable states.",
    hint: "How does checking state prevent inputs during pause?",
    level: "basic",
    codeExample: "if state != 'PLAYING': return"
  },
  {
    question: "What is State-Driven Input Routing?",
    shortAnswer: "Mapping a single physical key (e.g. Spacebar) to different logical actions based on current state (Start in Menu, Jump in Playing, Restart in Game Over).",
    explanation: "Centralizes event dispatching and prevents key conflict bugs.",
    hint: "What technique dispatches the same key to different actions depending on state?",
    level: "moderate",
    codeExample: "def on_space():\n    if state == 'MENU': start()\n    elif state == 'GAME_OVER': restart()"
  },
  {
    question: "What happens to the physics loop when a game enters the `PAUSED` state?",
    shortAnswer: "Kinematic position updates (`x += vx`) are skipped, but the screen continues redrawing the frozen scene and pause menu.",
    explanation: "Freezing physics preserves entity positions while keeping the GUI responsive.",
    hint: "How does pausing affect physics versus rendering?",
    level: "basic",
    codeExample: "if state == 'PLAYING': update_physics()"
  },
  {
    question: "How do you implement a Restart / Play Again feature cleanly in an FSM?",
    shortAnswer: "Call a `reset_game()` function that resets score to 0, restores player health/lives, clears active bullets/enemies, and transitions state to `PLAYING`.",
    explanation: "Centralized reset functions guarantee clean restarts without lingering residual state.",
    hint: "What function re-initializes all game state variables upon restart?",
    level: "basic",
    codeExample: "def reset_game():\n    score = 0; lives = 3; entities.clear(); state = 'PLAYING'"
  },
  {
    question: "What is the Transition Function in state machine theory?",
    shortAnswer: "The logic that dictates when and how the system changes from its current state to a target state based on an event trigger.",
    explanation: "Transitions enforce valid state paths (e.g. Cannot transition from PAUSED directly to GAME_OVER without resuming).",
    hint: "What logic validates moving from one state to another?",
    level: "moderate",
    codeExample: "# State Transition: MENU -> PLAYING -> PAUSED -> PLAYING"
  },
  {
    question: "Why is an enum or string state variable better than 5 separate booleans (`is_menu`, `is_paused`, `is_gameover`)?",
    shortAnswer: "Because booleans can enter invalid contradictory states (e.g. `is_menu=True` AND `is_gameover=True`), whereas a single state variable guarantees mutual exclusivity.",
    explanation: "Eliminates illegal multi-state race conditions.",
    hint: "Why avoid multiple independent booleans for game states?",
    level: "moderate",
    codeExample: "# GOOD: state = 'PAUSED'\n# BAD: is_paused = True; is_playing = True"
  },
  {
    question: "How do you render a semi-transparent modal pause dialog box in Turtle?",
    shortAnswer: "Draw the frozen game world, then draw a dark centered rectangle with bright text overlay (`PAUSED - Press P to Resume`).",
    explanation: "Modal overlays provide immediate visual confirmation of the paused state.",
    hint: "How is a modal pause menu rendered over the game canvas?",
    level: "moderate",
    codeExample: "draw_game_world(); if is_paused: draw_pause_modal()"
  },
  {
    question: "What is High Score Persistence across game sessions?",
    shortAnswer: "Saving the highest achieved score to a local text/JSON file (`highscore.json`) and loading it at startup in the `MENU` state.",
    explanation: "Persistent file I/O keeps player records intact across program restarts.",
    hint: "How are high scores saved between game sessions?",
    level: "moderate",
    codeExample: "with open('highscore.txt', 'w') as f: f.write(str(high_score))"
  },
  {
    question: "What is the State Pattern in Object-Oriented Programming (GoF)?",
    shortAnswer: "An OOP design pattern where each state is a separate class with `update()`, `draw()`, and `handle_input()` methods.",
    explanation: "The State pattern allows large game engines to swap entire state objects polymorphically.",
    hint: "What OOP pattern encapsulates states as Polymorphic classes?",
    level: "advanced",
    codeExample: "class PlayingState:\n    def update(self): ...\n    def draw(self): ..."
  },
  {
    question: "How do you handle Level Progression transitions (e.g. Level 1 -> Level 2)?",
    shortAnswer: "When all enemies are cleared, transition to `LEVEL_TRANSITION` state, display 'LEVEL COMPLETED', and load Level 2 after 2 seconds.",
    explanation: "Staged transitions give players a rewarding pause between difficulty tiers.",
    hint: "What state handles rewards between game stages?",
    level: "moderate",
    codeExample: "if len(enemies) == 0: state = 'LEVEL_CLEAR'"
  },
  {
    question: "Why should sound effects (BGM) be paused or muted when entering the `PAUSED` state?",
    shortAnswer: "To match the visual freeze and provide an auditory cue that action has halted.",
    explanation: "Audio-visual synchronization reinforces game state clarity.",
    hint: "Why should music mute or pause in pause menus?",
    level: "basic",
    codeExample: "if state == 'PAUSED': bgm.pause()"
  },
  {
    question: "How do you prevent 'Input Bleed' when switching between states?",
    shortAnswer: "Wipe active key press states (`keys.clear()`) whenever transitioning between states.",
    explanation: "Prevents a jump or fire action queued in the menu from firing automatically in the first frame of gameplay.",
    hint: "How do you clear held keys upon transitioning into gameplay?",
    level: "advanced",
    codeExample: "keys.clear()  # Prevent input bleed"
  },
  {
    question: "What is a Splash / Loading Screen in game lifecycles?",
    shortAnswer: "An initial `SPLASH` state that displays company branding and loads assets into memory before displaying the main menu.",
    explanation: "Splash states mask asset preloading and initialization.",
    hint: "What initial state displays company logos before the main menu?",
    level: "basic",
    codeExample: "# SPLASH -> MAIN_MENU"
  },
  {
    question: "How do you animate a blinking 'PRESS SPACE TO START' banner in the `MENU` state?",
    shortAnswer: "Use modulo arithmetic on the frame counter: `if (frame // 30) % 2 == 0: draw_text()`.",
    explanation: "Periodic frame modulo toggles visibility every 0.5 seconds.",
    hint: "How does frame modulo create retro blinking text?",
    level: "basic",
    codeExample: "if (frame // 30) % 2 == 0: draw_press_space()"
  },
  {
    question: "What is State Stack (Pushdown Automaton) in nested UI menus?",
    shortAnswer: "Pushing sub-menus (e.g. Audio Settings) onto a stack, so pressing Escape pops back to the previous Pause menu.",
    explanation: "Stack architectures manage multi-level hierarchical menus cleanly.",
    hint: "What data structure manages nested pause and settings submenus?",
    level: "expert",
    codeExample: "state_stack.push('SETTINGS'); state_stack.pop()"
  },
  {
    question: "How do you implement an Invulnerability / Spawn Shield state after player respawn?",
    shortAnswer: "Set `invulnerable_timer = 120` (2 seconds); during this window, skip collision checks and blink the player sprite.",
    explanation: "Spawn shields prevent unfair instant deaths upon respawning.",
    hint: "What timer protects newly respawned players from instant death?",
    level: "moderate",
    codeExample: "if player.invulnerable: blink_sprite(); return"
  },
  {
    question: "What is Game Loop Decoupling in state machines?",
    shortAnswer: "Keeping the main 60 FPS loop running continuously, delegating update/draw execution to whichever state is active.",
    explanation: "Avoids tearing down and rebuilding the event loop on state transitions.",
    hint: "Why should one outer loop manage all application states?",
    level: "moderate",
    codeExample: "while True: state_handlers[current_state]()"
  },
  {
    question: "How do you display game statistics (Accuracy, Enemies Killed, Time Elapsed) on the `GAME_OVER` screen?",
    shortAnswer: "Track telemetry metrics in the `game_state` dictionary and render them inside the `GAME_OVER` branch.",
    explanation: "End-game summary screens enhance replayability.",
    hint: "Where are end-game player statistics displayed?",
    level: "basic",
    codeExample: "t.write(f'ACCURACY: {hits/shots*100:.1f}%')"
  },
  {
    question: "What is an Escape Key Menu Hierarchy?",
    shortAnswer: "Esc in game opens Pause menu; Esc in Pause menu resumes; Esc in Main Menu prompts to Quit.",
    explanation: "Consistent Escape routing provides intuitive navigation across desktop applications.",
    hint: "How does Escape key navigation work across game screens?",
    level: "moderate",
    codeExample: "# Esc: In-Game -> Pause | Pause -> Resume | Menu -> Exit"
  },
  {
    question: "How do you implement a Victory / Game Won state?",
    shortAnswer: "When final boss health reaches 0 or all 10 levels are beaten, transition to `VICTORY`, display fireworks and credits.",
    explanation: "Victory states reward player campaign completion.",
    hint: "What state celebrates completing all game levels?",
    level: "basic",
    codeExample: "if boss_health <= 0: state = 'VICTORY'"
  },
  {
    question: "What is Delta-Time freezing during Pause?",
    shortAnswer: "Setting `dt = 0` while paused, so all kinematic equations (`pos += vel * dt`) automatically calculate zero displacement.",
    explanation: "Zero-scaling delta-time freezes entire physics worlds instantly with zero special-case code.",
    hint: "How does setting dt = 0 freeze physics cleanly?",
    level: "advanced",
    codeExample: "dt = 0 if is_paused else measured_dt"
  },
  {
    question: "How do you prevent players from pausing during fatal death animations?",
    shortAnswer: "Transition directly to a `DYING` state that disables pause key bindings until the death animation finishes.",
    explanation: "Prevents players from breaking death sequences with pause glitches.",
    hint: "How do state machines lock out inputs during cutscenes and death animations?",
    level: "advanced",
    codeExample: "if state == 'DYING': ignore_pause_keys()"
  },
  {
    question: "What is State Serialization for Save Games?",
    shortAnswer: "Writing the entire `game_state` dictionary to a file using `json.dump()`, allowing players to resume their exact progress later.",
    explanation: "State serialization enables robust game saving and loading.",
    hint: "What process converts in-memory game state dictionaries to disk files?",
    level: "advanced",
    codeExample: "with open('save.json', 'w') as f: json.dump(game_state, f)"
  },
  {
    question: "How do you build an interactive Character Selection screen in the `MENU` state?",
    shortAnswer: "Display 3 character avatars; Left/Right arrow keys change `selected_char_idx`, updating stats preview before launching `PLAYING`.",
    explanation: "Character select screens configure starting player attributes.",
    hint: "How are character select menus constructed in Turtle?",
    level: "moderate",
    codeExample: "player['speed'] = characters[selected_idx]['speed']"
  },
  {
    question: "Why should `screen.tracer(0)` and `screen.update()` remain active across all states?",
    shortAnswer: "To ensure silky smooth rendering whether drawing static menu text, paused overlays, or 60 FPS gameplay.",
    explanation: "Unified rendering prevents screen flicker across state switches.",
    hint: "Why maintain double-buffering across all game states?",
    level: "basic",
    codeExample: "# Double-buffering active in Menu, Play, and Pause"
  },
  {
    question: "What is Confirmation Prompt in game exits?",
    shortAnswer: "Transitioning to `QUIT_CONFIRM` state ('Are you sure you want to quit? [Y/N]') before closing the application.",
    explanation: "Prevents accidental loss of game progress.",
    hint: "What dialog prevents accidental quitting?",
    level: "basic",
    codeExample: "state = 'CONFIRM_QUIT'"
  },
  {
    question: "What is the 3-step Golden Rule for Game State Management in Python Turtle?",
    shortAnswer: "1. Encapsulate state in an FSM variable | 2. Route inputs and physics by active state | 3. Render state-specific visuals with unified `screen.update()`.",
    explanation: "This 3-step blueprint forms the structural architecture of commercial games.",
    hint: "What 3 steps build robust game state management in Turtle?",
    level: "basic",
    codeExample: "# 1. state enum -> 2. Branch inputs & physics -> 3. Branch draw"
  },
  {
    question: "How does learning FSMs prepare students for professional software engineering?",
    shortAnswer: "Because Finite State Machines power network protocols (TCP handshakes), authentication lifecycles (OAuth), shopping checkouts, and UI state managers (Redux/XState).",
    explanation: "State machines are one of the most widely used architectural models in enterprise software engineering.",
    hint: "How do game state machines connect to enterprise software engineering?",
    level: "basic",
    codeExample: "# Universal FSM software architecture"
  },
  {
    question: "Why is code cleanliness and FSM design essential before adding 20 features to a game?",
    shortAnswer: "Without an FSM, adding new features creates exponential tangled boolean flags that cause endless game-breaking bugs.",
    explanation: "FSMs provide clear boundaries, making games effortlessly extensible.",
    hint: "Why do clean state machines prevent bug explosions as games grow?",
    level: "basic",
    codeExample: "# Extensible, modular, bug-free game architecture"
  }
];

export default questions;
