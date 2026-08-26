// src/components/study/python/topics/005_005_turtle-animation/topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is Forward Euler Integration in computer game physics?",
    shortAnswer: "A numerical integration method that updates velocity from acceleration, and position from velocity on each discrete time step.",
    explanation: "Euler integration is the fundamental building block of 2D physics simulations.",
    hint: "What numerical technique updates velocity and position iteratively each tick?",
    level: "basic",
    codeExample: "vy -= g * dt; y += vy * dt"
  },
  {
    question: "How is gravity simulated in 2D vector coordinates?",
    shortAnswer: "By subtracting a constant acceleration value from vertical velocity on every frame: `vy -= gravity`.",
    explanation: "Gravity pulls downward along the negative Y-axis.",
    hint: "How is downward vertical acceleration calculated per frame?",
    level: "basic",
    codeExample: "vy -= gravity"
  },
  {
    question: "Why do projectiles follow a parabolic trajectory under constant gravity?",
    shortAnswer: "Because horizontal velocity `vx` remains constant while vertical displacement `y` follows a quadratic function of time: `y(t) = vy*t - 0.5*g*t^2`.",
    explanation: "Constant horizontal velocity combined with linear vertical deceleration forms a parabola.",
    hint: "What geometric curve is formed by constant horizontal speed and vertical gravitational acceleration?",
    level: "moderate",
    codeExample: "# Parabolic arc: x = vx*t, y = vy0*t - 0.5*g*t^2"
  },
  {
    question: "What is the Coefficient of Restitution (Elasticity) during a floor collision?",
    shortAnswer: "The ratio of final to initial velocity after collision: `vy = -vy * elasticity` (where `0.0 <= elasticity <= 1.0`).",
    explanation: "Models kinetic energy loss dissipated as heat and sound during impacts.",
    hint: "What factor scales velocity reversal during a bounce?",
    level: "basic",
    codeExample: "vy = -vy * 0.75  # 75% energy retained"
  },
  {
    question: "Why is Position Correction (`y = floor_y`) mandatory upon floor collision?",
    shortAnswer: "Because discrete time steps cause the ball to sink partially below the floor line before collision is detected.",
    explanation: "Snapping the object back to the floor surface prevents the ball from tunneling through the boundary.",
    hint: "Why must coordinates be snapped back to floor height upon collision?",
    level: "moderate",
    codeExample: "if y <= floor_y: y = floor_y; vy = -vy * e"
  },
  {
    question: "What is Ground Friction and how is it simulated in 2D physics?",
    shortAnswer: "A deceleration damping factor applied to horizontal velocity: `vx *= friction` (e.g. `vx *= 0.98`).",
    explanation: "Progressively slows rolling objects to a natural halt.",
    hint: "How is horizontal rolling resistance calculated in code?",
    level: "basic",
    codeExample: "vx *= 0.98"
  },
  {
    question: "What causes 'micro-jitter' at the end of a bouncing ball animation and how do you fix it?",
    shortAnswer: "Tiny residual velocities oscillating infinitely around 0; fix by clamping `if abs(vy) < threshold: vy = 0`.",
    explanation: "Threshold clamping allows objects to come to a clean, static rest.",
    hint: "How do you stop tiny bouncing vibrations when the ball comes to rest?",
    level: "moderate",
    codeExample: "if abs(vy) < 0.5: vy = 0"
  },
  {
    question: "How does aerodynamic air drag differ from linear ground friction?",
    shortAnswer: "Air drag opposes velocity in both X and Y directions: `vx *= (1 - drag)`, `vy *= (1 - drag)`.",
    explanation: "Aerodynamic drag dampens overall kinetic momentum through air resistance.",
    hint: "How does air resistance affect velocity components?",
    level: "moderate",
    codeExample: "vx *= 0.99; vy *= 0.99"
  },
  {
    question: "How do you calculate initial velocity components `(vx, vy)` from a launch angle and speed?",
    shortAnswer: "`vx = speed * math.cos(radians(angle))` and `vy = speed * math.sin(radians(angle))`.",
    explanation: "Trigonometric vector decomposition converts polar launch vectors to Cartesian velocity components.",
    hint: "What trigonometric functions split launch speed into vx and vy?",
    level: "basic",
    codeExample: "vx = speed * math.cos(rad); vy = speed * math.sin(rad)"
  },
  {
    question: "What is Terminal Velocity in falling object simulations?",
    shortAnswer: "The maximum constant speed reached when downward gravitational force equals upward aerodynamic drag force.",
    explanation: "Air drag balances gravity, capping maximum falling acceleration.",
    hint: "What is the steady-state maximum falling speed called?",
    level: "advanced",
    codeExample: "# At terminal velocity: drag_force == gravity"
  },
  {
    question: "How does Moon gravity (1.6 m/s²) visually compare to Earth gravity (9.8 m/s²)?",
    shortAnswer: "Moon gravity produces much higher, wider, slower floaty parabolic jumps; Earth gravity produces snappy, tighter arcs.",
    explanation: "Lower gravity values prolong flight time and increase apex height.",
    hint: "How does low gravitational acceleration affect projectile arcs?",
    level: "basic",
    codeExample: "# Moon: g=1.6 (floaty) | Earth: g=9.8 (snappy)"
  },
  {
    question: "What is Verlet Integration and when is it preferred over Euler Integration?",
    shortAnswer: "A position-based integration method that calculates velocity implicitly: `x_new = 2*x - x_old + a*dt^2`.",
    explanation: "Verlet integration offers superior numerical stability for cloth, rope, and particle physics.",
    hint: "What position-based integration method provides higher numerical stability?",
    level: "advanced",
    codeExample: "pos_new = 2*pos - pos_old + acc*dt*dt"
  },
  {
    question: "How do you calculate the peak Apex height of a projectile?",
    shortAnswer: "When vertical velocity reaches exactly zero (`vy == 0`): `height = (vy0^2) / (2 * g)`.",
    explanation: "At the trajectory apex, kinetic energy is fully converted into potential energy.",
    hint: "What is the vertical velocity at the highest point of a parabolic arc?",
    level: "moderate",
    codeExample: "apex_y = start_y + (vy0**2) / (2 * g)"
  },
  {
    question: "How do you simulate a spring oscillator (Hooke's Law) in Python Turtle?",
    shortAnswer: "Calculate spring force `F = -k * displacement`, update acceleration `a = F / mass`, and step `vy += a * dt`.",
    explanation: "Hooke's Law models harmonic bouncing elastic springs and bungee cords.",
    hint: "What law models spring force as proportional to displacement?",
    level: "advanced",
    codeExample: "f = -k * (y - rest_y); vy += (f / mass) * dt"
  },
  {
    question: "What is Kinetic Energy in bouncing ball physics?",
    shortAnswer: "`KE = 0.5 * mass * velocity^2`; with each bounce, elasticity absorbs a percentage of total kinetic energy.",
    explanation: "Energy dissipation reduces bounce height progressively until rest.",
    hint: "What form of energy is proportional to velocity squared?",
    level: "moderate",
    codeExample: "ke = 0.5 * mass * (vx**2 + vy**2)"
  },
  {
    question: "How do you simulate wind blowing across a projectile trajectory?",
    shortAnswer: "Add a constant horizontal wind acceleration: `vx += wind_acceleration * dt` on every frame.",
    explanation: "Wind force distorts parabolic symmetry, pushing projectiles downwind.",
    hint: "How is horizontal atmospheric wind force added to physics loops?",
    level: "basic",
    codeExample: "vx += wind_force * dt"
  },
  {
    question: "Why should collision checks take the ball's radius into account?",
    shortAnswer: "Because coordinate `(x, y)` is at the circle's center; checking `y <= floor` without radius causes the bottom half of the ball to sink through the floor.",
    explanation: "Surface boundary is `floor_y + radius`.",
    hint: "Why must radius be added to the floor boundary condition?",
    level: "basic",
    codeExample: "if y <= (floor_y + radius): bounce()"
  },
  {
    question: "What is an Inelastic Collision?",
    shortAnswer: "A collision where elasticity is 0.0 (`vy = 0`), causing the object to stick to the surface without bouncing.",
    explanation: "Models clay, mud, or lead balls dropping onto solid ground.",
    hint: "What happens when elasticity is set to 0.0?",
    level: "basic",
    codeExample: "elasticity = 0.0  # Perfect inelastic impact"
  },
  {
    question: "How do you calculate the range (total horizontal distance) of a projectile launched on flat ground?",
    shortAnswer: "`Range = (speed^2 * sin(2 * angle)) / g`.",
    explanation: "Maximum theoretical range occurs at a 45-degree launch angle.",
    hint: "What angle achieves maximum projectile range in vacuum?",
    level: "moderate",
    codeExample: "range = (v0**2 * math.sin(2 * rad)) / g"
  },
  {
    question: "How do you create an interactive Angry Birds-style slingshot launcher in Turtle?",
    shortAnswer: "Calculate pull vector `(dx, dy) = origin - mouse_pos`, set `vx = dx * power`, `vy = dy * power`, and release into gravity loop.",
    explanation: "Spring pull displacement directly maps to initial launch impulse velocity.",
    hint: "How is slingshot pull vector converted into velocity?",
    level: "advanced",
    codeExample: "vx = (origin_x - mx) * scale; vy = (origin_y - my) * scale"
  },
  {
    question: "What is Gravitational Slingshot (Orbital Assist) in planetary physics?",
    shortAnswer: "Using the gravitational pull and orbital motion of a planet to alter the speed and trajectory of a spacecraft.",
    explanation: "N-body Newtonian gravity models orbital slingshot mechanics.",
    hint: "What technique accelerates spacecraft using planetary gravity wells?",
    level: "expert",
    codeExample: "# N-body Newton: F = G * (m1*m2) / r^2"
  },
  {
    question: "Why do small delta time values (`dt = 0.016`) produce more accurate physics than large values (`dt = 0.5`)?",
    shortAnswer: "Smaller `dt` steps minimize numerical integration truncation error in Euler approximations.",
    explanation: "Euler integration error scales linearly with time step size.",
    hint: "Why does smaller dt improve simulation accuracy?",
    level: "moderate",
    codeExample: "# Smaller dt = higher mathematical precision"
  },
  {
    question: "How do you simulate a basketball spinning and bouncing with Magnus effect in air?",
    shortAnswer: "Apply a perpendicular aerodynamic lift force `F_magnus = S * (omega x v)` to acceleration.",
    explanation: "The Magnus effect models curving baseball pitches and spinning basketball arcs.",
    hint: "What aerodynamic effect curves spinning balls in flight?",
    level: "expert",
    codeExample: "# Magnus lift: acc_y += spin * vx * lift_coeff"
  },
  {
    question: "How do you draw the trajectory projection guide dots ahead of the projectile launch?",
    shortAnswer: "Run a temporary mathematical loop calculating future positions `(x(t), y(t))` and draw small tracer dots along the predicted arc.",
    explanation: "Predictive aiming lines show players where the shot will land before firing.",
    hint: "How are trajectory aiming guide lines calculated in advance?",
    level: "advanced",
    codeExample: "for t_step in range(10): draw_dot(calc_pos(t_step))"
  },
  {
    question: "What is the difference between Speed and Velocity?",
    shortAnswer: "Speed is a scalar quantity (magnitude); Velocity is a vector quantity with both magnitude and directional components `(vx, vy)`.",
    explanation: "Velocity dictates directional motion in 2D space.",
    hint: "Which physics quantity includes direction in addition to magnitude?",
    level: "basic",
    codeExample: "speed = math.hypot(vx, vy)  # Magnitude from velocity vector"
  },
  {
    question: "How do you simulate buoyancy for an object floating on water?",
    shortAnswer: "If `y < water_level`, apply an upward buoyant force opposing gravity: `vy += (buoyancy - gravity) * dt`.",
    explanation: "Archimedes' principle balances upward buoyancy against downward gravity.",
    hint: "How is floating buoyancy calculated beneath the water line?",
    level: "moderate",
    codeExample: "if y < water_y: vy += buoyancy_force"
  },
  {
    question: "What is Superelastic Collision (Elasticity > 1.0)?",
    shortAnswer: "A physical impossibility in passive physics where energy is added on impact, causing the ball to bounce higher and higher exponentially.",
    explanation: "Setting elasticity > 1.0 creates explosive trampoline powerups in arcade games.",
    hint: "What happens in code if elasticity is set to 1.2?",
    level: "moderate",
    codeExample: "elasticity = 1.2  # Adds kinetic energy on bounce"
  },
  {
    question: "How do you animate dust clouds puffing outward when a heavy rock impacts the ground?",
    shortAnswer: "Spawn 6 small circle particles at impact point with randomized upward and outward velocities `(vx, vy)` that fade over 300ms.",
    explanation: "Impact particle bursts provide visceral tactile feedback for heavy collisions.",
    hint: "How are ground impact dust effects generated?",
    level: "advanced",
    codeExample: "spawn_dust_particles(impact_x, floor_y)"
  },
  {
    question: "What is the 3-step Golden Rule for 2D Physics in Python Turtle?",
    shortAnswer: "1. Apply forces to acceleration | 2. Update velocity `vy -= g * dt` | 3. Update position `y += vy * dt` and handle collisions.",
    explanation: "This 3-step kinematic pipeline powers all Newtonian physics engines.",
    hint: "What 3 steps execute Newtonian physics integration?",
    level: "basic",
    codeExample: "# 1. Forces -> 2. Velocity -> 3. Position & Collisions"
  },
  {
    question: "How does 2D physics simulation connect to engineering and science careers?",
    shortAnswer: "The exact same Euler/Verlet equations simulate aerospace flight dynamics, vehicle crash testing, orbital satellite tracking, and robotic arm kinematics.",
    explanation: "Game physics is applied computational mathematics and Newtonian mechanics.",
    hint: "How do game physics equations apply to aerospace and robotics engineering?",
    level: "basic",
    codeExample: "# Real-world computational physics and robotics foundations"
  }
];

export default questions;
