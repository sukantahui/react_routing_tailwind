"""
CBSE Class 12 CS - Topic 3 Simulation: Dual-Connection FTP Engine
Demonstrates Port 21 Control Connection commands and Port 20 Data Connection file transfer.
"""

class FTPServer:
    def __init__(self):
        self.control_port = 21
        self.data_port = 20
        self.files = {"syllabus_cs12.pdf": 450000, "sample_paper.py": 12400}
        self.logged_in = False

    def handle_control(self, cmd, arg=""):
        if cmd == "USER":
            return "331 Username okay, need password."
        elif cmd == "PASS":
            self.logged_in = True
            return "230 User logged in successfully."
        elif cmd == "PWD":
            return "257 \"/cbse/computer_science\" is current directory."
        elif cmd == "RETR":
            if arg in self.files:
                return f"150 Opening BINARY mode data connection for {arg} ({self.files[arg]} bytes)."
            return "550 File not found."
        elif cmd == "QUIT":
            self.logged_in = False
            return "221 Goodbye."
        return "500 Syntax error."

    def transfer_data(self, filename):
        print(f"  [DATA CONNECTION - PORT {self.data_port}] Streaming {filename} ({self.files[filename]} bytes)...")
        print(f"  [DATA CONNECTION - PORT {self.data_port}] Transfer Complete. Closing Data Channel.")

if __name__ == "__main__":
    ftp = FTPServer()
    print("=== SIMULATING DUAL-PORT FTP SESSION ===")
    print("[CONTROL PORT 21] Client: USER student_cbse")
    print("[CONTROL PORT 21] Server:", ftp.handle_control("USER", "student_cbse"))
    print("[CONTROL PORT 21] Client: PASS Board2026")
    print("[CONTROL PORT 21] Server:", ftp.handle_control("PASS", "Board2026"))
    print("[CONTROL PORT 21] Client: PWD")
    print("[CONTROL PORT 21] Server:", ftp.handle_control("PWD"))

    target = "syllabus_cs12.pdf"
    print(f"[CONTROL PORT 21] Client: RETR {target}")
    print("[CONTROL PORT 21] Server:", ftp.handle_control("RETR", target))
    ftp.transfer_data(target)
    print("[CONTROL PORT 21] Server: 226 Transfer complete.")
    print("[CONTROL PORT 21] Client: QUIT")
    print("[CONTROL PORT 21] Server:", ftp.handle_control("QUIT"))
