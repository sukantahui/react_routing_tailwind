// monolithic_student.c – All‑in‑one student record system (hard to maintain)
#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 100
#define NAME_LEN 50

typedef struct {
    int id;
    char name[NAME_LEN];
    int age;
    float marks;
} Student;

Student students[MAX_STUDENTS];
int studentCount = 0;

void addStudent() {
    if (studentCount >= MAX_STUDENTS) {
        printf("Database full!\n");
        return;
    }
    Student s;
    printf("Enter ID: ");
    scanf("%d", &s.id);
    printf("Enter name: ");
    scanf("%s", s.name);
    printf("Enter age: ");
    scanf("%d", &s.age);
    printf("Enter marks: ");
    scanf("%f", &s.marks);
    students[studentCount++] = s;
    printf("Student added.\n");
}

void displayAll() {
    printf("\n--- Student Records ---\n");
    for (int i = 0; i < studentCount; i++) {
        printf("ID: %d, Name: %s, Age: %d, Marks: %.2f\n",
               students[i].id, students[i].name, students[i].age, students[i].marks);
    }
}

float calculateAverage() {
    if (studentCount == 0) return 0;
    float sum = 0;
    for (int i = 0; i < studentCount; i++) {
        sum += students[i].marks;
    }
    return sum / studentCount;
}

void searchById() {
    int id;
    printf("Enter ID to search: ");
    scanf("%d", &id);
    for (int i = 0; i < studentCount; i++) {
        if (students[i].id == id) {
            printf("Found: %s, Age: %d, Marks: %.2f\n",
                   students[i].name, students[i].age, students[i].marks);
            return;
        }
    }
    printf("Student not found.\n");
}

void saveToFile() {
    FILE *fp = fopen("students.txt", "w");
    if (!fp) {
        printf("Error opening file!\n");
        return;
    }
    for (int i = 0; i < studentCount; i++) {
        fprintf(fp, "%d %s %d %.2f\n",
                students[i].id, students[i].name, students[i].age, students[i].marks);
    }
    fclose(fp);
    printf("Data saved.\n");
}

void loadFromFile() {
    FILE *fp = fopen("students.txt", "r");
    if (!fp) return;
    studentCount = 0;
    while (fscanf(fp, "%d %s %d %f",
                  &students[studentCount].id,
                  students[studentCount].name,
                  &students[studentCount].age,
                  &students[studentCount].marks) == 4) {
        studentCount++;
    }
    fclose(fp);
    printf("Data loaded.\n");
}

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