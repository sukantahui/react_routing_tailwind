# kwargs_with_args.py
# Combining normal parameters, *args, and **kwargs

def register_user(username, *roles, **details):
    """
    username: required
    *roles: variable positional (optional)
    **details: variable keyword (optional)
    """
    print(f"User: {username}")
    if roles:
        print(f"Roles: {', '.join(roles)}")
    if details:
        print("Additional details:")
        for k, v in details.items():
            print(f"  {k} = {v}")

# Calls
register_user("swadeep_123")
register_user("tuhina_456", "admin", "editor")
register_user("abhronila_789", "viewer", age=15, city="Ichapur")
register_user("debangshu_101", "moderator", "mentor", email="deb@example.com", active=True)

# Order in definition: normal, *args, **kwargs
# def wrong(a=1, **kwargs, *args):  # SyntaxError
#     pass