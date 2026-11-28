# =====================================================================
# CBSE Class 12 Computer Science (083) - Revision Lab
# Topic 10: Section A Board Exam Output Tracing Problems & Dry-Run Tables
# =====================================================================

# Problem 1: String Mutation with ord() and chr()
print("--- Problem 1: Character Shift Transformation ---")
def transform_string(s):
    result = ""
    for ch in s:
        if ch.isupper():
            result += chr(ord(ch) + 1)
        elif ch.islower():
            result += ch.upper()
        else:
            result += "#"
    return result

p1_input = "Py@24"
p1_output = transform_string(p1_input)
print(f"Input: '{p1_input}' -> Output: '{p1_output}'")
# Dry-run:
# 'P' -> isupper() -> chr(ord('P')+1) = chr(80+1) = 'Q'
# 'y' -> islower() -> 'Y'
# '@' -> neither -> '#'
# '2' -> neither -> '#'
# '4' -> neither -> '#'
# Result: "QY###"

# Problem 2: List Mutation in Loop with Modulo Logic
print("\n--- Problem 2: List Mutation Trace ---")
def process_list(L):
    for i in range(len(L)):
        if L[i] % 5 == 0:
            L[i] //= 5
        elif L[i] % 3 == 0:
            L[i] //= 3
        else:
            L[i] *= 2

num_list = [10, 9, 7, 25, 6]
process_list(num_list)
print(f"Processed List: {num_list}")
# Dry-run:
# 10 % 5 == 0 -> 10 // 5 = 2
# 9 % 3 == 0  -> 9 // 3 = 3
# 7 -> 7 * 2 = 14
# 25 % 5 == 0 -> 25 // 5 = 5
# 6 % 3 == 0  -> 6 // 3 = 2
# Result: [2, 3, 14, 5, 2]

# Problem 3: Nested Loop Output Tracing
print("\n--- Problem 3: Nested Loop Tracing ---")
out_stream = []
for i in range(1, 4):
    for j in range(i, 0, -1):
        out_stream.append(str(i * j))
print("Stream:", " # ".join(out_stream))
# Dry-run:
# i=1: j=1 -> 1*1 = 1
# i=2: j=2 -> 2*2=4; j=1 -> 2*1=2
# i=3: j=3 -> 3*3=9; j=2 -> 3*2=6; j=1 -> 3*1=3
# Result: 1 # 4 # 2 # 9 # 6 # 3
