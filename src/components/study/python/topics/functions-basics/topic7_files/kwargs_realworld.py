# kwargs_realworld.py
# Real-world applications of **kwargs

# 1. Configuration function with defaults
def configure_app(**settings):
    """Apply configuration settings with sensible defaults."""
    config = {
        "debug": False,
        "port": 8080,
        "host": "localhost",
        "log_level": "INFO"
    }
    config.update(settings)
    print("App configuration:")
    for k, v in config.items():
        print(f"  {k}: {v}")
    return config

configure_app(debug=True, port=3000)
configure_app(log_level="DEBUG", host="0.0.0.0")

# 2. HTML tag builder (like Flask's tag builder)
def html_tag(tag_name, **attributes):
    """Build an HTML tag with arbitrary attributes."""
    attrs = ' '.join(f'{k}="{v}"' for k, v in attributes.items())
    if attrs:
        return f"<{tag_name} {attrs}></{tag_name}>"
    return f"<{tag_name}></{tag_name}>"

print(html_tag("div", class_="container", id="main"))      # class_ because 'class' is keyword
print(html_tag("input", type="text", placeholder="Name"))
print(html_tag("img", src="photo.jpg", alt="Profile"))

# 3. Wrapper/decorator that forwards arguments
def logger(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@logger
def add(a, b):
    return a + b

@logger
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

add(3, 5)
greet("Swadeep", greeting="Namaste")

# 4. Class constructor forwarding to parent
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

class InternationalStudent(Student):
    def __init__(self, country, **kwargs):
        self.country = country
        super().__init__(**kwargs)  # forwards name and age

s = InternationalStudent(country="India", name="Tuhina", age=16)
print(f"{s.name}, {s.age}, {s.country}")