// src/components/study/python/topics/005_004_turtle-modular/topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is Z-Index in 2D graphical scene composition?",
    shortAnswer: "The depth order in which layers are drawn from back to front (background drawn first, foreground last).",
    explanation: "Because later draw calls overwrite earlier pixels (Painter's Algorithm), background elements must be drawn before foreground objects.",
    hint: "What concept dictates which objects appear in front of others?",
    level: "basic",
    codeExample: "# 1. Sky → 2. Mountains → 3. Houses → 4. Trees"
  },
  {
    question: "What is the Painter's Algorithm?",
    shortAnswer: "A rendering technique where distant objects are painted first, and closer objects are painted on top of them.",
    explanation: "Simulates optical occlusion naturally without complex 3D depth buffer clipping.",
    hint: "What classic graphics algorithm paints background before foreground?",
    level: "basic",
    codeExample: "# Painter's Algorithm: Far to Near"
  },
  {
    question: "How do you create mountain silhouettes using list vertices in Python Turtle?",
    shortAnswer: "Pass a list of peak `(x, y)` tuples to `t.goto()` inside a `begin_fill()` polygon.",
    explanation: "Vertex list polygons easily model jagged mountain horizons.",
    hint: "How are jagged mountain ridges drawn from coordinate lists?",
    level: "moderate",
    codeExample: "for x, y in mountain_peaks: t.goto(x, y)"
  },
  {
    question: "Why should `random.seed(42)` be set before generating procedural skylines?",
    shortAnswer: "To ensure that the procedural layout generates the exact same deterministic city every time it runs.",
    explanation: "Seeding pseudo-random number generators makes procedural generation reproducible and testable.",
    hint: "How do you make randomized procedural layouts repeatable?",
    level: "moderate",
    codeExample: "import random\nrandom.seed(1234)"
  },
  {
    question: "How do you implement time-of-day lighting themes (Day, Sunset, Night) across a complex scene?",
    shortAnswer: "Store color palettes in a dictionary keyed by theme name and look up sky, mountain, and building colors.",
    explanation: "Theme dictionary configurations allow swapping daytime sunshine for neon nighttime cyberpunk in a single parameter change.",
    hint: "How can a scene switch between daylight and nighttime palettes?",
    level: "moderate",
    codeExample: "cfg = themes['sunset']\ndraw_sky(cfg['sky_col'])"
  },
  {
    question: "How do you draw a road with dashed lane dividers?",
    shortAnswer: "Draw an asphalt base rectangle, then loop across the x-axis drawing short yellow line segments with `penup()` gaps.",
    explanation: "Iterative linear stepping with alternating pen states creates standard roadway lane markings.",
    hint: "How are dashed center highway lines drawn?",
    level: "basic",
    codeExample: "for x in range(-400, 400, 40):\n    t.penup(); t.goto(x, y); t.pendown(); t.forward(20)"
  },
  {
    question: "What is Atmospheric Perspective (aerial perspective) in landscape rendering?",
    shortAnswer: "Distant objects appear lighter, less saturated, and cooler in color than crisp, high-contrast foreground objects.",
    explanation: "Simulating haze and contrast attenuation adds immense visual depth to 2D vector scenes.",
    hint: "Why should distant mountains be more faded than foreground trees?",
    level: "advanced",
    codeExample: "# Far: #312e81 (faded) | Near: #0f291e (rich contrast)"
  },
  {
    question: "How do you render illuminated skyscraper window matrices efficiently?",
    shortAnswer: "Loop over rows and columns, calculating window `(wx, wy)` offsets and randomly toggling yellow fill color.",
    explanation: "Nested coordinate loops over building dimensions generate realistic illuminated office grids.",
    hint: "How are grid windows positioned across skyscraper facades?",
    level: "moderate",
    codeExample: "for r in range(rows):\n    for c in range(cols):\n        if random.random() > 0.4: draw_win(t, wx, wy)"
  },
  {
    question: "Why should background elements (e.g. stars) NOT overlap foreground elements (e.g. houses)?",
    shortAnswer: "Drawing background elements after foreground objects creates visual artifacts where stars appear inside living rooms.",
    explanation: "Strict z-index layering preserves physical visual realism.",
    hint: "What happens if stars are drawn after houses?",
    level: "basic",
    codeExample: "# Always draw sky and stars before houses"
  },
  {
    question: "What is a Scene Graph in computer graphics?",
    shortAnswer: "A tree-structured representation of all visual entities, nodes, and transformations in a scene.",
    explanation: "Organizing functions hierarchically simplifies complex multi-object scene orchestration.",
    hint: "What data structure models visual hierarchy in games and rendering engines?",
    level: "advanced",
    codeExample: "# Scene → [SkyNode, TerrainNode, CityNode, RoadNode]"
  },
  {
    question: "How do you draw water reflections beneath mountains or skylines?",
    shortAnswer: "Draw the water basin rectangle, and render inverted, lower-opacity horizontal strokes of the skyline colors.",
    explanation: "Inverted geometric projections create realistic lake and river surface reflections.",
    hint: "How are landscape reflections rendered on water surfaces?",
    level: "advanced",
    codeExample: "# Render inverted geometry below baseline with darker tint"
  },
  {
    question: "How can you place trees along an irregular hillside curve?",
    shortAnswer: "Calculate the hill elevation `y = f(x)` for each tree `x` position and call `draw_tree(t, x, y)`.",
    explanation: "Mathematical terrain functions position vegetation accurately along sloping ridgelines.",
    hint: "How do you position trees on sloping hill terrain?",
    level: "advanced",
    codeExample: "for x in tree_xs:\n    y = get_hill_height(x)\n    draw_tree(t, x, y)"
  },
  {
    question: "Why should `screen.tracer(0)` and a single `screen.update()` be used for full landscape scenes?",
    shortAnswer: "Rendering hundreds of windows, stars, and trees sequentially takes minutes without double buffering.",
    explanation: "Double buffering renders the entire multi-thousand segment landscape instantaneously in milliseconds.",
    hint: "How do you prevent rendering delay across complex town scenes?",
    level: "basic",
    codeExample: "screen.tracer(0)\n# ... render all 5 layers ...\nscreen.update()"
  },
  {
    question: "How do you scale tree sizes based on distance to simulate depth?",
    shortAnswer: "Assign smaller `size` parameters to trees with higher y-coordinates (further back on horizon).",
    explanation: "Distance-based scaling enforces perspective foreshortening.",
    hint: "How does tree scale relate to vertical horizon placement?",
    level: "moderate",
    codeExample: "size = base_size * (1.0 - (y - min_y) / span)"
  },
  {
    question: "How do you draw a crescent moon in a nighttime town scene?",
    shortAnswer: "Draw a bright circle, then overlay an offset circle matching the sky background color to bite out the crescent.",
    explanation: "Constructive solid geometry (CSG) overlay creates classic crescent moon silhouettes.",
    hint: "How do two overlapping circles create a crescent moon?",
    level: "moderate",
    codeExample: "draw_moon_disc(t, x, y, 'white'); draw_moon_disc(t, x+15, y, '#020617')"
  },
  {
    question: "How do you organize a large multi-scene project cleanly into separate files?",
    shortAnswer: "Put shape primitives in `primitives.py`, scenery functions in `scenery.py`, and orchestration in `main.py`.",
    explanation: "Separating primitives, scene builders, and entry points follows clean software architecture.",
    hint: "What 3 files cleanly separate primitives, scenes, and execution?",
    level: "moderate",
    codeExample: "# primitives.py | scenery.py | main.py"
  },
  {
    question: "How do you add street lamps with glowing conical light beams?",
    shortAnswer: "Draw a vertical pole, a lamp head, and a translucent yellow triangular polygon spreading down to the road.",
    explanation: "Transparent fill cones simulate illuminated nocturnal spotlighting.",
    hint: "What geometric shape models street lamp light cones?",
    level: "advanced",
    codeExample: "draw_pole(t, x, y); draw_light_cone(t, x, y+80, fill='#fef08a')"
  },
  {
    question: "What is Parallax Scrolling in 2D game backgrounds?",
    shortAnswer: "Moving background layers (mountains) slower than foreground layers (trees) as the camera pans.",
    explanation: "Layer velocity differentials create convincing optical illusions of 3D depth.",
    hint: "What 2D game technique moves background layers slower than foreground?",
    level: "expert",
    codeExample: "sky_x -= speed * 0.1; hill_x -= speed * 0.5; ground_x -= speed * 1.0"
  },
  {
    question: "How do you draw an antenna mast with flashing beacon dots on skyscrapers?",
    shortAnswer: "Draw a vertical line from rooftop center, and call `t.dot(6, 'red')` at the peak.",
    explanation: "Small accent details like rooftop aviation beacons add immense visual polish.",
    hint: "What method draws small warning beacon dots atop spires?",
    level: "basic",
    codeExample: "t.goto(x, y + height + 30); t.dot(6, 'red')"
  },
  {
    question: "How do you draw an arched stone bridge over a river?",
    shortAnswer: "Draw horizontal bridge deck rectangle and subtract an arc opening using `t.circle(r, 180)`.",
    explanation: "Combining horizontal deck slabs with circular underpass arches forms classic stone bridges.",
    hint: "How are stone river bridge arches constructed?",
    level: "moderate",
    codeExample: "draw_deck(t); draw_arch_cutout(t)"
  },
  {
    question: "Why should color palettes be limited to 4-6 harmonious colors per scene?",
    shortAnswer: "Too many random colors cause visual noise and ruin aesthetic cohesion.",
    explanation: "A disciplined, curated color palette creates professional, eye-catching digital artwork.",
    hint: "Why avoid using dozens of random colors in a single scene?",
    level: "basic",
    codeExample: "# Curate cohesive 5-color theme palette"
  },
  {
    question: "How do you draw smoke plumes rising from cottage chimneys?",
    shortAnswer: "Render sequential translucent circular puffs of increasing radius drifted rightwards by wind offset.",
    explanation: "Offset circles with increasing radius model rising chimney smoke puffs.",
    hint: "How are chimney smoke puffs drawn sequentially?",
    level: "advanced",
    codeExample: "for i in range(4): draw_puff(t, x + i*6, y + i*15, r=8 + i*4)"
  },
  {
    question: "How can you proceduralize village building positions without overlaps?",
    shortAnswer: "Maintain a running `current_x` coordinate, adding building width and spacing offset on each step.",
    explanation: "Accumulative spacing loops prevent building collisions across the street.",
    hint: "How do you prevent procedural houses from colliding?",
    level: "moderate",
    codeExample: "x = start_x\nfor w in widths: draw_house(t, x, y, w); x += w + margin"
  },
  {
    question: "What is the difference between a Backdrop and an Interactive Object in game scenes?",
    shortAnswer: "Backdrops are static scenery with zero collision logic; interactive objects track player collisions and physics.",
    explanation: "Layered architecture isolates static vector backgrounds from dynamic game entities.",
    hint: "Which layer contains static scenery versus playable objects?",
    level: "moderate",
    codeExample: "# Backdrop: mountain, sky | Interactive: player, coin"
  },
  {
    question: "How do you draw a windmill with rotating sails in a Dutch countryside scene?",
    shortAnswer: "Draw a tapered trapezoidal tower body, then rotate 4 sail blades with `with preserve_turtle(t): t.right(i*90 + angle)`.",
    explanation: "State-preserved radial rotation models rotating windmill blades.",
    hint: "How do you draw 4 symmetric windmill blades around a hub?",
    level: "advanced",
    codeExample: "for i in range(4): with preserve_turtle(t): t.right(i*90); draw_blade(t)"
  },
  {
    question: "How do you draw clouds casting shadows on the ground?",
    shortAnswer: "Draw the cloud in the sky in white/cyan, and draw an elongated semi-transparent dark oval on the ground below.",
    explanation: "Ground shadow projections connect aerial objects to the terrestrial environment.",
    hint: "How do ground shadows enhance aerial objects like clouds?",
    level: "advanced",
    codeExample: "draw_cloud(t, x, 200); draw_shadow(t, x+30, -120)"
  },
  {
    question: "What is Chunking in large procedural world generation?",
    shortAnswer: "Dividing a large infinite world into discrete spatial blocks and only rendering visible chunks within the camera viewport.",
    explanation: "Spatial chunking keeps memory and CPU rendering bounded in massive procedural scenes.",
    hint: "What technique divides infinite worlds into manageable grid squares?",
    level: "expert",
    codeExample: "# Chunking: render only chunks in [cam_x - w, cam_x + w]"
  },
  {
    question: "How do you draw a lighthouse beam scanning across an ocean night scene?",
    shortAnswer: "Draw a rotating triangular translucent light beam polygon originating from the lighthouse lantern room.",
    explanation: "Rotating polygon fans create dynamic rotating searchlight beams.",
    hint: "How do you render a rotating lighthouse beacon cone?",
    level: "advanced",
    codeExample: "draw_light_cone(t, lx, ly, rotation=scan_angle)"
  },
  {
    question: "What is the 5-layer pipeline rule for assembling complex Python Turtle scenes?",
    shortAnswer: "1. Sky/Celestial → 2. Far Topography → 3. Midground Terrain → 4. Architecture/Props → 5. Foreground Infrastructure.",
    explanation: "Adhering to this structured pipeline guarantees depth, optical occlusion, and visual clarity.",
    hint: "What 5 layers assemble a complete natural or urban landscape?",
    level: "basic",
    codeExample: "# 1. Sky | 2. Mountains | 3. Hills | 4. Town | 5. Road"
  },
  {
    question: "How do you create an animated daytime-to-nighttime transition cycle?",
    shortAnswer: "In a timer loop, interpolate color palettes from Day → Sunset → Night and re-render the scene graph.",
    explanation: "Palette interpolation animates smooth diurnal lighting cycles.",
    hint: "How do you animate day to night cycles in Turtle?",
    level: "expert",
    codeExample: "# Interpolate theme colors over 24-hour simulation loop"
  }
];

export default questions;
