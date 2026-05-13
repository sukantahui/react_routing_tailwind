// ConnectionPoolMonitor.java - Monitoring HikariCP pool via JMX
package com.school.monitor;

import com.zaxxer.hikari.HikariPoolMXBean;
import com.zaxxer.hikari.HikariDataSource;
import javax.management.MBeanServer;
import javax.management.ObjectName;
import java.lang.management.ManagementFactory;

public class ConnectionPoolMonitor {
    public static void printPoolStats(HikariDataSource dataSource) {
        HikariPoolMXBean poolBean = dataSource.getHikariPoolMXBean();
        System.out.println("Active connections: " + poolBean.getActiveConnections());
        System.out.println("Idle connections: " + poolBean.getIdleConnections());
        System.out.println("Total connections: " + poolBean.getTotalConnections());
        System.out.println("Threads awaiting connection: " + poolBean.getThreadsAwaitingConnection());
    }
    
    // Using JMX (if registerMbeans=true)
    public static void jmxMonitoring() throws Exception {
        MBeanServer mbs = ManagementFactory.getPlatformMBeanServer();
        ObjectName poolName = new ObjectName("com.zaxxer.hikari:type=Pool (SchoolPool)");
        Integer active = (Integer) mbs.getAttribute(poolName, "ActiveConnections");
        System.out.println("JMX - Active connections: " + active);
    }
}