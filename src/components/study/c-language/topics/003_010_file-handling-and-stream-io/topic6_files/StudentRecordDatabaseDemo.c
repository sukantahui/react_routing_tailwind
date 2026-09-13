#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define DB_FILE "student_master.dat"
#define MAX_NAME 50
#define MAX_COURSE 30

/* Student Record Schema */
typedef struct {
    int id;                 /* Unique Identifier (Key) */
    char name[MAX_NAME];    /* Full Name */
    char course[MAX_COURSE];/* Course (e.g. "Computer Science", "Taxation") */
    float gpa;              /* Cumulative Grade Point Average */
    bool isActive;          /* Tombstone Flag: true = active, false = soft-deleted */
} StudentRecord;

/* Function Prototypes */
void initializeDatabase(void);
bool insertRecord(StudentRecord rec);
bool searchRecordById(int targetId, StudentRecord *result);
bool updateRecordGpa(int targetId, float newGpa);
bool softDeleteRecord(int targetId);
void displayAllRecords(void);
void purgeDatabase(void);

int main(void) {
    printf("=====================================================\n");
    printf("  CAPSTONE: Binary Student Database Engine (CRUD)\n");
    printf("=====================================================\n\n");

    /* Initialize database */
    initializeDatabase();

    /* 1. INSERT RECORDS (Create) */
    printf(">>> Step 1: Inserting 4 initial student records...\n");
    StudentRecord s1 = {101, "Swadeep Sharma", "Computer Science", 3.85f, true};
    StudentRecord s2 = {102, "Tuhina Roy",     "Data Engineering", 3.95f, true};
    StudentRecord s3 = {103, "Abhronila Das",  "Machine Learning", 3.90f, true};
    StudentRecord s4 = {104, "Debangshu Pal",  "Information Tech", 3.65f, true};

    insertRecord(s1);
    insertRecord(s2);
    insertRecord(s3);
    insertRecord(s4);

    /* 2. DISPLAY ALL (Read) */
    printf("\n>>> Step 2: Displaying All Active Records:\n");
    displayAllRecords();

    /* 3. SEARCH BY ID (Read with fseek) */
    printf("\n>>> Step 3: Searching for Student ID 102 (Tuhina Roy)...\n");
    StudentRecord found;
    if (searchRecordById(102, &found)) {
        printf("    [FOUND] ID: %d | Name: %-16s | Course: %-18s | GPA: %.2f\n",
               found.id, found.name, found.course, found.gpa);
    } else {
        printf("    [NOT FOUND] Student with ID 102 does not exist.\n");
    }

    /* 4. UPDATE GPA IN-PLACE (Update) */
    printf("\n>>> Step 4: Updating Student ID 104 (Debangshu Pal) GPA to 3.80...\n");
    if (updateRecordGpa(104, 3.80f)) {
        printf("    Record updated successfully.\n");
    }

    /* 5. SOFT DELETE / TOMBSTONE (Delete) */
    printf("\n>>> Step 5: Soft-deleting Student ID 101 (Swadeep Sharma)...\n");
    if (softDeleteRecord(101)) {
        printf("    Record 101 marked as inactive (tombstone set).\n");
    }

    /* 6. DISPLAY ACTIVE AFTER SOFT DELETE */
    printf("\n>>> Step 6: Active Records after Soft Delete:\n");
    displayAllRecords();

    /* 7. PURGE COMPACTION (Garbage Collection) */
    printf("\n>>> Step 7: Running Database Purge / Compaction...\n");
    purgeDatabase();

    printf("\n>>> Final State after Compaction:\n");
    displayAllRecords();

    printf("\n=== Database Engine Demonstration Completed Successfully ===\n");
    return EXIT_SUCCESS;
}

/* Clear existing file and create blank database */
void initializeDatabase(void) {
    FILE *fp = fopen(DB_FILE, "wb");
    if (fp != NULL) {
        fclose(fp);
    }
}

/* Insert record at end of binary stream */
bool insertRecord(StudentRecord rec) {
    FILE *fp = fopen(DB_FILE, "ab");
    if (fp == NULL) {
        perror("Failed to open database for insert");
        return false;
    }
    size_t written = fwrite(&rec, sizeof(StudentRecord), 1, fp);
    fclose(fp);
    return (written == 1);
}

/* Search record sequentially or by random seek */
bool searchRecordById(int targetId, StudentRecord *result) {
    FILE *fp = fopen(DB_FILE, "rb");
    if (fp == NULL) return false;

    StudentRecord temp;
    while (fread(&temp, sizeof(StudentRecord), 1, fp) == 1) {
        if (temp.id == targetId && temp.isActive) {
            *result = temp;
            fclose(fp);
            return true;
        }
    }
    fclose(fp);
    return false;
}

/* In-place update of GPA */
bool updateRecordGpa(int targetId, float newGpa) {
    FILE *fp = fopen(DB_FILE, "rb+");
    if (fp == NULL) return false;

    StudentRecord temp;
    long recordIndex = 0;

    while (fread(&temp, sizeof(StudentRecord), 1, fp) == 1) {
        if (temp.id == targetId && temp.isActive) {
            temp.gpa = newGpa;
            /* Seek back to overwrite this specific record */
            fseek(fp, (long)(recordIndex * sizeof(StudentRecord)), SEEK_SET);
            fwrite(&temp, sizeof(StudentRecord), 1, fp);
            fclose(fp);
            return true;
        }
        recordIndex++;
    }
    fclose(fp);
    return false;
}

/* Soft delete: mark tombstone flag without rewriting file */
bool softDeleteRecord(int targetId) {
    FILE *fp = fopen(DB_FILE, "rb+");
    if (fp == NULL) return false;

    StudentRecord temp;
    long recordIndex = 0;

    while (fread(&temp, sizeof(StudentRecord), 1, fp) == 1) {
        if (temp.id == targetId && temp.isActive) {
            temp.isActive = false; /* set tombstone */
            fseek(fp, (long)(recordIndex * sizeof(StudentRecord)), SEEK_SET);
            fwrite(&temp, sizeof(StudentRecord), 1, fp);
            fclose(fp);
            return true;
        }
        recordIndex++;
    }
    fclose(fp);
    return false;
}

/* Display all active records */
void displayAllRecords(void) {
    FILE *fp = fopen(DB_FILE, "rb");
    if (fp == NULL) {
        printf("    [Database is empty or could not be opened]\n");
        return;
    }

    StudentRecord temp;
    int count = 0;
    printf("    ----------------------------------------------------------------------\n");
    printf("    | ID   | Name               | Course             | GPA  | Status     |\n");
    printf("    ----------------------------------------------------------------------\n");

    while (fread(&temp, sizeof(StudentRecord), 1, fp) == 1) {
        if (temp.isActive) {
            printf("    | %-4d | %-18s | %-18s | %4.2f | ACTIVE     |\n",
                   temp.id, temp.name, temp.course, temp.gpa);
            count++;
        }
    }
    printf("    ----------------------------------------------------------------------\n");
    printf("    Total Active Records: %d\n", count);
    fclose(fp);
}

/* Database Compaction: removes tombstoned records to reclaim space */
void purgeDatabase(void) {
    const char *TEMP_FILE = "student_temp.dat";
    FILE *fpIn = fopen(DB_FILE, "rb");
    FILE *fpOut = fopen(TEMP_FILE, "wb");

    if (fpIn == NULL || fpOut == NULL) {
        if (fpIn) fclose(fpIn);
        if (fpOut) fclose(fpOut);
        return;
    }

    StudentRecord temp;
    int retained = 0, purged = 0;

    while (fread(&temp, sizeof(StudentRecord), 1, fpIn) == 1) {
        if (temp.isActive) {
            fwrite(&temp, sizeof(StudentRecord), 1, fpOut);
            retained++;
        } else {
            purged++;
        }
    }

    fclose(fpIn);
    fclose(fpOut);

    /* Atomic swap */
    remove(DB_FILE);
    rename(TEMP_FILE, DB_FILE);
    printf("    Compaction complete: %d records purged, %d records retained.\n", purged, retained);
}
