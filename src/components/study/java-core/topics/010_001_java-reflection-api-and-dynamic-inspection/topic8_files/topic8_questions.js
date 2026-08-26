const topic8_questions = [
  {
    "question": "What is the key limitation of JDK Dynamic Proxies (java.lang.reflect.Proxy)?",
    "shortAnswer": "JDK Dynamic Proxies can ONLY proxy interfaces, not concrete classes. To proxy concrete classes without interfaces, libraries use bytecode manipulation tools like CGLIB or ByteBuddy.",
    "explanation": "Spring uses JDK Dynamic Proxies for interfaces and CGLIB for class proxies.",
    "hint": "JDK Dynamic Proxies only support interface proxying, not concrete classes.",
    "level": "Intermediate",
    "codeExample": "Proxy.newProxyInstance(loader, new Class<?>[]{MyInterface.class}, handler);"
  },
  {
    "question": "What are the 3 arguments passed into InvocationHandler.invoke()?",
    "shortAnswer": "1. Object proxy (the dynamic proxy instance itself), 2. Method method (the java.lang.reflect.Method being called), 3. Object[] args (an array of arguments passed to the method).",
    "explanation": "Allows pre-processing, delegation to the target object, and post-processing.",
    "hint": "proxy, method, and args.",
    "level": "Intermediate",
    "codeExample": "public Object invoke(Object proxy, Method method, Object[] args)"
  }
];

export default topic8_questions;
