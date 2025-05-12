from config import db
from uuid import uuid4

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)

# Task model that will be stored in the database
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_desc = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "taskDesc": self.task_desc
        }