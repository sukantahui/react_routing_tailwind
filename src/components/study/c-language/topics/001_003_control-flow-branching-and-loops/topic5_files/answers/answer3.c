/**
 * ============================================================================
 * Project 3: Gregorian Calendar Leap Year & Day-of-Week Zeller's Congruence
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

/* Check Leap Year */
bool isLeapYear(int year) {
    return ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
}

/* Zeller's Congruence Algorithm for Day of the Week */
const char* calculateDayOfWeek(int day, int month, int year) {
    if (month < 3) {
        month += 12;
        year -= 1;
    }
    int K = year % 100;
    int J = year / 100;

    int h = (day + (13 * (month + 1)) / 5 + K + (K / 4) + (J / 4) + (5 * J)) % 7;

    switch (h) {
        case 0: return "Saturday";
        case 1: return "Sunday";
        case 2: return "Monday";
        case 3: return "Tuesday";
        case 4: return "Wednesday";
        case 5: return "Thursday";
        case 6: return "Friday";
        default: return "Unknown";
    }
}

int main(void) {
    printf("===================================================================\n");
    printf("     CALENDAR ENGINE & ZELLER'S CONGRUENCE - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    int testDates[][3] = {
        {15, 8, 1947},  /* India Independence Day */
        {26, 1, 1950},  /* Republic Day */
        {29, 2, 2024},  /* Leap Day */
        {1, 1, 2000}    /* Century Leap Year */
    };

    int totalDates = sizeof(testDates) / sizeof(testDates[0]);

    for (int i = 0; i < totalDates; i++) {
        int d = testDates[i][0];
        int m = testDates[i][1];
        int y = testDates[i][2];

        bool leap = isLeapYear(y);
        const char* dayName = calculateDayOfWeek(d, m, y);

        printf("Date: %02d/%02d/%04d -> %s | Year Type: %s\n",
               d, m, y, dayName, leap ? "LEAP YEAR (366 Days)" : "NORMAL YEAR (365 Days)");
    }

    printf("===================================================================\n");
    return 0;
}
