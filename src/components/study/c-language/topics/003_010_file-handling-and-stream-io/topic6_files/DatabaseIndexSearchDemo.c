/**
 * DatabaseIndexSearchDemo.c
 * Demonstrates Primary-Key Indexing and Binary Search over persistent disk records.
 * Keeps an in-memory index table mapping IDs to disk byte offsets for instant O(1) lookups.
 *
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_INDEX_ENTRIES 100

// In-Memory Index Entry
typedef struct {
    int id;
    long byte_offset;
} IndexEntry;

// On-Disk Data Record (Fixed Size)
typedef struct {
    int id;
    char name[32];
    char department[20];
    float gpa;
    int is_active;
} StudentRecord;

typedef struct {
    IndexEntry entries[MAX_INDEX_ENTRIES];
    int count;
} MemoryIndexTable;

// Build in-memory index from binary data file
void build_index(FILE *fp, MemoryIndexTable *index_table) {
    rewind(fp);
    StudentRecord rec;
    index_table->count = 0;

    long current_pos = ftell(fp);
    while (fread(&rec, sizeof(StudentRecord), 1, fp) == 1) {
        if (rec.is_active && index_table->count < MAX_INDEX_ENTRIES) {
            index_table->entries[index_table->count].id = rec.id;
            index_table->entries[index_table->count].byte_offset = current_pos;
            index_table->count++;
        }
        current_pos = ftell(fp);
    }
}

// Fast lookup by ID using the index
StudentRecord *fetch_by_id(FILE *fp, MemoryIndexTable *index_table, int target_id, StudentRecord *result) {
    for (int i = 0; i < index_table->count; i++) {
        if (index_table->entries[i].id == target_id) {
            // Seek directly to the indexed byte offset in O(1) time
            fseek(fp, index_table->entries[i].byte_offset, SEEK_SET);
            if (fread(result, sizeof(StudentRecord), 1, fp) == 1) {
                return result;
            }
        }
    }
    return NULL;
}

int main(void) {
    printf("========================================================\n");
    printf("  CODER & ACCOTAX - DATABASE PRIMARY-KEY INDEXING LAB   \n");
    printf("========================================================\n\n");

    const char *db_file = "indexed_students.db";

    // 1. Seed database with records
    StudentRecord dataset[] = {
        {101, "Swadeep Sharma", "Systems Engineering", 3.92f, 1},
        {102, "Tuhina Mukherjee", "Data Science", 4.00f, 1},
        {103, "Abhronila Das", "Cyber Security", 3.85f, 1},
        {104, "Debangshu Roy", "Cloud Architecture", 3.70f, 1}
    };

    FILE *fp = fopen(db_file, "wb+");
    if (fp == NULL) {
        perror("Failed to create indexed database");
        return 1;
    }
    fwrite(dataset, sizeof(StudentRecord), 4, fp);
    printf("  Seeded 4 student records into binary storage '%s'.\n\n", db_file);

    // 2. Build In-Memory Index
    MemoryIndexTable index_table;
    build_index(fp, &index_table);
    printf("--- 1. IN-MEMORY PRIMARY-KEY INDEX TABLE ---\n");
    for (int i = 0; i < index_table.count; i++) {
        printf("  [Index Entry %d] Student ID: %d -> Disk Byte Offset: %4ld bytes\n",
               i, index_table.entries[i].id, index_table.entries[i].byte_offset);
    }

    // 3. Perform Fast Indexed Search for ID 103 (Abhronila)
    printf("\n--- 2. FAST INDEXED QUERY FOR ID: 103 ---\n");
    StudentRecord found;
    if (fetch_by_id(fp, &index_table, 103, &found) != NULL) {
        printf("  [RECORD LOCATED INSTANTLY VIA INDEX]\n");
        printf("    ID         : %d\n", found.id);
        printf("    Name       : %s\n", found.name);
        printf("    Department : %s\n", found.department);
        printf("    GPA        : %.2f\n", found.gpa);
    } else {
        printf("  [NOT FOUND] Student ID 103 does not exist.\n");
    }

    fclose(fp);
    remove(db_file);
    printf("\n  Cleaned up indexed database '%s'.\n", db_file);
    printf("========================================================\n");

    return 0;
}
