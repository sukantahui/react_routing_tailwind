"""
CBSE Class XII Computer Science (Code 083)
Topic 11: Diagnostic Skill Challenge Lab
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

def challenge_character_audit(filename="challenge_text.txt"):
    """Audits vowels, consonants, digits, and whitespace in challenge_text.txt"""
    vowels = consonants = digits = spaces = specials = 0
    with open(filename, "r", encoding="utf-8") as f:
        for ch in f.read():
            if ch.isalpha():
                if ch.lower() in "aeiou":
                    vowels += 1
                else:
                    consonants += 1
            elif ch.isdigit():
                digits += 1
            elif ch.isspace():
                spaces += 1
            else:
                specials += 1
    return {
        "vowels": vowels,
        "consonants": consonants,
        "digits": digits,
        "spaces": spaces,
        "specials": specials
    }

if __name__ == "__main__":
    with open("challenge_text.txt", "w", encoding="utf-8") as f:
        f.write("CBSE 083 Class 12: Mamata & Susmita scored 98% in File Handling!\n")
    results = challenge_character_audit("challenge_text.txt")
    print("Challenge Results:", results)
