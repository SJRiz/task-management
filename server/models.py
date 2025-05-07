from config import db

# Task model that will be stored in the database
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_desc = db.Column(db.String(200), nullable=False)

    # Method that will return the model data into a dict, easier for json
    def to_dict(self):
        return {
            "id": self.id,
            "taskDesc": self.task_desc
        }