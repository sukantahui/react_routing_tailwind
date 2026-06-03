import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import Java files using ?raw (Vite syntax)
import studentEntityJava from "./topic13_files/StudentEntity.java?raw";
import validationServiceJava from "./topic13_files/ValidationService.java?raw";
import customValidatorJava from "./topic13_files/CustomValidator.java?raw";

// Import FAQ questions (30 items, moderate to expert)
import questions from "./topic13_files/topic13_questions";

// Keyframes for animations
const animationStyles = `
  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-slide-up {
    animation: fadeSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
  }
  @keyframes softGlow {
    0% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
    50% { box-shadow: 0 0 0 6px rgba(59,130,246,0.2); }
    100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
  }
  .animate-soft-glow {
    animation: softGlow 1.2s ease-in-out 2;
  }
`;

const Topic13 = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
      <style>{animationStyles}</style>

      {/* Header Section */}
      <div className="animate-fade-slide-up text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
          Bean Validation (Hibernate Validator)
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Learn how to enforce data integrity with Jakarta Bean Validation (javax.validation). 
          Hibernate Validator is the reference implementation – integrate constraints like @NotNull, @Size, @Email, 
          and even create custom validators. Keep your domain models clean and your data consistent.
        </p>
      </div>

      {/* 1. Conceptual explanation */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Why Bean Validation?</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>Bean Validation</strong> (JSR 380) provides a standard way to declare constraints via annotations. 
            Hibernate Validator is the official implementation. Instead of scattering validation logic (if statements) 
            across your code, you define rules once on your entity/model classes. Hibernate can automatically validate 
            entities before persisting or updating them.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-950/40 p-4 rounded-xl border-l-4 border-green-400">
              <p className="font-semibold text-green-800 dark:text-green-200">🎯 Centralized constraints</p>
              <p className="text-sm">Annotations like @NotNull, @Min, @Pattern live with the entity.</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl border-l-4 border-purple-400">
              <p className="font-semibold text-purple-800 dark:text-purple-200">🔄 Automatic integration</p>
              <p className="text-sm">Hibernate triggers validation during persist, merge, update – configurable via groups.</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border-l-4 border-blue-400">
            <p className="text-sm italic text-blue-800 dark:text-blue-200">
              💡 <strong>Real-world scenario:</strong> In the school system at Barrackpore, when registering a new student "Swadeep", 
              you want to ensure the name is not blank, email is valid, and age is between 5 and 18. Bean Validation handles all that 
              declaratively, reducing boilerplate.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Common Annotations + Example Entity */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4">
          Core Validation Annotations
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md">
            <h3 className="font-bold text-lg">Common built-in constraints</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>🔹 <code className="bg-gray-100 dark:bg-gray-700 px-1">@NotNull</code> – value must not be null</li>
              <li>🔹 <code className="bg-gray-100 dark:bg-gray-700 px-1">@NotEmpty</code> – CharSequence/Collection/Map not null and not empty</li>
              <li>🔹 <code className="bg-gray-100 dark:bg-gray-700 px-1">@NotBlank</code> – trimmed string length > 0</li>
              <li>🔹 <code className="bg-gray-100 dark:bg-gray-700 px-1">@Size(min, max)</code> – length / size limits</li>
              <li>🔹 <code className="bg-gray-100 dark:bg-gray-700 px-1">@Min / @Max</code> – numeric boundaries</li>
              <li>🔹 <code className="bg-gray-100 dark:bg-gray-700 px-1">@Pattern(regex)</code> – regular expression match</li>
              <li>🔹 <code className="bg-gray-100 dark:bg-gray-700 px-1">@Email</code> – valid email format</li>
              <li>🔹 <code className="bg-gray-100 dark:bg-gray-700 px-1">@Past / @Future</code> – date restrictions</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md">
            <h3 className="font-bold text-lg">Hibernate Validator extras</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>🔸 <code className="bg-gray-100 dark:bg-gray-700 px-1">@Length(min, max)</code> – Hibernate-specific, like @Size but for strings</li>
              <li>🔸 <code className="bg-gray-100 dark:bg-gray-700 px-1">@Range(min, max)</code> – numeric range</li>
              <li>🔸 <code className="bg-gray-100 dark:bg-gray-700 px-1">@UniqueElements</code> – no duplicates in collection</li>
              <li>🔸 <code className="bg-gray-100 dark:bg-gray-700 px-1">@ScriptAssert</code> – script-based validation (powerful but complex)</li>
            </ul>
          </div>
        </div>
        <JavaFileLoader
          fileModule={studentEntityJava}
          title="StudentEntity.java (with Validation Constraints)"
          highlightLines={[8, 12, 15, 19, 23]}
        />
      </section>

      {/* 3. Validation in Service Layer */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-green-500 pl-4">
          Programmatic Validation (Validator API)
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          You can validate objects manually using <code>javax.validation.Validator</code>. This is useful for 
          DTOs, service layer inputs, or before calling Hibernate.
        </p>
        <JavaFileLoader
          fileModule={validationServiceJava}
          title="ValidationService.java (Manual validation & integration)"
          highlightLines={[12, 17, 25]}
        />
        <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
          <p className="text-sm font-mono text-amber-800 dark:text-amber-300">
            🧠 <strong>Teacher insight:</strong> You can combine validation groups (e.g., Create, Update) to apply different rules 
            in different scenarios. Use <code>@Validated</code> in Spring controllers to trigger validation automatically.
          </p>
        </div>
      </section>

      {/* 4. Custom Validator Example */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-purple-500 pl-4">
          Creating Custom Validators
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          When built-in constraints aren't enough, define your own annotation and a corresponding 
          <code>ConstraintValidator</code> implementation.
        </p>
        <JavaFileLoader
          fileModule={customValidatorJava}
          title="Custom Validator (CaseMode, PhoneNumber, etc.)"
          highlightLines={[6, 14, 28]}
        />
        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-700">
          <p className="text-sm italic text-indigo-800 dark:text-indigo-200">
            💡 Custom validators are powerful for business rules: e.g., "Student name must not contain profanity", 
            "Course code must follow pattern 'CS101'".
          </p>
        </div>
      </section>

      {/* 5. SVG: Validation Flow */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:500ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-teal-500 pl-4">
          🔄 Validation Process (Step by Step)
        </h2>
        <div className="bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
          <svg viewBox="0 0 900 340" className="w-full h-auto" aria-label="Validation flow">
            <rect x="30" y="50" width="180" height="60" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
            <text x="120" y="80" textAnchor="middle" className="text-sm font-semibold fill-blue-800 dark:fill-blue-300">1. Annotate Entity</text>
            <text x="120" y="100" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">@NotNull, @Size, etc.</text>

            <line x1="210" y1="80" x2="260" y2="80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="270" y="50" width="180" height="60" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
            <text x="360" y="80" textAnchor="middle" className="text-sm font-semibold fill-green-800 dark:fill-green-300">2. Call Validator</text>
            <text x="360" y="100" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">validate(entity)</text>

            <line x1="450" y1="80" x2="500" y2="80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="510" y="40" width="180" height="80" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" />
            <text x="600" y="65" textAnchor="middle" className="text-sm font-semibold fill-amber-800 dark:fill-amber-300">3. ConstraintViolation</text>
            <text x="600" y="85" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">if violations exist</text>
            <text x="600" y="105" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">→ handle or reject</text>

            <line x1="690" y1="80" x2="740" y2="80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="750" y="50" width="140" height="60" rx="8" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" />
            <text x="820" y="80" textAnchor="middle" className="text-sm font-semibold fill-red-800 dark:fill-red-300">4. Persist / Success</text>

            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>
          </svg>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Validation happens before database interaction, ensuring data integrity at the application level.
          </p>
        </div>
      </section>

      {/* 6. Common Pitfalls */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2 border-l-4 border-red-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">⚠️ Common Pitfalls & Misconceptions</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { title: "Forgetting to add Hibernate Validator dependency", desc: "Hibernate ORM includes the validation API, but you need the implementation (hibernate-validator) and EL implementation (like jakarta.el).", fix: "Add hibernate-validator and jakarta.el (or glassfish el) to your project." },
            { title: "Validation not triggered on persist", desc: "Hibernate only validates automatically if you have a BeanValidationIntegration configured. In JPA, validation is enabled by default.", fix: "Set javax.persistence.validation.mode to AUTO or CALLBACK." },
            { title: "Using @NotNull vs @NotEmpty vs @NotBlank incorrectly", desc: "Many beginners use @NotNull for strings that must not be empty – it allows empty strings.", fix: "Use @NotBlank for strings that must have content, @NotEmpty for collections.", hint: "For strings: @NotBlank is usually what you want." },
            { title: "Not handling ConstraintViolationException", desc: "Hibernate throws this exception on validation failure; if uncaught, transaction rolls back.", fix: "Catch and translate to user-friendly messages." },
          ].map((pitfall, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800/70 rounded-xl p-5 border-l-4 border-red-400 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="font-bold text-red-700 dark:text-red-300">{pitfall.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{pitfall.desc}</p>
              <p className="text-xs font-mono text-green-700 dark:text-green-400 mt-3">✅ {pitfall.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Best Practices */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:700ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-emerald-500 pl-4">✅ Best Practices & Industry Habits</h2>
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-md">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Annotate <strong>DTOs</strong> (Data Transfer Objects) as well as entities – validation should happen as early as possible, preferably at controller boundary.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Use <strong>validation groups</strong> to differentiate between create and update operations (e.g., @NotNull(groups=Create.class) but optional on update).</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Keep validation messages externalized (ValidationMessages.properties) for internationalization.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Use <strong>@Valid</strong> on nested objects to trigger cascaded validation.</li>
          </ul>
          <hr className="my-4 border-gray-300 dark:border-gray-700" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
            {["Include hibernate-validator", "Use @NotBlank for strings", "Catch ConstraintViolationException", "Test with invalid data"].map((item, i) => (
              <div key={i} className="bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-md text-xs font-medium text-emerald-800 dark:text-emerald-200">
                📌 {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Hint Section */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards] bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
        <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">💭 Think & Experiment</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Observe carefully:</strong> What happens if you put @NotNull on a primitive int? (Primitives cannot be null, so it's redundant).</p>
            <p className="text-xs text-gray-500 mt-2">🔍 Test using Integer wrapper if you need nullability.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Try changing this:</strong> Create a cross-field validator (@ScriptAssert or custom) that checks that “endDate” is after “startDate”.</p>
            <p className="text-xs text-gray-500 mt-2">🔄 Many real-world rules involve multiple fields.</p>
          </div>
        </div>
      </section>

      {/* 9. Pro Tips */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:900ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2">
          <span className="text-3xl">💎</span>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Pro Tips & Classroom shortcuts</h2>
        </div>
        <div className="bg-cyan-50 dark:bg-cyan-950/40 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="text-cyan-600">🔁</div>
            <div><strong>Lombok + Validation:</strong> Use @Builder and @FieldDefaults to keep entities clean, but validation still works.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">⚡</div>
            <div><strong>Testing validation:</strong> Use <code>ValidatorFactory</code> in unit tests to verify constraints without Hibernate.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">🧩</div>
            <div><strong>Constraint composition:</strong> Combine multiple annotations into a single custom annotation with @ReportAsSingleViolation.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">📌</div>
            <div><strong>Spring integration:</strong> Use @Validated on controller methods, and MethodValidationPostProcessor for service level validation.</div>
          </div>
        </div>
      </section>

      {/* 10. FAQ Component (30 questions) */}
      <div className="animate-fade-slide-up [animation-delay:1000ms] opacity-0 [animation-fill-mode:forwards]">
        <FAQTemplate title="Bean Validation (Hibernate Validator) FAQs" questions={questions} />
      </div>

      {/* 11. Teacher's Note */}
      <div className="animate-fade-slide-up [animation-delay:1100ms] opacity-0 [animation-fill-mode:forwards]">
        <Teacher note={
          "🎓 Teacher's Note: Emphasize that Bean Validation is not just for JPA – it's a general-purpose Java API. In web layers, it protects against malicious input. Show students how to use @Valid in Spring Boot REST controllers – that's where they'll see it most often. Also, demonstrate group validation for partial updates. A common project: build a student registration form with real-time feedback using JSF or Spring + Thymeleaf and bean validation."
        } />
      </div>

      <div className="text-center text-xs text-gray-400 pt-6">
        Topic 13 — Bean Validation (Hibernate Validator) | Industry-grade best practices
      </div>
    </div>
  );
};

export default Topic13;