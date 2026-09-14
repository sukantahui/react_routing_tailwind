/**
 * InPlaceRecordModifierDemo.c
 * Demonstrates high-speed random access record mutation on disk.
 * Modifies an arbitrary record in place without reading or rewriting
 * the remaining file contents.
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int id;
    char name[32];
    int score;
    char grade;
} StudentItem;

void print_all_records(const char *filename) {
    FILE *fp = fopen(filename, "rb");
    if (fp == NULL) return;

    StudentItem s;
    int index = 0;
    while (fread(&s, sizeof(StudentItem), 1, fp) == 1) {
        printf("  [Slot %d] ID: %d | Name: %-16s | Score: %3d | Grade: %c\n",
               index++, s.id, s.name, s.score, s.grade);
    }
    fclose(fp);
}

int main(void) {
    printf("========================================================\n");
    printf("  CODER & ACCOTAX - IN-PLACE RECORD MODIFIER LAB        \n");
    printf("========================================================\n\n");

    const char *db_file = "students_db.bin";

    // 1. Initialize binary file with 4 records
    StudentItem initial_data[4] = {
        {101, "Swadeep", 85, 'B'},
        {102, "Tuhina", 92, 'A'},
        {103, "Abhronila", 88, 'B'},
        {104, "Debangshu", 74, 'C'}
    };

    FILE *fp = fopen(db_file, "wb");
    if (fp == NULL) {
        perror("Error creating database file");
        return 1;
    }
    fwrite(initial_data, sizeof(StudentItem), 4, fp);
    fclose(fp);

    printf("--- 1. INITIAL DATABASE RECORDS ---\n");
    print_all_records(db_file);

    // 2. Perform in-place update of Slot 2 (Abhronila's re-evaluation)
    printf("\n--- 2. UPDATING SLOT 2 (Abhronila) IN-PLACE VIA fseek() ---\n");
    fp = fopen(db_file, "rb+"); // Read + Write binary
    if (fp == NULL) {
        perror("Error opening database in rb+ mode");
        return 1;
    }

    int target_slot = 2; // 0-indexed
    long byte_offset = target_slot * sizeof(StudentItem);

    // Seek directly to slot 2 in O(1) time
    fseek(fp, byte_offset, SEEK_SET);

    // Read existing record
    StudentItem target;
    fread(&target, sizeof(StudentItem), 1, fp);
    printf("  Before: Name: %s, Score: %d, Grade: %c\n", target.name, target.score, target.grade);

    // Update fields in memory
    target.score = 98;
    target.grade = 'A';

    // Seek back to the start of this slot before overwriting!
    fseek(fp, byte_offset, SEEK_SET);

    // Write updated struct in-place
    fwrite(&target, sizeof(StudentItem), 1, fp);
    fclose(fp);
    printf("  After : Name: %s, Score: %d, Grade: %c\n", target.name, target.score, target.grade);
    printf("  [SUCCESS] Overwrote slot %d at byte offset %ld directly on disk!\n",
           target_slot, byte_offset);

    // 3. Display updated database
    printf("\n--- 3. DATABASE STATE AFTER IN-PLACE UPDATE ---\n");
    print_all_records(db_file);

    // Cleanup
    remove(db_file);
    printf("\n  Cleaned up temporary database '%s'.\n", db_file);
    printf("========================================================\n");

    return 0;
}
