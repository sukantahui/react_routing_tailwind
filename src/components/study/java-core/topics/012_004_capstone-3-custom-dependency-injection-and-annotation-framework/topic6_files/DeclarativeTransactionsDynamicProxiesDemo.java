/**
 * Java Core Tutorial - Module 012_004: Custom DI Framework
 * Topic 6: Declarative Transactions - @Transactional & Dynamic Proxies
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.minispring;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class DeclarativeTransactionsDynamicProxiesDemo {

    public interface AccountService {
        void transfer(String from, String to, double amount);
    }

    public static class AccountServiceImpl implements AccountService {
        @Override
        public void transfer(String from, String to, double amount) {
            System.out.println("   [BUSINESS LOGIC]: Transferring ₹" + amount + " from " + from + " to " + to);
            if (amount > 50000) {
                throw new RuntimeException("Limit exceeded! Transaction failed.");
            }
        }
    }

    public static class TransactionProxyFactory {
        @SuppressWarnings("unchecked")
        public static <T> T createProxy(T target, Class<T> interfaceType) {
            return (T) Proxy.newProxyInstance(
                interfaceType.getClassLoader(),
                new Class<?>[]{interfaceType},
                new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        System.out.println("   >>> [TX BEGIN]: conn.setAutoCommit(false)");
                        try {
                            Object result = method.invoke(target, args);
                            System.out.println("   >>> [TX COMMIT]: conn.commit() ✅");
                            return result;
                        } catch (Exception ex) {
                            System.err.println("   >>> [TX ROLLBACK]: conn.rollback() ❌");
                            throw ex.getCause() != null ? ex.getCause() : ex;
                        }
                    }
                }
            );
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: DECLARATIVE TRANSACTIONS WITH PROXIES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AccountService realService = new AccountServiceImpl();
        AccountService proxyService = TransactionProxyFactory.createProxy(realService, AccountService.class);

        System.out.println("1. Test Successful Transaction:");
        proxyService.transfer("ACC-BKP-1", "ACC-SMR-2", 10000.0);

        System.out.println("
2. Test Failed Transaction (Triggers Automatic Rollback):");
        try {
            proxyService.transfer("ACC-BKP-1", "ACC-SMR-2", 80000.0);
        } catch (Exception e) {
            System.out.println("Caught Expected Business Error: " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}
