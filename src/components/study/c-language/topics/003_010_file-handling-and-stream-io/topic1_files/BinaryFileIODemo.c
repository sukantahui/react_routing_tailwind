#include <stdio.h>
#include <stdlib.h>

/**
 * BinaryFileIODemo.c
 * Binary file serialization with fwrite and fread
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

typedef struct {
    int id;
    char name[30];
    float salary;
} Employee;

int main(void) {
    FILE *fp = NULL;
    Employee emp1 = {501, "Sukanta Hui", 75000.0f};
    Employee readEmp;

    printf("=== Binary Struct Persistence Demo ===\n\n");

    // Write binary record
    fp = fopen("employee.bin", "wb");
    if (fp != NULL) {
        fwrite(&emp1, sizeof(Employee), 1, fp);
        fclose(fp);
        printf("Binary employee record saved.\n");
    }

    // Read binary record
    fp = fopen("employee.bin", "rb");
    if (fp != NULL) {
        fread(&readEmp, sizeof(Employee), 1, fp);
        fclose(fp);
        printf("\nRead Binary Record:\n");
        printf("ID: %d | Name: %s | Salary: %.2f\n", readEmp.id, readEmp.name, readEmp.salary);
    }

    return 0;
}
