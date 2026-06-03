#include <stdio.h>

#define MAX_STUDENTS 50
#define PI 3.14159

int main() {
    int marks[MAX_STUDENTS];  // Works because MAX_STUDENTS is a preprocessor constant
    printf("Maximum students: %d\n", MAX_STUDENTS);
    printf("Value of PI: %f\n", PI);
    
#if MAX_STUDENTS > 30
    printf("Large class size\n");
#endif
    return 0;
}