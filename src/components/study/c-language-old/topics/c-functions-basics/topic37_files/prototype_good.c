// prototype_good.c – Correct use of function prototype
#include <stdio.h>

// Function prototype (declaration)
float calculateFine(float daysOverdue);

int main() {
    float overdue = 5.5;
    float fine = calculateFine(overdue);
    printf("Fine for %.1f days: ₹%.2f\n", overdue, fine);
    return 0;
}

// Function definition
float calculateFine(float daysOverdue) {
    const float RATE = 2.5;  // ₹2.5 per day
    return daysOverdue * RATE;
}