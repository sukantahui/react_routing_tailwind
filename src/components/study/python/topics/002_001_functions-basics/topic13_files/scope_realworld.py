config = {"debug": False}
def set_debug():
    global config
    config["debug"] = True
set_debug()
print(config)