#include <stdio.h>

void showLocal() {
    int student_id = 42;        // stored on stack
    char grade = 'A';
    printf("Student %d got grade %c\n", student_id, grade);
}   // stack memory automatically released

int main() {
    showLocal();
    // student_id and grade no longer exist here
    return 0;
}