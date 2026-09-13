#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FILENAME "students.dat"
#define MAX_NAME_LEN 50

/* Student Record Structure */
typedef struct {
    int rollNumber;
    char name[MAX_NAME_LEN];
    float marks;
    char grade;
} Student;

/* Helper function to display a student record */
void displayStudent(const Student *s, int index) {
    printf("[%d] Roll: %-4d | Name: %-18s | Marks: %5.2f | Grade: %c\n",
           index, s->rollNumber, s->name, s->marks, s->grade);
}

int main(void) {
    printf("=====================================================\n");
    printf("  C Binary File I/O: Struct Serialization (fwrite/fread)\n");
    printf("=====================================================\n\n");

    /* 1. Array of structs in memory */
    Student roster[] = {
        {101, "Swadeep Sharma", 88.50f, 'A'},
        {102, "Tuhina Roy",     94.00f, 'E'},
        {103, "Abhronila Das",  91.25f, 'E'},
        {104, "Debangshu Pal",  82.75f, 'B'}
    };
    size_t totalStudents = sizeof(roster) / sizeof(roster[0]);

    printf(">>> Step 1: Writing %zu student records to binary file '%s'...\n", totalStudents, FILENAME);
    
    FILE *fpWrite = fopen(FILENAME, "wb");
    if (fpWrite == NULL) {
        perror("Error opening file for binary write");
        return EXIT_FAILURE;
    }

    /* Write all elements in a single contiguous binary block */
    size_t writtenCount = fwrite(roster, sizeof(Student), totalStudents, fpWrite);
    printf("    fwrite successfully wrote %zu records (%zu bytes total).\n", 
           writtenCount, writtenCount * sizeof(Student));
    fclose(fpWrite);

    printf("\n-----------------------------------------------------\n");
    printf(">>> Step 2: Reading individual records back using fread()...\n\n");

    FILE *fpRead = fopen(FILENAME, "rb");
    if (fpRead == NULL) {
        perror("Error opening file for binary read");
        return EXIT_FAILURE;
    }

    Student buffer;
    int recordIndex = 1;

    /* Read record-by-record until fread return count < 1 */
    while (fread(&buffer, sizeof(Student), 1, fpRead) == 1) {
        displayStudent(&buffer, recordIndex++);
    }

    fclose(fpRead);

    printf("\n-----------------------------------------------------\n");
    printf(">>> Step 3: Verifying file size on disk vs calculated size...\n");
    
    FILE *fpSize = fopen(FILENAME, "rb");
    if (fpSize != NULL) {
        fseek(fpSize, 0, SEEK_END);
        long fileSize = ftell(fpSize);
        printf("    sizeof(Student struct) = %zu bytes\n", sizeof(Student));
        printf("    Expected file size     = %zu * %zu = %zu bytes\n", 
               totalStudents, sizeof(Student), totalStudents * sizeof(Student));
        printf("    Actual file size       = %ld bytes\n", fileSize);
        fclose(fpSize);
    }

    printf("\n=== Binary I/O Demonstration Completed Successfully ===\n");
    return EXIT_SUCCESS;
}
