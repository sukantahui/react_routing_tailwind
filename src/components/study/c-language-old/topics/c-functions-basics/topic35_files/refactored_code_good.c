// refactored_code_good.c – DRY: validation logic in a function
#include <stdio.h>
#include <stdbool.h>

// Function to check if age is valid (18-60)
bool isValidAge(int age) {
    return (age >= 18 && age <= 60);
}

// Function to process one person
void processPerson(const char* name) {
    int age;
    printf("Enter age of %s: ", name);
    scanf("%d", &age);
    if (isValidAge(age)) {
        printf("%s is eligible.\n", name);
    } else {
        printf("%s is NOT eligible.\n", name);
    }
}

int main() {
    processPerson("Swadeep");
    processPerson("Tuhina");
    processPerson("Abhronila");
    return 0;
}