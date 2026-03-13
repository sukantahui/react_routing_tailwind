// prototype_bad.c – Missing prototype (dangerous in pre‑C99, error in modern C)
#include <stdio.h>

int main() {
    float overdue = 5.5;
    // No prototype above – compiler doesn't know calculateFine
    float fine = calculateFine(overdue);  // In C99+ this is an error
    printf("Fine: ₹%.2f\n", fine);
    return 0;
}

float calculateFine(float daysOverdue) {
    const float RATE = 2.5;
    return daysOverdue * RATE;
}