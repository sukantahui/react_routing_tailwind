// srp_bad.c – Violation: one function does everything
#include <stdio.h>
#include <stdbool.h>

// This function handles input, validation, calculation, and output – too many responsibilities
void processStudent() {
    int age;
    bool isStudent;
    
    printf("Enter age: ");
    scanf("%d", &age);
    printf("Is student? (1 for yes, 0 for no): ");
    scanf("%d", (int*)&isStudent);
    
    // Validation
    if (age < 0 || age > 120) {
        printf("Invalid age!\n");
        return;
    }
    
    // Calculation
    double price = 100.0;
    if (isStudent) {
        price *= 0.8; // 20% discount
    }
    if (age >= 60) {
        price *= 0.7; // 30% senior discount
    }
    
    // Output
    printf("Final ticket price: ₹%.2f\n", price);
}

int main() {
    processStudent();
    return 0;
}