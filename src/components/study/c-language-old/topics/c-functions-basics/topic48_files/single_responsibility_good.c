// single_responsibility_good.c – Each function has one job
#include <stdio.h>
#include <stdbool.h>

// Input functions
int getEmployeeId() {
    int id;
    printf("Enter employee ID: ");
    scanf("%d", &id);
    return id;
}

float getHoursWorked() {
    float hours;
    printf("Enter hours worked: ");
    scanf("%f", &hours);
    return hours;
}

float getHourlyRate() {
    float rate;
    printf("Enter hourly rate: ");
    scanf("%f", &rate);
    return rate;
}

// Validation functions
bool isValidHours(float hours) {
    return (hours >= 0 && hours <= 168);
}

bool isValidRate(float rate) {
    return (rate >= 0);
}

// Calculation functions
float calculateGross(float hours, float rate) {
    return hours * rate;
}

float calculateTax(float gross) {
    return gross * 0.2;  // 20% tax
}

// Output function
void printPaySlip(int id, float gross, float tax, float net) {
    printf("\n--- Pay Slip ---\n");
    printf("Employee ID: %d\n", id);
    printf("Gross Salary: %.2f\n", gross);
    printf("Tax (20%%): %.2f\n", tax);
    printf("Net Salary: %.2f\n", net);
}

int main() {
    int id = getEmployeeId();
    float hours = getHoursWorked();
    float rate = getHourlyRate();
    
    if (!isValidHours(hours)) {
        printf("Invalid hours!\n");
        return 1;
    }
    if (!isValidRate(rate)) {
        printf("Invalid rate!\n");
        return 1;
    }
    
    float gross = calculateGross(hours, rate);
    float tax = calculateTax(gross);
    float net = gross - tax;
    
    printPaySlip(id, gross, tax, net);
    return 0;
}