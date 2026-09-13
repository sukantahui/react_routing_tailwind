#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define DB_STORAGE_FILE "grand_student_db.dat"
#define MAX_NAME_LEN 50
#define MAX_DEPT_LEN 30

/* =====================================================================
 * GRAND FINALE CAPSTONE: Dynamic Linked Engine with File Persistence
 * ===================================================================== */

/* Student Record Schema */
typedef struct StudentRecord {
    int id;
    char name[MAX_NAME_LEN];
    char department[MAX_DEPT_LEN];
    float gpa;
    bool isActive;
} StudentRecord;

/* Doubly Linked List In-Memory Cache Node */
typedef struct StudentNode {
    StudentRecord data;
    struct StudentNode *prev;
    struct StudentNode *next;
} StudentNode;

/* Database Engine State */
typedef struct {
    StudentNode *head;
    StudentNode *tail;
    size_t count;
} StudentDatabase;

/* Function Prototypes */
StudentDatabase *createDatabase(void);
bool insertStudent(StudentDatabase *db, StudentRecord rec);
StudentNode *findStudentById(const StudentDatabase *db, int id);
bool updateStudentGpa(StudentDatabase *db, int id, float newGpa);
bool deleteStudent(StudentDatabase *db, int id);
void displayDatabase(const StudentDatabase *db);
bool persistDatabaseToFile(const StudentDatabase *db, const char *filename);
bool loadDatabaseFromFile(StudentDatabase *db, const char *filename);
void freeDatabase(StudentDatabase *db);

int main(void) {
    printf("=====================================================\n");
    printf("  GRAND CAPSTONE: Dynamic Linked Engine & File Persistence\n");
    printf("=====================================================\n\n");

    StudentDatabase *db = createDatabase();

    /* 1. INSERT INITIAL RECORDS (Create in RAM Cache) */
    printf(">>> Step 1: Enqueuing Student Records into RAM Cache...\n");
    StudentRecord s1 = {101, "Swadeep Sharma", "Computer Science", 3.85f, true};
    StudentRecord s2 = {102, "Tuhina Roy",     "Data Engineering", 3.95f, true};
    StudentRecord s3 = {103, "Abhronila Das",  "AI & Robotics",    3.90f, true};
    StudentRecord s4 = {104, "Debangshu Pal",  "Information Tech", 3.65f, true};

    insertStudent(db, s1);
    insertStudent(db, s2);
    insertStudent(db, s3);
    insertStudent(db, s4);

    displayDatabase(db);

    /* 2. UPDATE GPA IN RAM */
    printf("\n>>> Step 2: In-Memory Mutation (Updating Student 104 GPA)...\n");
    if (updateStudentGpa(db, 104, 3.80f)) {
        printf("    Record 104 GPA updated to 3.80.\n");
    }

    /* 3. DELETE RECORD IN RAM */
    printf("\n>>> Step 3: Deleting Student 101 from RAM Cache...\n");
    if (deleteStudent(db, 101)) {
        printf("    Record 101 removed from active node chain.\n");
    }
    displayDatabase(db);

    /* 4. PERSIST IN-MEMORY CACHE TO DISK */
    printf("\n>>> Step 4: Persisting Active Cache to Disk File '%s'...\n", DB_STORAGE_FILE);
    if (persistDatabaseToFile(db, DB_STORAGE_FILE)) {
        printf("    All records successfully serialized to binary storage.\n");
    }

    /* 5. DESTROY IN-MEMORY CACHE */
    printf("\n>>> Step 5: Destroying RAM Cache with freeDatabase()...\n");
    freeDatabase(db);
    db = createDatabase();
    printf("    RAM Cache is now empty.\n");
    displayDatabase(db);

    /* 6. REHYDRATE FROM DISK STORAGE */
    printf("\n>>> Step 6: Rehydrating RAM Cache from Disk File '%s'...\n", DB_STORAGE_FILE);
    if (loadDatabaseFromFile(db, DB_STORAGE_FILE)) {
        printf("    Successfully deserialized %zu records from disk into RAM nodes!\n", db->count);
    }
    displayDatabase(db);

    /* Clean up */
    freeDatabase(db);
    remove(DB_STORAGE_FILE);

    printf("\n=== Grand Finale Capstone Demonstration Completed ===\n");
    return EXIT_SUCCESS;
}

StudentDatabase *createDatabase(void) {
    StudentDatabase *db = (StudentDatabase *)malloc(sizeof(StudentDatabase));
    db->head = NULL;
    db->tail = NULL;
    db->count = 0;
    return db;
}

bool insertStudent(StudentDatabase *db, StudentRecord rec) {
    StudentNode *node = (StudentNode *)malloc(sizeof(StudentNode));
    node->data = rec;
    node->prev = db->tail;
    node->next = NULL;

    if (db->tail != NULL) {
        db->tail->next = node;
    } else {
        db->head = node;
    }
    db->tail = node;
    db->count++;
    return true;
}

StudentNode *findStudentById(const StudentDatabase *db, int id) {
    StudentNode *curr = db->head;
    while (curr != NULL) {
        if (curr->data.id == id && curr->data.isActive) {
            return curr;
        }
        curr = curr->next;
    }
    return NULL;
}

bool updateStudentGpa(StudentDatabase *db, int id, float newGpa) {
    StudentNode *node = findStudentById(db, id);
    if (node == NULL) return false;
    node->data.gpa = newGpa;
    return true;
}

bool deleteStudent(StudentDatabase *db, int id) {
    StudentNode *node = findStudentById(db, id);
    if (node == NULL) return false;

    if (node->prev != NULL) {
        node->prev->next = node->next;
    } else {
        db->head = node->next;
    }

    if (node->next != NULL) {
        node->next->prev = node->prev;
    } else {
        db->tail = node->prev;
    }

    free(node);
    db->count--;
    return true;
}

void displayDatabase(const StudentDatabase *db) {
    if (db->head == NULL) {
        printf("    [Database is empty: 0 Records in RAM]\n");
        return;
    }
    printf("    ----------------------------------------------------------------------\n");
    printf("    | ID   | Name               | Department         | GPA  | Status     |\n");
    printf("    ----------------------------------------------------------------------\n");
    const StudentNode *curr = db->head;
    while (curr != NULL) {
        printf("    | %-4d | %-18s | %-18s | %4.2f | ACTIVE     |\n",
               curr->data.id, curr->data.name, curr->data.department, curr->data.gpa);
        curr = curr->next;
    }
    printf("    ----------------------------------------------------------------------\n");
    printf("    Total In-Memory Records: %zu\n", db->count);
}

bool persistDatabaseToFile(const StudentDatabase *db, const char *filename) {
    FILE *fp = fopen(filename, "wb");
    if (fp == NULL) return false;

    const StudentNode *curr = db->head;
    while (curr != NULL) {
        if (fwrite(&(curr->data), sizeof(StudentRecord), 1, fp) != 1) {
            fclose(fp);
            return false;
        }
        curr = curr->next;
    }
    fclose(fp);
    return true;
}

bool loadDatabaseFromFile(StudentDatabase *db, const char *filename) {
    FILE *fp = fopen(filename, "rb");
    if (fp == NULL) return false;

    StudentRecord buffer;
    while (fread(&buffer, sizeof(StudentRecord), 1, fp) == 1) {
        insertStudent(db, buffer);
    }
    fclose(fp);
    return true;
}

void freeDatabase(StudentDatabase *db) {
    StudentNode *curr = db->head;
    while (curr != NULL) {
        StudentNode *next = curr->next;
        free(curr);
        curr = next;
    }
    free(db);
}
