"""
CBSE Class 12 CS - Topic 4 Simulation: SMTP Dialogue & POP3/IMAP Mailbox Engine
Simulates the command-level SMTP push and IMAP synchronization dialogue.
"""

class EmailServer:
    def __init__(self):
        self.mailboxes = {"student@cbse.nic.in": []}

    def smtp_receive_mail(self, sender, recipient, subject, body):
        print(f"\n[SMTP DIALOGUE OVER PORT 25]")
        print(f"  C: HELO mail.school.edu")
        print(f"  S: 250 Hello mail.school.edu, pleased to meet you")
        print(f"  C: MAIL FROM:<{sender}>")
        print(f"  S: 250 Sender <{sender}> OK")
        print(f"  C: RCPT TO:<{recipient}>")
        print(f"  S: 250 Recipient <{recipient}> OK")
        print(f"  C: DATA")
        print(f"  S: 354 Start mail input; end with <CRLF>.<CRLF>")
        print(f"  C: Subject: {subject}\n  C: {body}\n  C: .")
        print(f"  S: 250 Message accepted for delivery")

        if recipient in self.mailboxes:
            self.mailboxes[recipient].append({"from": sender, "subject": subject, "body": body})
            print(f"Result: Delivered to {recipient} mailbox on disk.")

    def imap_sync(self, user):
        print(f"\n[IMAP SYNCHRONIZATION OVER PORT 143/993]")
        print(f"  C: a1 LOGIN {user} ********")
        print(f"  S: a1 OK User logged in")
        print(f"  C: a2 SELECT INBOX")
        msgs = self.mailboxes.get(user, [])
        print(f"  S: * {len(msgs)} EXISTS")
        print(f"  S: a2 OK [READ-WRITE] SELECT completed")
        for idx, m in enumerate(msgs, 1):
            print(f"  Header Preview: Msg #{idx} From: {m['from']} | Subject: '{m['subject']}'")
            print(f"  Status: Synced across phone, laptop, and desktop in real-time.")

if __name__ == "__main__":
    server = EmailServer()
    server.smtp_receive_mail(
        sender="teacher_sukanta@barrackpore.org",
        recipient="student@cbse.nic.in",
        subject="CBSE Class 12 CS Board Exam Preparation Guide",
        body="Dear Student, Complete all 25 questions in Topic 4 to master email protocols!"
    )
    server.imap_sync("student@cbse.nic.in")
