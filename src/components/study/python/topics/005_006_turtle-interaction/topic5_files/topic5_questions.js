// src/components/study/python/topics/005_006_turtle-interaction/topic5_files/topic5_questions.js

const questions = [
  {
    question: "How do you calculate the aim angle from a turret `(tx, ty)` toward mouse coordinates `(mx, my)`?",
    shortAnswer: "`aim_angle = math.degrees(math.atan2(my - ty, mx - tx))`.",
    explanation: "The two-argument arctangent function `atan2(dy, dx)` returns the exact angle in radians across all 4 quadrants.",
    hint: "What trigonometric function computes angles between two 2D points?",
    level: "basic",
    codeExample: "dx = mx - tx; dy = my - ty\nangle = math.degrees(math.atan2(dy, dx))"
  },
  {
    question: "Why is `math.atan2(dy, dx)` preferred over `math.atan(dy / dx)`?",
    shortAnswer: "Because `atan2` handles division-by-zero when `dx == 0` and correctly distinguishes all 4 quadrants without sign ambiguity.",
    explanation: "`atan2` is the robust industry standard for all geometric angle calculations.",
    hint: "Why avoid division by zero in tangent calculations?",
    level: "moderate",
    codeExample: "# atan2 handles dx=0 and all 4 quadrants safely"
  },
  {
    question: "What is Inertial Drift in vehicle physics?",
    shortAnswer: "The tendency of a spacecraft or vehicle to continue moving along its velocity vector even after rotating heading in another direction.",
    explanation: "Demonstrates Newton's First Law of Motion (conservation of momentum).",
    hint: "What physics principle causes spacecraft to drift sideways while turning?",
    level: "basic",
    codeExample: "x += vx; y += vy  # Continuous inertial drift"
  },
  {
    question: "How do you simulate forward thrust acceleration along a vehicle's heading angle `theta`?",
    shortAnswer: "`rad = math.radians(theta); vx += math.cos(rad) * thrust; vy += math.sin(rad) * thrust`.",
    explanation: "Trigonometric vector projection resolves thrust into Cartesian X and Y acceleration components.",
    hint: "How is forward thrust broken into X and Y velocity components?",
    level: "basic",
    codeExample: "vx += math.cos(rad) * a; vy += math.sin(rad) * a"
  },
  {
    question: "Why is friction damping (`vx *= 0.985`, `vy *= 0.985`) essential in 2D space games?",
    shortAnswer: "Without damping, acceleration accumulates indefinitely, causing vehicles to reach uncontrollable warp speeds.",
    explanation: "Friction creates a natural terminal velocity ceiling for comfortable steering.",
    hint: "What prevents spaceships from accelerating to infinite speed?",
    level: "basic",
    codeExample: "vx *= 0.985; vy *= 0.985  # Damping factor"
  },
  {
    question: "What is Differential Drive (Tank Steering)?",
    shortAnswer: "A steering system using independent left and right tread speeds: linear velocity is average speed, angular velocity is speed difference.",
    explanation: "Differential drive allows tanks and mobile robots to rotate in place with zero turning radius.",
    hint: "What steering system drives robots with independent left and right wheel speeds?",
    level: "moderate",
    codeExample: "linear_v = (vl + vr)/2; angular_v = (vr - vl) * k"
  },
  {
    question: "How do you implement bullet projectile firing from a rotating turret barrel?",
    shortAnswer: "Spawn bullet at `(tx + cos(rad)*barrel_len, ty + sin(rad)*barrel_len)` with velocity `(cos(rad)*bullet_speed, sin(rad)*bullet_speed)`.",
    explanation: "Vector math positions the bullet at the barrel muzzle and imparts forward velocity.",
    hint: "How is bullet velocity aligned with turret aim angle?",
    level: "moderate",
    codeExample: "b_vx = math.cos(rad) * speed; b_vy = math.sin(rad) * speed"
  },
  {
    question: "What is Toroidal Screen Wrapping in arcade space shooters?",
    shortAnswer: "When an object exits one edge of the screen, it instantly reappears on the opposite edge (`if x > max_x: x = -max_x`).",
    explanation: "Toroidal topology creates an endless wrap-around arena.",
    hint: "What boundary behavior wraps objects from right to left edge?",
    level: "basic",
    codeExample: "if x > 350: x = -350\nelif x < -350: x = 350"
  },
  {
    question: "How do you calculate vehicle speed magnitude from `vx` and `vy`?",
    shortAnswer: "`speed = math.hypot(vx, vy)` (or `math.sqrt(vx**2 + vy**2)`).",
    explanation: "Pythagorean theorem computes scalar velocity magnitude.",
    hint: "What math function calculates 2D vector length?",
    level: "basic",
    codeExample: "speed = math.hypot(vx, vy)"
  },
  {
    question: "What is Steering Turn Rate (Angular Velocity) in degrees per frame?",
    shortAnswer: "The maximum rotational speed an entity can turn when steering keys are pressed (e.g. 5° per frame = 300°/sec).",
    explanation: "Controls handling responsiveness and turning agility.",
    hint: "What variable dictates how fast vehicles turn?",
    level: "basic",
    codeExample: "angle = (angle + turn_rate) % 360"
  },
  {
    question: "How do you clamp maximum forward vehicle speed?",
    shortAnswer: "If `math.hypot(vx, vy) > max_speed`: scale vector `vx = (vx / speed) * max_speed`, `vy = (vy / speed) * max_speed`.",
    explanation: "Vector clamping preserves direction while capping maximum scalar velocity.",
    hint: "How do you limit velocity while keeping direction intact?",
    level: "advanced",
    codeExample: "if speed > max_v: vx = (vx/speed)*max_v; vy = (vy/speed)*max_v"
  },
  {
    question: "What is Ackermann Steering Geometry in car racing games?",
    shortAnswer: "Automobile steering where the front wheels pivot at angles while rear wheels provide forward drive, creating a turning circle arc.",
    explanation: "Ackermann geometry accurately simulates cars and race vehicles.",
    hint: "What steering model simulates car front-wheel turning arcs?",
    level: "advanced",
    codeExample: "# Ackermann car steering kinematics"
  },
  {
    question: "How do you smooth out turret rotation so it doesn't snap instantly to the mouse pointer?",
    shortAnswer: "Interpolate current angle toward target angle by a fractional step: `angle += (target_angle - angle) * 0.1`.",
    explanation: "Linear interpolation (Lerp) adds realistic mechanical turret rotation weight.",
    hint: "What mathematical technique smoothly eases turret rotation toward targets?",
    level: "advanced",
    codeExample: "turret_angle += (aim_angle - turret_angle) * 0.1"
  },
  {
    question: "How do you draw an animated thruster flame that flickers behind a spaceship during thrust?",
    shortAnswer: "When `keys['Up']` is True, draw a yellow/orange triangle behind the ship with randomized length `10 + random.randint(0, 6)`.",
    explanation: "Randomized flame length creates dynamic jet exhaust effects.",
    hint: "How is thruster flame flickering animated in code?",
    level: "basic",
    codeExample: "flame_len = 12 + random.randint(-2, 4)"
  },
  {
    question: "Why does `math.radians()` need to be called before `math.cos()` in Python?",
    shortAnswer: "Because Python's standard math trigonometry functions expect angles in radians (`0` to `2*pi`), while Turtle angles are in degrees (`0` to `360`).",
    explanation: "Angle unit conversion is required when bridging Turtle degrees to Python math.",
    hint: "Why convert degrees to radians before using sin/cos?",
    level: "basic",
    codeExample: "rad = math.radians(degrees_angle)"
  },
  {
    question: "What is Reverse Gear / Braking in vehicle controls?",
    shortAnswer: "Down Arrow applies negative acceleration `vx -= cos(rad)*a`, slowing forward motion or reversing if stopped.",
    explanation: "Braking opposes current velocity vector.",
    hint: "How does Down Arrow apply reverse acceleration?",
    level: "basic",
    codeExample: "if keys['Down']: vx -= math.cos(rad)*0.2; vy -= math.sin(rad)*0.2"
  },
  {
    question: "How do you calculate the angle between two moving game entities?",
    shortAnswer: "`angle = math.degrees(math.atan2(e2['y'] - e1['y'], e2['x'] - e1['x']))`.",
    explanation: "Used by enemy AI to aim weapons toward the player.",
    hint: "How does enemy AI compute aim angles toward players?",
    level: "moderate",
    codeExample: "ai_aim = math.degrees(math.atan2(p.y - ai.y, p.x - ai.x))"
  },
  {
    question: "What is Skid Steer in construction machinery and robotic rovers?",
    shortAnswer: "Steering achieved by running left and right wheels at different speeds, skidding tires across ground to pivot.",
    explanation: "Identical to dual-track tank drive mechanics.",
    hint: "What is the robotics term for tank-style steering?",
    level: "moderate",
    codeExample: "# Skid steering robot rover kinematics"
  },
  {
    question: "How do you render a trajectory aim line showing where a cannon will shoot?",
    shortAnswer: "Draw a dashed line extending from turret position along `aim_angle` for 200 pixels.",
    explanation: "Laser sight aim lines provide visual aiming aids for players.",
    hint: "How is a laser aiming sight line drawn in Turtle?",
    level: "moderate",
    codeExample: "t.penup(); t.goto(tx, ty); t.setheading(angle); t.pendown(); t.forward(200)"
  },
  {
    question: "What is Screen Shake on heavy weapon discharge?",
    shortAnswer: "Adding small randomized offsets `(random(-5, 5), random(-5, 5))` to the camera viewport for 3-5 frames after firing.",
    explanation: "Screen shake adds intense visual impact and weapon recoil feedback.",
    hint: "What juice effect adds camera vibration upon firing weapons?",
    level: "advanced",
    codeExample: "camera_x += random.uniform(-4, 4); camera_y += random.uniform(-4, 4)"
  },
  {
    question: "How do you implement Weapon Recoil physics on the player vehicle?",
    shortAnswer: "Push the vehicle in the exact opposite direction of fire: `vx -= cos(rad)*recoil_force`, `vy -= sin(rad)*recoil_force`.",
    explanation: "Newton's Third Law (action and reaction) adds satisfying tactile physics.",
    hint: "How does Newton's third law impart weapon recoil to the player ship?",
    level: "moderate",
    codeExample: "vx -= math.cos(rad) * 2.0; vy -= math.sin(rad) * 2.0"
  },
  {
    question: "What is Crosshair Tracking in mouse-aimed arcade games?",
    shortAnswer: "Drawing a reticle sprite at current mouse coordinates `(mx, my)` to represent the target cursor.",
    explanation: "Custom crosshair reticles replace standard OS mouse arrows.",
    hint: "What sprite represents the target point under the mouse pointer?",
    level: "basic",
    codeExample: "draw_crosshair(t, mouse_x, mouse_y)"
  },
  {
    question: "How do you normalize angles to keep them within the `[0, 360)` range?",
    shortAnswer: "`angle = angle % 360`.",
    explanation: "Modulo arithmetic keeps angle variables within standard degree ranges.",
    hint: "What operator wraps angles into a 0-360 range?",
    level: "basic",
    codeExample: "angle = (angle + delta) % 360"
  },
  {
    question: "What is Strafing vs Turning in 2D top-down shooter controls?",
    shortAnswer: "Turning rotates heading angle; strafing moves laterally perpendicular to heading (`angle + 90°`) without rotating.",
    explanation: "Strafing allows players to dodge incoming fire while keeping weapons trained on enemies.",
    hint: "What movement moves sideways perpendicular to aim heading?",
    level: "advanced",
    codeExample: "strafe_rad = math.radians(angle + 90); x += math.cos(strafe_rad)*speed"
  },
  {
    question: "How do you simulate surface traction (ice vs asphalt) in vehicle physics?",
    shortAnswer: "Adjust damping factor: `friction = 0.995` for slick ice (long slide), `friction = 0.92` for high-traction asphalt (instant grip).",
    explanation: "Damping constants model diverse terrain traction physics.",
    hint: "How do damping values simulate ice versus asphalt surfaces?",
    level: "moderate",
    codeExample: "# Ice: 0.995 | Asphalt: 0.920"
  },
  {
    question: "How do you create an interactive radar minimap showing player heading and position?",
    shortAnswer: "Draw a small circle in the corner; plot a mini-arrow scaled down by `(x / world_w, y / world_h)` with heading `angle`.",
    explanation: "Minimaps provide situational awareness in large game worlds.",
    hint: "How is world coordinate scaling applied to radar minimaps?",
    level: "advanced",
    codeExample: "radar_x = radar_cx + (ship.x / world_scale)"
  },
  {
    question: "What is Dead Reckoning in multiplayer vehicle movement?",
    shortAnswer: "Predicting a remote vehicle's position between network updates using its last known velocity and heading: `pos += vel * dt`.",
    explanation: "Dead reckoning masks network latency in multiplayer flight games.",
    hint: "What prediction technique hides network lag in online games?",
    level: "expert",
    codeExample: "# Dead reckoning position extrapolation"
  },
  {
    question: "What is the 3-step Golden Rule for Real-Time Vehicle Controls in Python Turtle?",
    shortAnswer: "1. Track heading angle & key state dict | 2. Apply trigonometric thrust & damping in 60 FPS loop | 3. Aim turrets with `math.atan2`.",
    explanation: "This 3-step blueprint forms the kinematic engine for top-down flight and combat games.",
    hint: "What 3 steps build arcade vehicle physics in Turtle?",
    level: "basic",
    codeExample: "# 1. Keys & Heading -> 2. Vector Thrust & Friction -> 3. atan2 Aiming"
  },
  {
    question: "How does vector trigonometry for vehicle steering connect to aerospace and robotics engineering?",
    shortAnswer: "Because autonomous drones, quadcopters, self-driving cars, and spacecraft all use these exact vector acceleration and Euler kinematic equations.",
    explanation: "Game physics kinematics are identical to real-world robotics control mathematics.",
    hint: "How do 2D vehicle steering vectors relate to drone and spacecraft navigation?",
    level: "basic",
    codeExample: "# Universal robotics and aerospace guidance kinematics"
  },
  {
    question: "Why do players love inertia-based spaceship physics (Asteroids feel)?",
    shortAnswer: "Because mastering momentum, drift management, and retro-thrusting delivers a deeply rewarding, skillful tactile gameplay feel.",
    explanation: "Inertia and drift create emergent gameplay mastery.",
    hint: "Why is inertial drifting engaging for video game players?",
    level: "basic",
    codeExample: "# Satisfying momentum and drift game mechanics"
  }
];

export default questions;
