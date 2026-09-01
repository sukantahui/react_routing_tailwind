/**
 * ============================================================================
 * Project 5: Time Duration Converter & Seconds Breakdown Engine
 * Module: 001_001 - Getting Started with C & Compiler Architecture
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

void convertSecondsToHMS(long long totalSeconds) {
    long long days = totalSeconds / 86400LL;
    long long rem1 = totalSeconds % 86400LL;

    long long hours = rem1 / 3600LL;
    long long rem2 = rem1 % 3600LL;

    long long minutes = rem2 / 60LL;
    long long seconds = rem2 % 60LL;

    printf("Input: %10lld Raw Seconds\n", totalSeconds);
    printf(">> Decomposed Time: %lld Days, %02lld Hours, %02lld Minutes, %02lld Seconds\n",
           days, hours, minutes, seconds);
    printf(">> Digital Clock Display: [D:%lld | %02lld:%02lld:%02lld]\n\n",
           days, hours, minutes, seconds);
}

int main(void) {
    printf("===================================================================\n");
    printf("     TIME DURATION CONVERTER & DECOMPOSER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    convertSecondsToHMS(3665LL);       /* 1 hour, 1 minute, 5 seconds */
    convertSecondsToHMS(86400LL);      /* Exactly 1 day */
    convertSecondsToHMS(31557600LL);   /* 1 astronomical year */

    printf("===================================================================\n");
    return 0;
}
