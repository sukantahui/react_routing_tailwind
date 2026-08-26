// src/components/study/python/topics/005_005_turtle-animation/topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is the Entity-List pattern in multi-object animation?",
    shortAnswer: "Storing all moving game objects inside a Python list (e.g. `enemies = [...]`) and updating/rendering them in a single `for` loop.",
    explanation: "Allows scaling from 1 object to 500 objects with identical codebase structure.",
    hint: "What data structure stores a collection of animated game objects?",
    level: "basic",
    codeExample: "for entity in entities:\n    entity.update()\n    entity.draw(t)"
  },
  {
    question: "Why should `t.clear()` and `screen.update()` be called ONCE per frame rather than inside the entity loop?",
    shortAnswer: "Calling clear or update inside the entity loop erases previously drawn entities and causes 100x slowdown.",
    explanation: "The entire entity batch must be drawn into the back buffer before a single unified screen update.",
    hint: "How many times per frame should clear() and update() be invoked?",
    level: "basic",
    codeExample: "t.clear()\nfor e in entities: draw(e)\nscreen.update()"
  },
  {
    question: "How do you despawn and clean up dead entities (e.g. bullets that exited the screen)?",
    shortAnswer: "Filter the list using a list comprehension: `bullets = [b for b in bullets if b['y'] < max_y]`.",
    explanation: "Purging offscreen entities prevents memory leaks and unbounded computation growth.",
    hint: "How do list comprehensions prune expired entities?",
    level: "basic",
    codeExample: "bullets = [b for b in bullets if is_on_screen(b)]"
  },
  {
    question: "What is Object Pooling in high-performance game engines?",
    shortAnswer: "Pre-allocating a fixed set of reusable entity objects rather than continuously creating and destroying them in memory.",
    explanation: "Object pooling eliminates garbage collection pauses during intensive combat scenes.",
    hint: "What pattern reuses pre-allocated objects to avoid memory allocations?",
    level: "advanced",
    codeExample: "# Object Pool: Recycle inactive bullet instances"
  },
  {
    question: "How do you animate a solar system with multiple planets orbiting at different speeds?",
    shortAnswer: "Store each planet with its own orbit radius `r` and angular velocity `speed`, computing `x = r*cos(theta)`, `y = r*sin(theta)` per frame.",
    explanation: "Independent polar coordinate angle stepping produces synchronized multi-body orbital mechanics.",
    hint: "What formulas compute multi-planet orbital positions?",
    level: "moderate",
    codeExample: "x = r * math.cos(math.radians(angle))"
  },
  {
    question: "What is the computational complexity of checking collisions among `N` particles?",
    shortAnswer: "`O(N^2)` with brute force nested loops; can be optimized to `O(N)` using spatial hash grids.",
    explanation: "Every particle checking against every other particle requires `N*(N-1)/2` comparisons.",
    hint: "What is the Big-O complexity of brute-force all-pairs collision testing?",
    level: "moderate",
    codeExample: "for i in range(len(balls)):\n    for j in range(i+1, len(balls)): check_hit(balls[i], balls[j])"
  },
  {
    question: "How many entities can Python Turtle animate smoothly at 60 FPS using `tracer(0)` and a single turtle?",
    shortAnswer: "Between 200 and 500 simple circle entities simultaneously on standard modern CPUs.",
    explanation: "Double-buffered mathematical batching delivers immense throughput in standard Python.",
    hint: "What is the typical entity capacity for 60 FPS in Turtle?",
    level: "basic",
    codeExample: "# 500+ particles at 60 FPS with tracer(0)"
  },
  {
    question: "What is Particle System Emitter in visual effects?",
    shortAnswer: "A manager that spawns batches of tiny transient sprites (sparks, smoke, fire) with randomized lifetimes and velocities.",
    explanation: "Particle systems simulate fluids, explosions, magic spells, and weather phenomena.",
    hint: "What subsystem generates sparks, smoke, and explosions?",
    level: "moderate",
    codeExample: "def emit_sparks(x, y, count=20): ..."
  },
  {
    question: "How do you fade out particles as they age?",
    shortAnswer: "Reduce particle radius or cycle color from bright yellow -> orange -> dark red -> transparent based on `age / max_lifetime`.",
    explanation: "Progressive lifetime scaling creates realistic burning ember and fading smoke effects.",
    hint: "How does particle lifetime alter appearance over time?",
    level: "moderate",
    codeExample: "p['radius'] = p['orig_radius'] * (1.0 - p['age'] / p['life'])"
  },
  {
    question: "What is Flocking Simulation (Boids Algorithm)?",
    shortAnswer: "An emergent multi-agent algorithm based on 3 simple rules: Separation (avoid crowding), Alignment (match heading), and Cohesion (steer toward flock center).",
    explanation: "Craig Reynolds' Boids algorithm simulates birds, schools of fish, and insect swarms realistically.",
    hint: "What famous 3-rule algorithm simulates bird flocks and fish schools?",
    level: "advanced",
    codeExample: "# Boids: 1. Separation | 2. Alignment | 3. Cohesion"
  },
  {
    question: "Why should you avoid creating a separate `turtle.Turtle()` instance for every single bullet?",
    shortAnswer: "Creating 500 turtle instances exhausts Tkinter graphics handles and degrades framerate; use a single turtle to draw all 500 data points.",
    explanation: "Decoupling entity data from the rendering tool unlocks massive performance.",
    hint: "Why should one turtle draw all bullets instead of one turtle per bullet?",
    level: "basic",
    codeExample: "# 1 Turtle renders 500 entity dicts"
  },
  {
    question: "How do you implement enemy wave spawning with staggered delay intervals in Turtle?",
    shortAnswer: "Track a `spawn_timer` in the frame loop: `if frame % 60 == 0: spawn_enemy_wave()`.",
    explanation: "Frame modulo intervals schedule periodic wave arrivals smoothly.",
    hint: "How do you trigger enemy wave spawns every 1 second (60 frames)?",
    level: "basic",
    codeExample: "if frame % 60 == 0: enemies.append(create_enemy())"
  },
  {
    question: "What is Spatial Partitioning (Grid Hashing) in large-scale multi-object games?",
    shortAnswer: "Dividing the 2D world into a grid of cells and only testing collisions between objects occupying the same or adjacent cells.",
    explanation: "Spatial partitioning reduces collision checks from `O(N^2)` down to `O(N)`.",
    hint: "What technique divides the world into cells to optimize collision testing?",
    level: "expert",
    codeExample: "grid[get_cell(x, y)].append(entity)"
  },
  {
    question: "How do you animate a fireworks grand finale with 20 simultaneous exploding shells?",
    shortAnswer: "Each exploding shell appends 30 particle dictionaries to a global `particles` list with randomized radial velocity vectors.",
    explanation: "Multi-burst particle systems handle hundreds of concurrent sparks effortlessly.",
    hint: "How do multiple firework shells populate particle arrays?",
    level: "moderate",
    codeExample: "for shell in shells: if shell.exploded: spawn_burst(particles)"
  },
  {
    question: "What is Entity-Component-System (ECS) architecture?",
    shortAnswer: "A software architecture where Entities are IDs, Components are pure data structs, and Systems are functions that update components.",
    explanation: "ECS is the industry-standard architecture powering modern commercial game engines like Unity DOTS.",
    hint: "What data-driven pattern separates IDs, data components, and logic systems?",
    level: "expert",
    codeExample: "# ECS: Entities + Components + Systems"
  },
  {
    question: "How do you draw health bars floating above 20 moving enemy characters?",
    shortAnswer: "Inside the entity render loop, draw a small green/red rectangle at `(e.x - 15, e.y + 25)` for each active enemy.",
    explanation: "Attaching local HUD elements to entity coordinates keeps UI anchored to moving characters.",
    hint: "How are health bars positioned relative to character coordinates?",
    level: "moderate",
    codeExample: "draw_health_bar(t, e['x'], e['y'] + 25, e['health'])"
  },
  {
    question: "How do you prevent two autonomous wandering agents from colliding with each other?",
    shortAnswer: "Calculate distance between agents; if `dist < min_dist`, steer velocity vector away from the neighboring agent.",
    explanation: "Radial repulsive steering keeps wandering crowds and NPCs naturally spaced apart.",
    hint: "How is repulsive steering calculated to prevent NPC collisions?",
    level: "advanced",
    codeExample: "vx += (dx / dist) * push_force"
  },
  {
    question: "Why is functional list filtering `[e for e in entities if e.alive]` better than `entities.remove(e)` inside a loop?",
    shortAnswer: "Modifying a list with `remove()` while iterating over it skips elements and causes index mutation bugs.",
    explanation: "List comprehensions create a clean, bug-free filtered copy of the list.",
    hint: "Why should you never mutate a list while iterating over it?",
    level: "moderate",
    codeExample: "# GOOD: [e for e in entities if e.alive]"
  },
  {
    question: "How do you animate a snake body with trailing segments following the head?",
    shortAnswer: "Store segment coordinates in a list; on each move, insert new head position at index 0 and pop the last tail segment.",
    explanation: "Queue/deque coordinate shifting models classic retro Snake body mechanics.",
    hint: "How do queue data structures model Snake segment trailing?",
    level: "moderate",
    codeExample: "body.insert(0, (new_x, new_y)); body.pop()"
  },
  {
    question: "What is Particle Recycling in memory management?",
    shortAnswer: "Resetting dead particle properties (`x, y, vx, vy, age=0`) at the emitter rather than deleting and re-allocating heap memory.",
    explanation: "In-place attribute mutation eliminates memory allocation and garbage collection churn.",
    hint: "What technique resets dead particle attributes in place?",
    level: "advanced",
    codeExample: "p['age'] = 0; p['x'] = emitter_x; p['active'] = True"
  },
  {
    question: "How do you simulate snow gently falling across a winter landscape in Turtle?",
    shortAnswer: "Initialize 60 snowflake dicts with random `(x, y)` and small downward speeds; when `y < -250`, reset `y = 250` at top.",
    explanation: "Wrapping snowflakes vertically creates an endless, gentle snowstorm effect.",
    hint: "How do vertical wrapping particles create infinite snowfall?",
    level: "basic",
    codeExample: "if s['y'] < -250: s['y'] = 250; s['x'] = random_x()"
  },
  {
    question: "What is Delta-Time scaling across heterogeneous entity update systems?",
    shortAnswer: "Multiplying every individual entity's velocity by global `dt`: `e['x'] += e['vx'] * dt`.",
    explanation: "Enforces framerate independence across the entire multi-object ecosystem.",
    hint: "How do multi-entity loops maintain constant real-time speeds?",
    level: "basic",
    codeExample: "e['x'] += e['vx'] * dt; e['y'] += e['vy'] * dt"
  },
  {
    question: "How do you simulate gravity attracting all planets toward a central sun (N-Body gravity)?",
    shortAnswer: "For each planet, calculate vector toward sun `(dx, dy)`, distance `r`, and apply gravitational acceleration `a = G * M_sun / (r^2)`.",
    explanation: "Newton's inverse-square law generates accurate elliptical and circular orbits.",
    hint: "What formula applies gravitational acceleration toward central bodies?",
    level: "advanced",
    codeExample: "a = G * M / (dist**2); vx += a * (dx/dist); vy += a * (dy/dist)"
  },
  {
    question: "How do you implement bullet-to-enemy hit detection for 50 bullets and 20 enemies?",
    shortAnswer: "Loop over each bullet, check distance to each enemy; if `dist < radius_sum`, mark both as destroyed and spawn explosion particles.",
    explanation: "Nested collision loops resolve projectile impacts and score increments.",
    hint: "How are bullet-enemy collision loops structured?",
    level: "moderate",
    codeExample: "if math.hypot(b['x'] - e['x'], b['y'] - e['y']) < 20: explode(e)"
  },
  {
    question: "Why should you use integer or float coordinates in entity dicts rather than reading `t.pos()`?",
    shortAnswer: "Querying `t.pos()` over the GUI bridge is hundreds of times slower than accessing native Python dictionary variables in RAM.",
    explanation: "Keeping all physics state in RAM variables maximizes execution performance.",
    hint: "Why is native Python dictionary access faster than querying turtle coordinates?",
    level: "basic",
    codeExample: "# Read e['x'] directly in RAM instead of t.pos()"
  },
  {
    question: "How do you create an interactive laser defense turret firing at incoming asteroid swarms?",
    shortAnswer: "Manage two entity lists (`asteroids` and `lasers`); spawn lasers toward mouse clicks, update both lists, and test intersection.",
    explanation: "Dual-list entity management drives classic arcade defense games like Missile Command.",
    hint: "What 2 lists manage asteroids and defense lasers?",
    level: "moderate",
    codeExample: "# asteroids = [...] | lasers = [...]"
  },
  {
    question: "What is Emergence in multi-agent simulations?",
    shortAnswer: "Complex, intelligent-looking collective behavior (e.g. flocking, traffic jams) arising spontaneously from simple individual rules.",
    explanation: "Emergence is the mathematical foundation of swarm intelligence and artificial life.",
    hint: "What term describes complex collective patterns arising from simple local rules?",
    level: "expert",
    codeExample: "# Emergent swarm intelligence from simple local rules"
  },
  {
    question: "How do you benchmark how many entities your computer can animate before dropping below 60 FPS?",
    shortAnswer: "Increment entity count by 50 every second while monitoring measured FPS: `fps = 1.0 / (frame_time)`.",
    explanation: "Dynamic stress testing establishes the maximum entity capacity of your hardware.",
    hint: "How do you stress test multi-entity rendering capacity?",
    level: "advanced",
    codeExample: "if fps < 58: print(f'Max entity limit reached: {len(entities)}')"
  },
  {
    question: "What is the 3-step Golden Rule for Multi-Object Synchronized Loops in Python Turtle?",
    shortAnswer: "1. Store entities in a list of pure data dicts | 2. Update physics & draw all entities using a single turtle | 3. `screen.update()` once per frame.",
    explanation: "This 3-step blueprint guarantees rock-solid 60 FPS performance for hundreds of animated objects.",
    hint: "What 3 steps build high-performance multi-entity engines in Turtle?",
    level: "basic",
    codeExample: "# 1. Data list | 2. Single turtle batch draw | 3. Atomic update()"
  },
  {
    question: "How does multi-object loop architecture connect to enterprise cloud and distributed systems?",
    shortAnswer: "Batching data updates in memory before committing unified flushes is the exact pattern used in database batch inserts, stream processing (Kafka/Spark), and cloud microservices.",
    explanation: "Batch processing and entity synchronization are foundational distributed systems concepts.",
    hint: "How does batch loop processing relate to Kafka, Spark, and database batching?",
    level: "basic",
    codeExample: "# High-throughput batch processing architecture"
  }
];

export default questions;
