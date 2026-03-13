def validate_age(age_str):
    try:
        age = int(age_str)

        if age < 0 or age > 120:
            return False, "Age must be 0-120"

        return True, age

    except ValueError:
        return False, "Please enter a valid number"
