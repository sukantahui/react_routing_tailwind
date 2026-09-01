// bad_header.h – Defines a function (BAD)
#ifndef BAD_HEADER_H
#define BAD_HEADER_H

// Function definition in header – causes multiple definition errors
int add(int a, int b) {
    return a + b;
}

#endif