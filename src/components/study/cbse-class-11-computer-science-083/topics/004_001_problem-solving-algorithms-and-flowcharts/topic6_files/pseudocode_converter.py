"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Problem Solving
Topic: Pseudocode - Language-Independent Algorithmic Representation

This script demonstrates standard pseudocode conventions and their direct
equivalents in Python 3.
"""

def pseudocode_linear_search(target: int, arr: list) -> dict:
    """
    Problem: Search for an element 'target' in a list 'arr'
    
    Standard Pseudocode:
    -------------------------------------------
    ALGORITHM LinearSearch(A, Target)
    INPUT: Array A of size N, Target value
    OUTPUT: Index of Target if found, else -1
    
    BEGIN
        SET index = -1
        FOR i FROM 0 TO LENGTH(A) - 1 DO
            IF A[i] == Target THEN
                SET index = i
                BREAK
            ENDIF
        ENDFOR
        RETURN index
    END
    -------------------------------------------
    """
    trace = []
    found_idx = -1
    for i in range(len(arr)):
        trace.append(f"Check: arr[{i}] == {target} -> {arr[i] == target}")
        if arr[i] == target:
            found_idx = i
            break
            
    return {
        "algorithm": "Linear Search",
        "target": target,
        "arr": arr,
        "found_index": found_idx,
        "trace": trace
    }


def pseudocode_prime_check(n: int) -> dict:
    """
    Problem: Check if an integer N is Prime
    
    Standard Pseudocode:
    -------------------------------------------
    ALGORITHM IsPrime(N)
    INPUT: Positive Integer N
    OUTPUT: Boolean (TRUE if Prime, FALSE otherwise)
    
    BEGIN
        IF N <= 1 THEN
            RETURN FALSE
        ENDIF
        
        SET is_prime = TRUE
        SET divisor = 2
        
        WHILE (divisor * divisor <= N) DO
            IF (N MOD divisor == 0) THEN
                SET is_prime = FALSE
                BREAK
            ENDIF
            SET divisor = divisor + 1
        ENDWHILE
        
        RETURN is_prime
    END
    -------------------------------------------
    """
    if n <= 1:
        return {"n": n, "is_prime": False, "reason": "N <= 1 is not prime."}
        
    is_prime = True
    divisor = 2
    steps = []
    
    while divisor * divisor <= n:
        rem = n % divisor
        steps.append(f"Test divisor {divisor}: {n} % {divisor} = {rem}")
        if rem == 0:
            is_prime = False
            break
        divisor += 1
        
    return {
        "algorithm": "Prime Checker",
        "n": n,
        "is_prime": is_prime,
        "steps": steps
    }


if __name__ == "__main__":
    print("=== PSEUDOCODE: LINEAR SEARCH DEMO ===")
    sample_list = [14, 28, 35, 42, 59, 70]
    res_search = pseudocode_linear_search(42, sample_list)
    print(f"Target 42 found at index: {res_search['found_index']}")
    for t in res_search["trace"]:
        print(" ", t)
        
    print("\n=== PSEUDOCODE: PRIME CHECK DEMO ===")
    res_prime = pseudocode_prime_check(29)
    print(f"Is 29 Prime?: {res_prime['is_prime']}")
    for s in res_prime["steps"]:
        print(" ", s)
