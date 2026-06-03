# filter_basic.py
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Keep even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(f"Evens: {evens}")

# Keep numbers greater than 5
greater_than_five = list(filter(lambda x: x > 5, numbers))
print(f">5: {greater_than_five}")

# Filter strings by length
words = ["cat", "elephant", "dog", "hippopotamus"]
long_words = list(filter(lambda w: len(w) > 4, words))
print(f"Long words: {long_words}")

# Filter None values
mixed = [1, None, 3, None, 5]
non_none = list(filter(lambda x: x is not None, mixed))
print(f"Non-None: {non_none}")