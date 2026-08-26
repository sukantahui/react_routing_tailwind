/**
 * Java Core Tutorial - Module 012_004: Custom DI Framework
 * Topic 5: Reflection Injection - Field & Constructor Wiring
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.minispring;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public class FieldAndConstructorReflectionInjectionDemo {

    public static class MiniInjector {
        private final Map<Class<?>, Object> beanMap = new HashMap<>();

        public void register(Object bean) {
            beanMap.put(bean.getClass(), bean);
        }

        public void injectDependencies(Object target) throws Exception {
            Class<?> clazz = target.getClass();
            for (Field field : clazz.getDeclaredFields()) {
                if (field.isAnnotationPresent(CustomFrameworkAnnotationsDemo.Autowired.class)) {
                    Class<?> dependencyType = field.getType();
                    Object dependency = beanMap.get(dependencyType);

                    if (dependency == null) {
                        throw new IllegalStateException("Unsatisfied dependency of type: " + dependencyType.getName());
                    }

                    field.setAccessible(true); // Allow setting private field!
                    field.set(target, dependency);
                    System.out.println("   [INJECTED]: " + dependencyType.getSimpleName() + " into " + clazz.getSimpleName() + "." + field.getName());
                }
            }
        }
    }

    public static class UserRepository {
        public String findUser(long id) { return "Swadeep Paul (Barrackpore)"; }
    }

    public static class UserService {
        @CustomFrameworkAnnotationsDemo.Autowired
        private UserRepository userRepository;

        public void printUser(long id) {
            System.out.println("User Result: " + userRepository.findUser(id));
        }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: FIELD & CONSTRUCTOR REFLECTION INJECTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        MiniInjector injector = new MiniInjector();
        UserRepository repo = new UserRepository();
        UserService service = new UserService();

        injector.register(repo);
        injector.injectDependencies(service);

        System.out.println("
Testing Injected Service:");
        service.printUser(101L);

        System.out.println("\n==========================================================================");
    }
}
