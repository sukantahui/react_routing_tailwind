// src/components/study/python/topics/005_005_turtle-animation/topic5_files/topic5_questions.js

const questions = [
  {
    question: "How do you detect collision with the right screen boundary for a circular ball?",
    shortAnswer: "`if x + radius >= max_x:`",
    explanation: "Because coordinate `(x, y)` is at the center, the rightmost edge of the circle is at `x + radius`.",
    hint: "How is the circle's rightmost coordinate calculated relative to its center?",
    level: "basic",
    codeExample: "if x + radius >= max_x:\n    x = max_x - radius\n    vx = -vx"
  },
  {
    question: "Why is Position Clamping (`x = max_x - radius`) mandatory when a ball hits a wall?",
    shortAnswer: "To prevent the 'sticky wall' bug where a fast-moving ball sinks deep into the wall and oscillates trapped inside the boundary.",
    explanation: "Position correction guarantees the ball remains strictly inside valid arena bounds before the next frame tick.",
    hint: "What prevents balls from getting trapped vibrating inside walls?",
    level: "basic",
    codeExample: "x = max_x - radius  # Position correction"
  },
  {
    question: "What is Velocity Vector Reflection during an elastic wall collision?",
    shortAnswer: "Multiplying the normal velocity component by -1 (e.g. `vx = -vx` for vertical walls, `vy = -vy` for horizontal walls).",
    explanation: "Newton's law of reflection: angle of incidence equals angle of reflection.",
    hint: "How does velocity flip upon hitting a vertical wall?",
    level: "basic",
    codeExample: "vx = -vx  # Inverts horizontal direction"
  },
  {
    question: "What is Toroidal Screen Wrapping (Asteroids-style wrapping)?",
    shortAnswer: "Teleporting an object to the opposite edge when it exits the screen: `if x > max_x: x = min_x`.",
    explanation: "Simulates continuous topology without hard physical wall collisions.",
    hint: "What boundary mechanic teleports objects from the right edge to the left edge?",
    level: "basic",
    codeExample: "if x > max_x: x = min_x"
  },
  {
    question: "What is an Axis-Aligned Bounding Box (AABB)?",
    shortAnswer: "A non-rotated rectangle defined by `min_x, max_x, min_y, max_y` used for fast 2D collision detection.",
    explanation: "AABB collision tests require only 4 simple inequality comparisons.",
    hint: "What geometric structure defines boundary bounds without rotation?",
    level: "moderate",
    codeExample: "# AABB: min_x, max_x, min_y, max_y"
  },
  {
    question: "How do you detect collision between a ball and a moving rectangular Pong paddle?",
    shortAnswer: "Check if ball's X overlaps paddle X range AND ball's Y overlaps paddle Y range.",
    explanation: "Overlapping intervals on both X and Y axes confirm an AABB collision.",
    hint: "What condition verifies intersection with a paddle rectangle?",
    level: "moderate",
    codeExample: "if paddle.min_x <= ball.x <= paddle.max_x and paddle.min_y <= ball.y <= paddle.max_y:"
  },
  {
    question: "What causes the 'Tunneling' glitch in fast-moving physics games?",
    shortAnswer: "When object velocity per frame exceeds the wall thickness, passing completely through the wall between frames without triggering collision.",
    explanation: "High velocity causes large discrete positional jumps that skip over thin boundaries.",
    hint: "What glitch occurs when fast objects pass through walls between frames?",
    level: "advanced",
    codeExample: "# Tunneling: vx > wall_thickness causes missed collision"
  },
  {
    question: "How do you prevent high-speed tunneling through thin walls?",
    shortAnswer: "Use Continuous Collision Detection (CCD) via raycasting or multiple sub-step physics iterations per frame.",
    explanation: "Sub-stepping divides large frame movements into small verifiable steps.",
    hint: "What technique subdivides high-speed frames into smaller physics steps?",
    level: "advanced",
    codeExample: "for step in range(sub_steps): update_physics(dt / sub_steps)"
  },
  {
    question: "How do you calculate the deflection angle when a ball hits a rounded bumper paddle in Pong?",
    shortAnswer: "Calculate relative hit offset `offset = (ball.y - paddle.y) / (paddle.height / 2)` and set `vy = offset * max_deflection_speed`.",
    explanation: "Relative offset deflection allows players to steer ball angles by hitting with the paddle edges.",
    hint: "How do Pong games let players angle shots using paddle edges?",
    level: "advanced",
    codeExample: "vy = ((ball.y - paddle.y) / (paddle_h / 2)) * max_vy"
  },
  {
    question: "How do you bounce a ball off a 45-degree diagonal wall?",
    shortAnswer: "Swap velocity components with sign reflection: `new_vx = -vy; new_vy = -vx`.",
    explanation: "Diagonal reflection normal vectors swap the horizontal and vertical velocity axes.",
    hint: "How do 45-degree angled walls alter velocity components?",
    level: "advanced",
    codeExample: "vx, vy = -vy, -vx  # 45-degree diagonal bounce"
  },
  {
    question: "What is the Circle-to-Circle collision formula for two billiard balls?",
    shortAnswer: "Collision occurs when distance between centers `dist <= (r1 + r2)`, calculated via `math.hypot(x2 - x1, y2 - y1)`.",
    explanation: "Pythagorean distance comparison detects radial overlap effortlessly.",
    hint: "What formula checks if two circle centers are closer than the sum of their radii?",
    level: "moderate",
    codeExample: "if math.hypot(x2 - x1, y2 - y1) <= (r1 + r2): resolve_collision()"
  },
  {
    question: "How do you separate two overlapping circular balls upon collision?",
    shortAnswer: "Calculate overlap distance `overlap = (r1 + r2) - dist`, and push each ball away by `0.5 * overlap` along the collision normal vector.",
    explanation: "Positional separation prevents overlapping balls from sticking together.",
    hint: "How are colliding spheres separated along their normal vector?",
    level: "advanced",
    codeExample: "x1 -= nx * overlap * 0.5; x2 += nx * overlap * 0.5"
  },
  {
    question: "What is an Inelastic Wall Collision?",
    shortAnswer: "A collision where wall restitution is `< 1.0` (e.g. `vx = -vx * 0.8`), causing the ball to lose speed on every wall bounce.",
    explanation: "Damped wall bouncing simulates real-world energy absorption in squash and racquetball.",
    hint: "How is energy loss simulated upon wall contact?",
    level: "basic",
    codeExample: "vx = -vx * 0.8  # 20% kinetic energy lost per bounce"
  },
  {
    question: "How do you detect when a ball exits through a goal opening between two posts?",
    shortAnswer: "Check if `x >= goal_x` AND `goal_min_y <= y <= goal_max_y`.",
    explanation: "Bounding checks restricted to specific vertical slots define goal mouths.",
    hint: "How are goal nets programmed in air hockey or soccer games?",
    level: "moderate",
    codeExample: "if x >= goal_x and goal_y_bot <= y <= goal_y_top: score_goal()"
  },
  {
    question: "Why should screen boundaries be defined relative to window dimensions rather than hardcoded magic numbers?",
    shortAnswer: "So resizing the screen dynamically updates `max_x = screen.window_width() // 2` without breaking boundary physics.",
    explanation: "Dynamic bounds calculation ensures responsive full-screen compatibility.",
    hint: "How do you calculate boundaries dynamically from window dimensions?",
    level: "moderate",
    codeExample: "max_x = screen.window_width() // 2"
  },
  {
    question: "How do you simulate a rubber pinball bumper that repels balls with extra explosive speed?",
    shortAnswer: "Reflect velocity and multiply by an impulse multiplier: `vx = -vx * 1.5; vy = -vy * 1.5`.",
    explanation: "Kinetic impulse boosts create arcade pinball bounce dynamics.",
    hint: "How do pinball bumpers add speed upon collision?",
    level: "moderate",
    codeExample: "vx = -vx * 1.5; vy = -vy * 1.5  # Pinball impulse"
  },
  {
    question: "What is the difference between Boundary Clamping and Boundary Wrapping?",
    shortAnswer: "Clamping confines position strictly inside bounds (`min <= x <= max`); wrapping teleports beyond the bound to the other side.",
    explanation: "Clamping is for solid rooms; wrapping is for seamless wrap-around worlds.",
    hint: "Which boundary mode restricts movement inside walls versus wrapping around?",
    level: "basic",
    codeExample: "# Clamp: x = max(min_x, min(max_x, x)) | Wrap: if x > max_x: x = min_x"
  },
  {
    question: "How do you play a sound effect or trigger screen shake upon wall collision?",
    shortAnswer: "Invoke a sound trigger or camera offset inside the collision `if` block before reversing velocity.",
    explanation: "Audio-visual feedback makes boundary impacts feel impactful and tactile.",
    hint: "Where is impact feedback triggered in the physics loop?",
    level: "moderate",
    codeExample: "if x + r >= max_x: play_bounce_sound(); vx = -vx"
  },
  {
    question: "How do you bounce off an arbitrary angled line segment with normal vector `(nx, ny)`?",
    shortAnswer: "Calculate dot product `dot = vx*nx + vy*ny`, then `vx_new = vx - 2*dot*nx`, `vy_new = vy - 2*dot*ny`.",
    explanation: "Vector projection reflection works for any 2D surface orientation in space.",
    hint: "What vector operation reflects velocity against arbitrary normal vectors?",
    level: "expert",
    codeExample: "dot = vx*nx + vy*ny\nvx -= 2*dot*nx; vy -= 2*dot*ny"
  },
  {
    question: "How do you handle corner collisions where a ball hits both top and right walls on the exact same frame?",
    shortAnswer: "Both conditionals trigger independently, reversing both `vx = -vx` and `vy = -vy` (a 180-degree retroreflective return).",
    explanation: "Independent axis checking naturally resolves simultaneous multi-boundary collisions.",
    hint: "What happens when a ball hits a corner vertex?",
    level: "moderate",
    codeExample: "# Corner hit: both vx = -vx and vy = -vy fire"
  },
  {
    question: "What is Bounding Volume Hierarchy (BVH) in multi-object collision systems?",
    shortAnswer: "A tree structure enclosing objects in progressively smaller bounding boxes to accelerate collision searches.",
    explanation: "Spatial hierarchy avoids checking every object against every other object (`O(N^2)` reduction).",
    hint: "What tree structure accelerates collision queries in complex scenes?",
    level: "expert",
    codeExample: "# BVH spatial partitioning"
  },
  {
    question: "How do you prevent a player sprite from walking through a maze wall in an RPG?",
    shortAnswer: "If next position `(x + vx, y + vy)` intersects a wall tile, cancel movement: `x_new = x_old`.",
    explanation: "Collision prediction cancels invalid movement before it occurs.",
    hint: "How is maze wall collision prevented before moving?",
    level: "moderate",
    codeExample: "if not is_solid(next_x, next_y): x = next_x; y = next_y"
  },
  {
    question: "What is a Circle-to-AABB (Box) collision algorithm?",
    shortAnswer: "Find the closest point on the rectangle `(cx, cy)` to the circle center, and check if `distance(circle, closest_pt) <= radius`.",
    explanation: "Clamping the circle center to rectangle bounds yields the nearest surface point for radial testing.",
    hint: "How do you test collision between a circle and a rectangle?",
    level: "advanced",
    codeExample: "cx = max(box.min_x, min(circle.x, box.max_x))"
  },
  {
    question: "Why should `math.hypot(dx, dy)` be used instead of `math.sqrt(dx**2 + dy**2)`?",
    shortAnswer: "`math.hypot()` is faster, more numerically robust against floating-point overflow/underflow, and more concise.",
    explanation: "Python's `math.hypot()` is implemented in optimized C.",
    hint: "What optimized function computes Euclidean distance between points?",
    level: "basic",
    codeExample: "dist = math.hypot(x2 - x1, y2 - y1)"
  },
  {
    question: "How do you create an endless bouncing screensaver with changing trail colors on each bounce?",
    shortAnswer: "Cycle `ball.color = colors[bounce_count % len(colors)]` inside the boundary collision branch.",
    explanation: "Collision events can trigger arbitrary cosmetic and gameplay state changes.",
    hint: "How are color changes linked to wall impact events?",
    level: "basic",
    codeExample: "if bounced: ball_color = random.choice(palette)"
  },
  {
    question: "What is the minimum collision boundary box for a canvas sized 800x600?",
    shortAnswer: "`min_x = -400, max_x = 400, min_y = -300, max_y = 300` in standard Turtle origin-centered coordinates.",
    explanation: "Turtle coordinates center `(0, 0)` at the exact middle of the window.",
    hint: "What are the coordinate boundaries for an 800x600 Turtle screen?",
    level: "basic",
    codeExample: "# Width 800 → [-400, 400] | Height 600 → [-300, 300]"
  },
  {
    question: "How do you simulate a soft sponge wall that slows the ball down gradually upon contact?",
    shortAnswer: "Instead of instantaneous reflection, apply an opposing spring damping force `f = -k * penetration` while inside the wall zone.",
    explanation: "Penalty force methods model soft deformable boundaries.",
    hint: "How are soft deformable boundaries simulated in physics?",
    level: "expert",
    codeExample: "# Spring penalty force during wall penetration"
  },
  {
    question: "What is the 3-step Golden Rule for 2D Boundary Collision in Python Turtle?",
    shortAnswer: "1. Check edge overlap with radius | 2. Snap position to boundary surface | 3. Reverse normal velocity vector (`vx = -vx`).",
    explanation: "This 3-step sequence prevents tunneling, sticky walls, and jitter artifacts.",
    hint: "What 3 steps execute perfect boundary collision in Turtle?",
    level: "basic",
    codeExample: "# 1. Detect overlap → 2. Snap position → 3. Invert velocity"
  },
  {
    question: "How does boundary detection logic translate into professional robotics and autonomous drone control?",
    shortAnswer: "Autonomous drones and robot vacuums use identical bounding box and distance-sensor equations to avoid colliding with walls and obstacles.",
    explanation: "Geofencing and obstacle avoidance in robotics rely directly on 2D/3D boundary mathematics.",
    hint: "How do autonomous drones use boundary detection in the real world?",
    level: "basic",
    codeExample: "# Robotics geofencing & obstacle avoidance systems"
  },
  {
    question: "Why is mastering boundary detection essential for multi-agent simulations?",
    shortAnswer: "Because confining hundreds of autonomous particles or game agents inside bounded spatial domains prevents memory leaks and runaway entity coordinates.",
    explanation: "Spatial containment keeps simulations bounded and computationally stable.",
    hint: "Why is spatial containment critical for multi-agent systems?",
    level: "moderate",
    codeExample: "# Spatial containment of autonomous agent swarms"
  }
];

export default questions;
