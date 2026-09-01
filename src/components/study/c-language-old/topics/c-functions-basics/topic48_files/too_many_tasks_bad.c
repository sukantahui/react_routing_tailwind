// too_many_tasks_bad.c – One function does everything
#include <stdio.h>

void manageEmployee() {
    int id;
    float hoursWorked, hourlyRate;
    
    // Input
    printf("Enter employee ID: ");
    scanf("%d", &id);
    printf("Enter hours worked: ");
    scanf("%f", &hoursWorked);
    printf("Enter hourly rate: ");
    scanf("%f", &hourlyRate);
    
    // Validation
    if (hoursWorked < 0 || hoursWorked > 168) {
        printf("Invalid hours!\n");
        return;
    }
    if (hourlyRate < 0) {
        printf("Invalid rate!\n");
        return;
    }
    
    // Calculation
    float salary = hoursWorked * hourlyRate;
    float tax = salary * 0.2;
    float net = salary - tax;
    
    // Output
    printf("Employee ID: %d\n", id);
    printf("Gross Salary: %.2f\n", salary);
    printf("Tax (20%%): %.2f\n", tax);
    printf("Net Salary: %.2f\n", net);
}

int main() {
    manageEmployee();
    return 0;
}