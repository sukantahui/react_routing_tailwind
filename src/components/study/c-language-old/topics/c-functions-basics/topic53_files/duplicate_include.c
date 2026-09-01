// duplicate_include.c – Demonstrates multiple inclusion problem
#include <stdio.h>
#include "no_guard.h"   // first inclusion
#include "no_guard.h"   // second inclusion – causes error because no guards

int main() {
    Student s = {1, "Swadeep"};
    printStudent(s);
    return 0;
}