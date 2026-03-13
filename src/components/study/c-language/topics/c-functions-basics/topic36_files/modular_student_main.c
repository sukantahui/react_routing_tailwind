// modular_student_main.c – Main program using the student module
#include <stdio.h>
#include "modular_student.h"

int main() {
    int choice;
    loadFromFile();
    do {
        printf("\n1. Add Student\n2. Display All\n3. Average Marks\n4. Search by ID\n5. Save\n6. Exit\nChoice: ");
        scanf("%d", &choice);
        switch (choice) {
            case 1: addStudent(); break;
            case 2: displayAll(); break;
            case 3: printf("Average: %.2f\n", calculateAverage()); break;
            case 4: searchById(); break;
            case 5: saveToFile(); break;
        }
    } while (choice != 6);
    return 0;
}