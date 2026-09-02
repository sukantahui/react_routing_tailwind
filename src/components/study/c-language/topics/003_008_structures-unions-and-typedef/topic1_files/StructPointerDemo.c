#include <stdio.h>

struct Employee {
    int id;
    double salary;
};

void giveRaise(struct Employee *empPtr, double percentage) {
    empPtr->salary += empPtr->salary * (percentage / 100.0);
}

int main(void) {
    printf("====================================================\n");
    printf("  CODER & ACCOTAX - STRUCT POINTERS & ARROW OPERATOR\n");
    printf("  Center: Barrackpore | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    struct Employee emp = {501, 65000.00};
    printf("[Before Salary Hike] Employee ID: %d | Salary: INR %.2f\n", emp.id, emp.salary);
    giveRaise(&emp, 15.0);
    printf("[After 15%% Hike]    Employee ID: %d | Salary: INR %.2f\n\n", emp.id, emp.salary);
    printf("Efficient Pointer Pass: Only %lu-byte pointer transferred on call stack!\n", sizeof(&emp));
    return 0;
}