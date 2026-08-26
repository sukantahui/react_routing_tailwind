/**
 * Java Core Tutorial - Module 012_002: Core Banking Capstone
 * Topic 3: Connection Pool & DAO Scaffolding - HikariCP & AccountDao
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.banking;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

public class ConnectionPoolAndDaoScaffoldingDemo {

    public interface AccountDao {
        Optional<BigDecimal> getBalance(Connection conn, String accountNumber) throws SQLException;
        void updateBalance(Connection conn, String accountNumber, BigDecimal newBalance) throws SQLException;
    }

    public static class AccountDaoJdbcImpl implements AccountDao {
        @Override
        public Optional<BigDecimal> getBalance(Connection conn, String accountNumber) throws SQLException {
            String sql = "SELECT balance FROM accounts WHERE account_number = ? FOR UPDATE"; // Row lock!
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, accountNumber);
                try (ResultSet rs = pstmt.executeQuery()) {
                    if (rs.next()) {
                        return Optional.of(rs.getBigDecimal("balance"));
                    }
                }
            }
            return Optional.empty();
        }

        @Override
        public void updateBalance(Connection conn, String accountNumber, BigDecimal newBalance) throws SQLException {
            String sql = "UPDATE accounts SET balance = ? WHERE account_number = ?";
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setBigDecimal(1, newBalance);
                pstmt.setString(2, accountNumber);
                pstmt.executeUpdate();
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: HIKARICP & ACCOUNT DAO SCAFFOLDING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("AccountDaoJdbcImpl successfully implements row-level locking with 'FOR UPDATE'.");
        System.out.println("Notice: Connection is passed as a parameter so Service Layer can manage multi-table Transactions!");

        System.out.println("\n==========================================================================");
    }
}
