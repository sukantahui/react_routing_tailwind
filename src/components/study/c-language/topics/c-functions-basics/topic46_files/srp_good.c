// srp_good.c – Each function has a single responsibility
#include <stdio.h>
#include <stdbool.h>

// 1. Input responsibility
int getAge() {
    int age;
    printf("Enter age: ");
    scanf("%d", &age);
    return age;
}

bool getStudentStatus() {
    int status;
    printf("Is student? (1 for yes, 0 for no): ");
    scanf("%d", &status);
    return (status == 1);
}

// 2. Validation responsibility
bool isValidAge(int age) {
    return (age >= 0 && age <= 120);
}

// 3. Calculation responsibility
double calculateTicketPrice(int age, bool isStudent) {
    double price = 100.0;
    if (isStudent) {
        price *= 0.8; // 20% student discount
    }
    if (age >= 60) {
        price *= 0.7; // 30% senior discount
    }
    return price;
}

// 4. Output responsibility
void printPrice(double price) {
    printf("Final ticket price: ₹%.2f\n", price);
}

int main() {
    int age = getAge();
    if (!isValidAge(age)) {
        printf("Invalid age!\n");
        return 1;
    }
    
    bool isStudent = getStudentStatus();
    double price = calculateTicketPrice(age, isStudent);
    printPrice(price);
    
    return 0;
}