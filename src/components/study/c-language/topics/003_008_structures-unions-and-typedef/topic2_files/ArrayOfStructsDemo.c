#include <stdio.h>

struct StudentRecord {
    int id;
    char name[30];
    float marks;
};

int main(void) {
    printf("====================================================\n");
    printf("  CODER & ACCOTAX - ARRAY OF STRUCTURES DEMO\n");
    printf("  Center: Barrackpore | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    struct StudentRecord classList[3] = {
        {101, "Swadeep Biswas", 94.5f},
        {102, "Tuhina Das", 91.0f},
        {103, "Abhronila Roy", 96.8f}
    };

    printf("Student Database (3 Records Loaded):\n");
    float total = 0.0f;
    for(int i = 0; i < 3; i++) {
        printf("[ID: %d] %-15s - Grade: %s (%.2f%%)\n", classList[i].id, classList[i].name, classList[i].marks >= 93 ? "A+" : "A", classList[i].marks);
        total += classList[i].marks;
    }
    printf("\nClass Average Marks: %.2f%%\n", total / 3.0f);
    return 0;
}