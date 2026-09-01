// no_guard.h – A header file without include guards
// Including this twice in the same translation unit will cause errors.

typedef struct {
    int id;
    char name[50];
} Student;

void printStudent(Student s);
int calculateGrade(Student s);