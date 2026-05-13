// Topic2.jsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
// Import Java/config files
import hibernateCfgXml from "./topic2_files/hibernate.cfg.xml?raw";
import hibernateProperties from "./topic2_files/hibernate.properties?raw";
import StudentAnnotation from "./topic2_files/StudentAnnotation.java?raw";
import StudentHbmXml from "./topic2_files/Student.hbm.xml?raw";
import XmlBasedExample from "./topic2_files/XmlBasedExample.java?raw";
import AnnotationBasedExample from "./topic2_files/AnnotationBasedExample.java?raw";
// Import questions
import questions from "./topic2_files/topic2_questions";

const Topic2 = () => {
  const [isInView, setIsInView] = useState({
    intro: false,
    xmlConfig: false,
    annotations: false,
    comparison: false,
    codeExamples: false,
    checklist: false,
  });

  const observeSection = (entries, sectionName) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsInView((prev) => ({ ...prev, [sectionName]: true }));
      }
    });
  };

  const createObserver = (ref, sectionName) => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => observeSection(entries, sectionName),
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(ref.current);
    return observer;
  };

  const introRef = useRef(null);
  const xmlConfigRef = useRef(null);
  const annotationsRef = useRef(null);
  const comparisonRef = useRef(null);
  const codeExamplesRef = useRef(null);
  const checklistRef = useRef(null);

  useEffect(() => {
    const observers = [
      createObserver(introRef, "intro"),
      createObserver(xmlConfigRef, "xmlConfig"),
      createObserver(annotationsRef, "annotations"),
      createObserver(comparisonRef, "comparison"),
      createObserver(codeExamplesRef, "codeExamples"),
      createObserver(checklistRef, "checklist"),
    ];
    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  const animationStyle = `
    @keyframes fadeSlideUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fadeSlideUp {
      animation: fadeSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fadeSlideUp {
        animation: none;
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 font-sans leading-relaxed">
      <style>{animationStyle}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <div
          ref={introRef}
          className={clsx(
            "text-center mb-16 transition-all duration-700 ease-out",
            isInView.intro ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            Configuration (XML & Annotations)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Two powerful ways to configure Hibernate mappings and settings
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-sm">
            <span className="font-mono">⚙️</span> XML · Annotations · hibernate.cfg.xml · @Entity
          </div>
        </div>

        {/* Conceptual Overview */}
        <div
          ref={xmlConfigRef}
          className={clsx(
            "mb-16 bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl",
            isInView.xmlConfig ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">📜</span> Configuration Approaches
          </h2>
          <p className="mb-4">
            Hibernate offers two complementary ways to configure persistence:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li><strong className="text-purple-600">XML Configuration</strong> – Traditional, externalized, no need to recompile Java code when mapping changes. Includes <code>hibernate.cfg.xml</code> (main settings) and <code>.hbm.xml</code> files (entity mappings).</li>
            <li><strong className="text-pink-600">Annotation-based Configuration</strong> – Modern, type-safe, uses JPA annotations (<code>@Entity</code>, <code>@Table</code>, <code>@Column</code>) directly in Java classes. Less external files, more intuitive.</li>
          </ul>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl mt-4 border-l-4 border-amber-500">
            <p className="italic">💡 Real-world: Most new projects use annotations (JPA) + <code>hibernate.cfg.xml</code> or <code>application.properties</code> (Spring Boot). XML mappings are seen in legacy systems or when dynamic mapping generation is needed.</p>
          </div>
        </div>

        {/* <!-- XML Configuration Deep Dive --> */}
        <div
          ref={annotationsRef}
          className={clsx(
            "mb-16",
            isInView.annotations ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-4">📁 XML Configuration (hibernate.cfg.xml & .hbm.xml)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="bg-gray-800 text-white px-4 py-2 font-mono text-sm">hibernate.cfg.xml</div>
              <div className="p-4 overflow-auto max-h-96">
                <pre className="text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
  "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
  "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
  <session-factory>
    <!-- DB connection -->
    <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
    <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/school_db</property>
    <property name="hibernate.connection.username">root</property>
    <property name="hibernate.connection.password">password</property>
    
    <!-- Dialect & SQL -->
    <property name="hibernate.dialect">org.hibernate.dialect.MySQL8Dialect</property>
    <property name="hibernate.show_sql">true</property>
    
    <!-- Mapping files -->
    <mapping resource="com/school/model/Student.hbm.xml"/>
  </session-factory>
</hibernate-configuration>`}
                </pre>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="bg-gray-800 text-white px-4 py-2 font-mono text-sm">Student.hbm.xml (XML mapping)</div>
              <div className="p-4 overflow-auto max-h-96">
                <pre className="text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {`<?xml version="1.0"?>
<!DOCTYPE hibernate-mapping PUBLIC
  "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
  "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
<hibernate-mapping package="com.school.model">
  <class name="Student" table="students">
    <id name="id" column="student_id">
      <generator class="identity"/>
    </id>
    <property name="name" column="full_name" length="100"/>
    <property name="city" column="city"/>
  </class>
</hibernate-mapping>`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Annotation Configuration --> */}
        <div
          ref={comparisonRef}
          className={clsx(
            "mb-16",
            isInView.comparison ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-semibold mb-4">🏷️ Annotation-based Configuration (JPA + Hibernate extensions)</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <p className="mb-3">Annotations are placed directly in entity classes. No separate mapping file needed.</p>
            <JavaFileLoader
              fileModule={StudentAnnotation}
              title="Student.java (Annotated Entity)"
              highlightLines={[5,6,7,11,12,13]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">In <code>hibernate.cfg.xml</code>, you would replace <code>&lt;mapping resource="..." /&gt;</code> with <code>&lt;mapping class="com.school.model.Student"/&gt;</code> or use <code>configuration.addAnnotatedClass(Student.class);</code> programmatically.</p>
          </div>
        </div>

        {/* <!-- Code Examples - both approaches --> */}
        <div
          ref={codeExamplesRef}
          className={clsx(
            "space-y-8 mb-16",
            isInView.codeExamples ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold">💻 Using Configurations in Code</h2>
          <JavaFileLoader
            fileModule={XmlBasedExample}
            title="XmlBasedExample.java - Loading XML Configuration & Mapping"
            highlightLines={[7,8,9]}
          />
          <JavaFileLoader
            fileModule={AnnotationBasedExample}
            title="AnnotationBasedExample.java - Using Annotated Classes"
            highlightLines={[8,9,10]}
          />
        </div>

        {/* <!-- Comparison Table --> */}
        <div className="overflow-x-auto mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Aspect</th>
                <th className="py-3 px-4 text-left">XML</th>
                <th className="py-3 px-4 text-left">Annotations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="py-2 px-4 font-medium">Configuration location</td><td className="py-2 px-4">External .hbm.xml files</td><td className="py-2 px-4">Inside Java class (source code)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="py-2 px-4 font-medium">Recompilation needed for mapping changes?</td><td className="py-2 px-4">No (only XML change)</td><td className="py-2 px-4">Yes (requires recompilation)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="py-2 px-4 font-medium">Type safety</td><td className="py-2 px-4">Low (string-based property names)</td><td className="py-2 px-4">High (compile-time checks)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="py-2 px-4 font-medium">Verbosity</td><td className="py-2 px-4">More lines per mapping</td><td className="py-2 px-4">Concise</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="py-2 px-4 font-medium">JPA standard</td><td className="py-2 px-4">Limited (JPA uses orm.xml, not native Hibernate XML)</td><td className="py-2 px-4">Yes (JPA annotations are standard)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><td className="py-2 px-4 font-medium">Best for</td><td className="py-2 px-4">Legacy, dynamic mapping generation, non-Java devs editing mappings</td><td className="py-2 px-4">New projects, rapid development, type safety</td></tr>
            </tbody>
          </table>
        </div>

        {/* Tips, Pitfalls, Checklist */}
        <div
          ref={checklistRef}
          className={clsx(
            "mb-12 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-l-8 border-amber-500",
            isInView.checklist ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>🔹 Use <strong>annotations for 90% of mappings</strong>; only fall back to XML if you need dynamic or conditional mapping.</li>
            <li>🔹 Keep <code>hibernate.cfg.xml</code> minimal and use programmatic configuration for environment-specific settings (e.g., dev vs prod).</li>
            <li>🔹 Enable <code>hibernate.format_sql</code> and <code>hibernate.use_sql_comments</code> for better debugging.</li>
            <li>🔹 For large projects, split <code>hibernate.cfg.xml</code> into multiple files and import with <code>&lt;import resource="..." /&gt;</code>.</li>
            <li>🔹 When mixing annotations and XML, XML overrides annotations if both define the same mapping.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 flex items-center gap-2">⚠️ Common Pitfalls (Beginners)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>❌ Forgetting to add <code>&lt;mapping&gt;</code> entries for entity classes → MappingException.</li>
            <li>❌ Using both <code>hibernate.cfg.xml</code> and <code>hibernate.properties</code> – properties file is ignored if XML exists? Actually both are read, but XML overrides properties. Can cause confusion.</li>
            <li>❌ Specifying wrong DTD version or missing DTD → parsing errors.</li>
            <li>❌ Putting annotations on getters instead of fields (or vice versa) inconsistently – Hibernate uses the access type of the first @Id.</li>
            <li>❌ Not specifying <code>@Column(name="...")</code> when column names differ → default column name is property name, may not match DB.</li>
          </ul>

          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <p className="text-purple-600 dark:text-purple-400 font-semibold">✅ Mini Checklist: Ensure your configuration file(s) are in the classpath. For annotations, add <code>&lt;mapping class="..."&gt;</code> or use <code>addAnnotatedClass()</code>. For XML, verify the path to .hbm.xml is correct. Always test with a simple query first.</p>
          </div>
        </div>

        {/* Hint */}
        <div className="my-12 p-5 bg-gray-100 dark:bg-gray-800/60 rounded-xl border border-gray-300 dark:border-gray-600 text-center transition-all hover:scale-[1.01]">
          <h4 className="font-mono text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">🔎 Think about ...</h4>
          <p className="text-gray-700 dark:text-gray-300">If you are building a school management system for <strong>Shyamnagar High School</strong>, and the database column names are different from Java field names (e.g., <code>student_name</code> vs <code>name</code>), how would you map them using annotations vs XML? Which approach would let the database admin change column names without recompiling the Java code?</p>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Hibernate Configuration (XML vs Annotations) FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-12">
          <Teacher note="🔧 I've seen students spend hours because they forgot to add the mapping entry to hibernate.cfg.xml. My rule: after adding a new entity, always double-check the configuration file. Also, start with annotations – they are the modern way and you'll write less ceremony. But understand XML because many legacy projects still use it. A pro tip: in Spring Boot, you rarely touch XML; it's all properties and @Entity. Yet, knowing both makes you versatile!" />
        </div>
      </div>
    </div>
  );
};

export default Topic2;