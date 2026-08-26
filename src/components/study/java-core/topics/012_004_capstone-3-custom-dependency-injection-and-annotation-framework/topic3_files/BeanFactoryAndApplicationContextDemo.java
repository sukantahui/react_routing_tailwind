/**
 * Java Core Tutorial - Module 012_004: Custom DI Framework
 * Topic 3: The Bean Factory & Application Context
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.minispring;

import java.lang.reflect.Constructor;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class BeanFactoryAndApplicationContextDemo {

    public static class ApplicationContext {
        private final Map<Class<?>, Object> singletonRegistry = new ConcurrentHashMap<>();

        public void registerBean(Class<?> clazz) throws Exception {
            if (!singletonRegistry.containsKey(clazz)) {
                Constructor<?> constructor = clazz.getDeclaredConstructor();
                constructor.setAccessible(true);
                Object instance = constructor.newInstance();
                singletonRegistry.put(clazz, instance);
                System.out.println("   [CONTAINER]: Instantiated and registered singleton bean: " + clazz.getSimpleName());
            }
        }

        @SuppressWarnings("unchecked")
        public <T> T getBean(Class<T> clazz) {
            T bean = (T) singletonRegistry.get(clazz);
            if (bean == null) {
                throw new IllegalStateException("No qualifying bean of type " + clazz.getName() + " found!");
            }
            return bean;
        }
    }

    public static class SampleService {
        public void execute() { System.out.println("SampleService executing business logic!"); }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: BEAN FACTORY & APPLICATION CONTEXT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ApplicationContext context = new ApplicationContext();
        context.registerBean(SampleService.class);

        SampleService service = context.getBean(SampleService.class);
        service.execute();

        System.out.println("\n==========================================================================");
    }
}
