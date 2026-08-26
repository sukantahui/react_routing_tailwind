/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 13: Enterprise Validation Recipes: Email, Mobile (+91), PAN Card, IPv4 Address
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

import java.util.regex.Pattern;

public class EnterpriseValidationRecipesDemo {

    // 1. Email Address (OWASP Standard):
    public static final Pattern EMAIL_PAT = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$");

    // 2. Indian Mobile Number (+91 followed by 10 digits starting with 6,7,8,9):
    public static final Pattern INDIAN_MOBILE_PAT = Pattern.compile("^(\\+91)?[6-9]\\d{9}$");

    // 3. Indian Income Tax PAN Card (5 Letters + 4 Digits + 1 Letter):
    public static final Pattern PAN_CARD_PAT = Pattern.compile("^[A-Z]{5}[0-9]{4}[A-Z]$");

    // 4. IPv4 Network Address (0-255 octets):
    public static final Pattern IPV4_PAT = Pattern.compile("^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$");

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: ENTERPRISE VALIDATION RECIPES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Email Validation (swadeep.paul@coderaccotax.com): " +
                EMAIL_PAT.matcher("swadeep.paul@coderaccotax.com").matches());

        System.out.println(">>> 2. Indian Mobile Validation (+919830012345): " +
                INDIAN_MOBILE_PAT.matcher("+919830012345").matches());

        System.out.println(">>> 3. Indian PAN Card Validation (ABCDE1234F): " +
                PAN_CARD_PAT.matcher("ABCDE1234F").matches());

        System.out.println(">>> 4. IPv4 Address Validation (192.168.1.100): " +
                IPV4_PAT.matcher("192.168.1.100").matches());

        System.out.println("\n==========================================================================");
    }
}