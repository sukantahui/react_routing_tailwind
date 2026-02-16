// inline_header.h – Header with static inline function
#ifndef INLINE_HEADER_H
#define INLINE_HEADER_H

// static inline – each translation unit gets its own copy (safe for headers)
static inline int add(int a, int b) {
    return a + b;
}

#endif