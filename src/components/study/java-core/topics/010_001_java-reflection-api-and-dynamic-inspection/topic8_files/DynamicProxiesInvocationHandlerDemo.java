/**
 * Java Core Tutorial - Module 010_001: Java Reflection API & Dynamic Member Inspection
 * Topic 8: Dynamic Proxies - Proxy.newProxyInstance & InvocationHandler
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.reflection;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class DynamicProxiesInvocationHandlerDemo {

    // 1. Target Interface (Dynamic Proxies require interfaces!)
    public interface StudentFeeService {
        void collectFee(String studentName, double amount);
        double checkBalance(String studentName);
    }

    // 2. Real Implementation
    public static class StudentFeeServiceImpl implements StudentFeeService {
        @Override
        public void collectFee(String studentName, double amount) {
            System.out.println("   [DB EXECUTION]: ₹" + amount + " fee recorded for " + studentName);
        }

        @Override
        public double checkBalance(String studentName) {
            return 0.0; // Clear balance
        }
    }

    // 3. Dynamic InvocationHandler: Intercepts all method calls (AOP Logging & Timing)
    public static class LoggingInvocationHandler implements InvocationHandler {
        private final Object target;

        public LoggingInvocationHandler(Object target) {
            this.target = target;
        }

        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            System.out.println("   ⏱️ [AOP PROXY INTERCEPTOR - BEFORE]: Invoking method: " + method.getName() + "()");
            long start = System.currentTimeMillis();

            // Delegate to real target object:
            Object result = method.invoke(target, args);

            long duration = System.currentTimeMillis() - start;
            System.out.println("   ⏱️ [AOP PROXY INTERCEPTOR - AFTER]: Method " + method.getName() + "() completed in " + duration + " ms\n");
            return result;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: DYNAMIC PROXIES & INVOCATIONHANDLER - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentFeeService realService = new StudentFeeServiceImpl();

        // 4. Creating Dynamic Proxy Instance at Runtime:
        StudentFeeService proxyService = (StudentFeeService) Proxy.newProxyInstance(
            StudentFeeService.class.getClassLoader(),
            new Class<?>[]{StudentFeeService.class},
            new LoggingInvocationHandler(realService)
        );

        System.out.println(">>> 1. Proxy Class Name: " + proxyService.getClass().getName() + " ($Proxy0)\n");

        // Executing methods through the Dynamic Proxy:
        proxyService.collectFee("Swadeep Paul", 4500.0);
        proxyService.checkBalance("Tuhina Das");

        System.out.println("==========================================================================");
    }
}
