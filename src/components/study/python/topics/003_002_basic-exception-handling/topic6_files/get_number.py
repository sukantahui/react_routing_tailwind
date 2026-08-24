def get_number(prompt, default=None):
    while True:
        user_input = input(f"{prompt} [{default}]: ")

        if user_input == "" and default is not None:
            return default  # Use default if empty

        # ... validation logic ...
