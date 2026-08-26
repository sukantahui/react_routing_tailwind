// src/components/study/python/topics/005_006_turtle-interaction/topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is Bounding Box Hit-Testing for canvas UI buttons?",
    shortAnswer: "Checking if a click point `(x, y)` satisfies `btn.x <= x <= btn.x + btn.w` and `btn.y <= y <= btn.y + btn.h`.",
    explanation: "Allows building lightweight, scalable UI buttons using data dictionaries without spawning multiple turtle instances.",
    hint: "What mathematical condition checks if a point lies inside a rectangle?",
    level: "basic",
    codeExample: "if (bx <= x <= bx + bw) and (by <= y <= by + bh): fire_action()"
  },
  {
    question: "What is the main advantage of Turtle Sprite Buttons (`turtle.onclick`) over manual bounding boxes?",
    shortAnswer: "`turtle.onclick` leverages Tkinter's native C hit-testing automatically and makes tactile click scaling animations effortless.",
    explanation: "Sprite buttons handle coordinate transformation and hit-testing out of the box.",
    hint: "Why use turtle.onclick for interactive buttons?",
    level: "basic",
    codeExample: "btn_turtle.onclick(handle_click)"
  },
  {
    question: "How do you create a tactile button depression animation upon clicking?",
    shortAnswer: "Temporarily scale the button smaller (`shapesize(0.9 * scale)`) on click, and restore original size after 100ms using `ontimer`.",
    explanation: "Provides immediate visual and physical feedback to the user.",
    hint: "How is physical button compression animated in Turtle?",
    level: "moderate",
    codeExample: "btn.shapesize(2.2, 5.5); screen.ontimer(lambda: btn.shapesize(2.5, 6), 100)"
  },
  {
    question: "What are the 4 standard states of a modern UI button?",
    shortAnswer: "1. Normal (idle) | 2. Hover (mouse over) | 3. Active / Pressed (clicking) | 4. Disabled (unclickable greyed out).",
    explanation: "Standard design system button lifecycle states.",
    hint: "What are the 4 fundamental UI button states?",
    level: "basic",
    codeExample: "# States: NORMAL, HOVER, PRESSED, DISABLED"
  },
  {
    question: "How do you center text labels inside a rectangular button in Turtle?",
    shortAnswer: "Write at `(btn.x + btn.w / 2, btn.y + vertical_offset)` with `align='center'`.",
    explanation: "Align='center' positions text typography symmetrically within the button bounding box.",
    hint: "What coordinate centers text inside a rectangle?",
    level: "basic",
    codeExample: "t.goto(bx + bw/2, by + bh/2 - 6); t.write('START', align='center')"
  },
  {
    question: "What is a Toggle Button (Switch)?",
    shortAnswer: "A button that alternates between two boolean states upon each click (e.g. SOUND ON ↔ SOUND OFF).",
    explanation: "Toggles store boolean state and update label/color dynamically.",
    hint: "What button alternates between two states on each click?",
    level: "basic",
    codeExample: "is_muted = not is_muted; update_label()"
  },
  {
    question: "How do you style a Disabled button in Turtle?",
    shortAnswer: "Render with muted grey background (`#334155`), dark grey text (`#64748b`), and ignore click events inside its bounding box.",
    explanation: "Visual styling and disabled event guards prevent invalid user actions.",
    hint: "How are disabled buttons rendered and guarded?",
    level: "moderate",
    codeExample: "if btn.disabled: return"
  },
  {
    question: "What is a Docked Toolbar Ribbon in application design?",
    shortAnswer: "A dedicated persistent bar anchored along the screen edge containing action buttons (Play, Pause, Reset, Settings).",
    explanation: "Docked ribbons organize application controls cleanly without cluttering the main game arena.",
    hint: "What UI layout anchors action buttons along the screen edge?",
    level: "moderate",
    codeExample: "# Bottom-docked dashboard ribbon"
  },
  {
    question: "How do you render rounded corner buttons (Capsules/Pills) in Python Turtle?",
    shortAnswer: "Draw horizontal rectangles capped by semicircles on both ends using `t.circle(radius, 180)`.",
    explanation: "Capsule buttons provide modern, sleek UI aesthetics.",
    hint: "How are rounded pill buttons constructed geometrically?",
    level: "moderate",
    codeExample: "t.forward(w); t.circle(r, 180); t.forward(w); t.circle(r, 180)"
  },
  {
    question: "How do you create a Radio Button Group where only one option can be active at a time?",
    shortAnswer: "Store a single `active_id` variable; clicking any option sets `active_id = chosen_id` and re-renders all radio buttons.",
    explanation: "Mutual exclusivity ensures single-choice selection (e.g. Difficulty: Easy / Normal / Hard).",
    hint: "How do radio button groups enforce single selection?",
    level: "advanced",
    codeExample: "selected_difficulty = 'HARD'; render_radios()"
  },
  {
    question: "What is Event Debouncing on fast button clicks?",
    shortAnswer: "Ignoring subsequent clicks for 200ms after a click to prevent double-triggering actions like starting multiple game loops.",
    explanation: "Debounce guards protect against accidental multi-clicks.",
    hint: "What prevents accidental double clicks on buttons?",
    level: "advanced",
    codeExample: "if now - last_click < 0.2: return; last_click = now"
  },
  {
    question: "Why should buttons be defined in a structured data list (`buttons = [...]`)?",
    shortAnswer: "Data-driven UI allows adding, styling, and repositioning 10+ buttons by simply editing a list without changing rendering loops.",
    explanation: "Separates UI configuration data from rendering mechanics (DRY principle).",
    hint: "Why use data-driven button lists rather than hardcoded code blocks?",
    level: "moderate",
    codeExample: "buttons = [{'id': 'save', 'x': 0, 'y': 0, 'w': 100, 'h': 40}]"
  },
  {
    question: "How do you create an interactive audio volume toggle with volume bars in Turtle?",
    shortAnswer: "Draw 5 vertical volume bars; clicking bar `i` sets `volume = (i + 1) * 20%` and colors active bars cyan.",
    explanation: "Segmented volume meters provide intuitive visual feedback.",
    hint: "How is an interactive 5-bar volume widget constructed?",
    level: "moderate",
    codeExample: "for i in range(5): draw_bar(i < active_vol)"
  },
  {
    question: "What is Mouse-Over Hover Detection on Tkinter canvas?",
    shortAnswer: "Binding `<Motion>` to check if the mouse pointer is inside a button rectangle, changing button background color to a lighter tint.",
    explanation: "Hover lighting highlights interactive targets before clicking.",
    hint: "What event detects mouse movement over canvas elements?",
    level: "advanced",
    codeExample: "canvas.bind('<Motion>', check_hover)"
  },
  {
    question: "How do you build a Dropdown Select Menu in Turtle?",
    shortAnswer: "Clicking the header button expands a vertical list of option buttons; selecting an option updates the header and collapses the menu.",
    explanation: "Dynamic dropdowns conserve screen space until activated.",
    hint: "How do expandable dropdown select menus function?",
    level: "advanced",
    codeExample: "is_open = not is_open; if is_open: draw_options()"
  },
  {
    question: "Why should `screen.tracer(0)` and `screen.update()` be used when rendering UI toolbars?",
    shortAnswer: "To draw all buttons, borders, and text labels instantly in RAM, avoiding visual button flickering.",
    explanation: "Double-buffering delivers crisp, professional UI redraws.",
    hint: "Why is double-buffering required for clean UI dashboards?",
    level: "basic",
    codeExample: "screen.tracer(0); render_toolbar(); screen.update()"
  },
  {
    question: "How do you implement an interactive Modal Confirmation Dialog ('Are you sure?')?",
    shortAnswer: "Dim the background; draw a centered card with message text and two clickable buttons: '[YES, QUIT]' and '[CANCEL]'.",
    explanation: "Confirmation modals prevent accidental loss of game progress.",
    hint: "How are confirmation dialogs constructed in canvas UIs?",
    level: "moderate",
    codeExample: "draw_modal('Quit Game?'); draw_btn('Yes'); draw_btn('Cancel')"
  },
  {
    question: "What is Button Padding and Margin in UI layout design?",
    shortAnswer: "Padding is the space between button text and border; margin is the spacing between adjacent buttons.",
    explanation: "Consistent padding and margins create harmonious, readable interfaces.",
    hint: "What terms describe internal and external button spacing?",
    level: "basic",
    codeExample: "# Padding & Margin spacing standards"
  },
  {
    question: "How do you create an animated Loading Spinner button?",
    shortAnswer: "While an async operation loads, replace button text with a rotating arc `t.circle(12, 90)` updated on an `ontimer` loop.",
    explanation: "Loading animations inform users that work is in progress.",
    hint: "How do button loading spinners indicate async tasks?",
    level: "advanced",
    codeExample: "spinner_angle = (spinner_angle + 30) % 360"
  },
  {
    question: "How do you bind hotkey accelerators to UI buttons (e.g. Space to trigger Play button)?",
    shortAnswer: "Bind both `screen.onclick` to the button bounding box AND `screen.onkeypress` to the same action handler function.",
    explanation: "Allows users to trigger actions via mouse clicks or keyboard shortcuts interchangeably.",
    hint: "How do you connect both mouse clicks and keyboard hotkeys to one action?",
    level: "basic",
    codeExample: "screen.onkeypress(toggle_play, 'space')"
  },
  {
    question: "What is an Icon Button (Glyph Button)?",
    shortAnswer: "A compact button containing a vector symbol (e.g. ⚙, 🔊, ▶, ✕) rather than full text.",
    explanation: "Icon buttons maximize canvas real estate in tight toolbars.",
    hint: "What type of button displays symbols instead of text words?",
    level: "basic",
    codeExample: "btn['label'] = '⚙'"
  },
  {
    question: "How do you calculate grid coordinates for a 3x3 Button Keypad (Calculator/Pinpad)?",
    shortAnswer: "`row = i // 3; col = i % 3; x = start_x + col*(w + gap); y = start_y - row*(h + gap)`.",
    explanation: "Modulo and integer division formulas lay out button matrices automatically.",
    hint: "What formula positions buttons into 2D grid matrix rows and columns?",
    level: "moderate",
    codeExample: "x = start_x + (i % 3)*60; y = start_y - (i // 3)*60"
  },
  {
    question: "Why should button hit boxes be slightly larger than the visual text itself?",
    shortAnswer: "To provide a generous clickable area (Fitts's Law), making buttons effortless to click without requiring pixel-perfect mouse precision.",
    explanation: "Fitts's Law is a foundational principle of human-computer interaction.",
    hint: "What HCI principle states larger clickable areas improve speed and accuracy?",
    level: "moderate",
    codeExample: "# Fitts's Law generous click target padding"
  },
  {
    question: "How do you implement a Tooltip on canvas buttons?",
    shortAnswer: "When hover is detected over a button for > 0.5s, draw a small floating black bubble with helpful explanatory text.",
    explanation: "Tooltips explain icon button functions without cluttering the main UI.",
    hint: "What UI element pops up explanatory text when hovering over buttons?",
    level: "advanced",
    codeExample: "draw_tooltip(x, y + 30, 'Mute Audio')"
  },
  {
    question: "How do you play custom sound effects on button clicks in Python?",
    shortAnswer: "Invoke `playsound('click.wav')` or `pygame.mixer.Sound('click.wav').play()` inside the click handler.",
    explanation: "Audio feedback provides crisp multimodal confirmation of user input.",
    hint: "How is audio feedback added to button clicks?",
    level: "moderate",
    codeExample: "def on_click(x, y): play_sound('click.wav'); action()"
  },
  {
    question: "What is Dynamic Color Theming (Dark Mode ↔ Light Mode) for canvas UIs?",
    shortAnswer: "Storing color palette tokens in a dictionary (`theme = {'bg': '#020617', 'card': '#0f172a'}`) and swapping dictionaries upon toggle.",
    explanation: "Centralized design tokens allow instantaneous whole-app theme swapping.",
    hint: "How are design tokens used to toggle Dark and Light themes?",
    level: "moderate",
    codeExample: "theme = dark_palette if is_dark else light_palette"
  },
  {
    question: "Why is a custom GUI canvas engine better than mixing Tkinter native buttons into Turtle?",
    shortAnswer: "Because native OS Tkinter buttons sit in separate window layers that don't scale with canvas coordinates, don't export to EPS, and look like 1995 Windows 95 widgets.",
    explanation: "Pure canvas vector buttons look modern, match game art themes, and scale with graphics.",
    hint: "Why draw custom canvas buttons rather than using default Tkinter widget buttons?",
    level: "basic",
    codeExample: "# Custom canvas vector UI integration"
  },
  {
    question: "What is the 3-step Golden Rule for Interactive UI Buttons in Python Turtle?",
    shortAnswer: "1. Define buttons as a data list with bounding box geometry | 2. Render buttons & centered labels in double buffer | 3. Hit-test and dispatch in `screen.onclick()`.",
    explanation: "This 3-step blueprint guarantees scalable, professional graphical user interfaces.",
    hint: "What 3 steps build custom interactive UI toolbars in Turtle?",
    level: "basic",
    codeExample: "# 1. Button data list -> 2. Batch render -> 3. Hit-test in onclick"
  },
  {
    question: "How does building custom UI components in Python prepare students for React, Flutter, and TailwindCSS?",
    shortAnswer: "Because component props, state-driven rendering, bounding box layouts, and event dispatching are the exact foundations of modern frontend engineering.",
    explanation: "Custom UI development bridges computer graphics to enterprise frontend frameworks.",
    hint: "How do custom canvas buttons connect to React components and TailwindCSS?",
    level: "basic",
    codeExample: "# Direct mapping to React UI components and state design"
  },
  {
    question: "How does completing Module 005_006 elevate a student's programming capability?",
    shortAnswer: "It transforms them from writing passive script calculators into full-fledged interactive software engineers capable of designing complete user-driven applications.",
    explanation: "User interaction is the gateway to real-world software creation.",
    hint: "What milestone does completing Module 005_006 represent?",
    level: "basic",
    codeExample: "# Full-stack interactive software engineering mastery"
  }
];

export default questions;
