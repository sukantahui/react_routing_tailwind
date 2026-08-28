/**
 * Topic 1 Demo: Role of JavaScript in Modern Web Development
 * Module: 001_001_getting-started-with-javascript
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 1: ROLE OF JS IN MODERN WEB ARCHITECTURE");
console.log("==================================================");

// ─── 1. REACTIVE UI STATE & DYNAMIC DOM SIMULATION ───────────────
console.log("");
console.log("1. Reactive UI State & Dynamic Component Model:");

class ReactiveComponent {
  constructor(initialState = {}) {
    this.state = initialState;
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.subscribers.forEach(cb => cb(this.state));
  }
}

const userCard = new ReactiveComponent({
  student: "Tuhina",
  center: "Barrackpore Lab",
  points: 120,
  isLoggedIn: true
});

userCard.subscribe((state) => {
  console.log("State Transition ->", `${state.student} (${state.center}) has ${state.points} points. Logged In: ${state.isLoggedIn}`);
});

userCard.setState({ points: 150 });
userCard.setState({ points: 200, center: "Naihati Lab" });

// ─── 2. ASYNCHRONOUS API DATA STREAM & ERROR BOUNDARY ────────────
console.log("");
console.log("2. Client-Server Asynchronous Data Pipeline:");

function simulateFetchCourseData(courseId) {
  console.log(`Initiating asynchronous network request for Course ID: ${courseId}...`);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (courseId === "JS-PRO-101") {
        resolve({
          status: 200,
          course: "JavaScript Ultra Expert",
          enrolledCount: 45,
          mentor: "Sukanta Hui",
          topicsCovered: ["V8 Internals", "DOM Engine", "Async Architectures"]
        });
      } else {
        reject(new Error(`Course ${courseId} not found in Barrackpore registry`));
      }
    }, 50);
  });
}

simulateFetchCourseData("JS-PRO-101")
  .then(data => {
    console.log("Async API Response Received:");
    console.table([data]);
  })
  .catch(err => console.error("Network Fetch Error:", err.message));

// ─── 3. FORM VALIDATION & SANITIZATION RULE ENGINE ───────────────
console.log("");
console.log("3. Enterprise Client-Side Validation Engine:");

function validateStudentRegistration(payload) {
  const errors = [];

  if (!payload.name || payload.name.trim().length < 3) {
    errors.push("Name must contain at least 3 alphabetic characters");
  }
  if (!payload.email || !payload.email.includes("@")) {
    errors.push("Valid email address required");
  }
  if (typeof payload.age !== "number" || payload.age < 15 || payload.age > 70) {
    errors.push("Age must be a valid number between 15 and 70");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    sanitized: errors.length === 0 ? {
      name: payload.name.trim(),
      email: payload.email.toLowerCase().trim(),
      age: payload.age,
      center: payload.center || "Barrackpore"
    } : null
  };
}

const validTest = validateStudentRegistration({ name: "  Abhronila ", email: "ABHRONILA@CODER.COM", age: 21, center: "Ichapur" });
const invalidTest = validateStudentRegistration({ name: "Su", email: "invalid-email", age: 12 });

console.log("Validation Passed Case:", validTest);
console.log("Validation Failed Case:", invalidTest);

// ─── 4. CLIENT-SIDE ROUTING & STATE DISPATCH ENGINE ──────────────
console.log("");
console.log("4. SPA Client-Side Routing & View Dispatcher:");

const Router = {
  routes: {},
  register(path, handler) {
    this.routes[path] = handler;
  },
  navigate(path, params = {}) {
    console.log(`[SPA Router] Navigating to '${path}' without full page reload`);
    if (this.routes[path]) {
      return this.routes[path](params);
    }
    return `404: View '${path}' not found`;
  }
};

Router.register("/dashboard", (params) => `Loaded Dashboard for ${params.user || 'Guest'}`);
Router.register("/study/javascript", (params) => `Loaded Topic: ${params.topic || 'Getting Started'}`);

console.log(Router.navigate("/dashboard", { user: "Swadeep" }));
console.log(Router.navigate("/study/javascript", { topic: "001_001 Module" }));

// ─── 5. OFFLINE-FIRST CLIENT STORAGE PERSISTENCE MODEL ───────────
console.log("");
console.log("5. Offline Cache & Storage Synchronization Model:");

class OfflineStorageManager {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.memoryCache = new Map();
  }

  save(key, data) {
    const record = { data, savedAt: new Date().toISOString() };
    this.memoryCache.set(key, record);
    console.log(`Cached item '${key}' for instant offline recovery.`);
  }

  get(key) {
    return this.memoryCache.get(key) || null;
  }
}

const offlineCache = new OfflineStorageManager("APP_OFFLINE_CACHE");
offlineCache.save("last_topic", { id: 0, name: "What is JavaScript" });
console.log("Retrieved Cached State:", offlineCache.get("last_topic"));

console.log("");
console.log("✓ All 5 Topic 1 practical examples executed successfully.");
