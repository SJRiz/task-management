from flask import request, jsonify
from config import app, db
from models import Task

# Get/Read method for seeing all the tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    try:
        tasks = Task.query.all()
        tasks_list = list(map(lambda x: x.to_dict(), tasks))
        return jsonify({"tasks": tasks_list})
    
    except Exception as err:
        return jsonify({"message": str(err)}), 400

# Post/Create method for making a new task
@app.route("/tasks", methods=["POST"])
def create_task():
    try:
        data = request.json
        task_desc = data.get("taskDesc")
        if not task_desc:
            return jsonify({"message": "Invalid task"}), 400
        new_task = Task(task_desc=task_desc)
        db.session.add(new_task)
        db.session.commit()

        return jsonify({
            "id": new_task.id,
            "taskDesc": new_task.task_desc
        }), 201

    except Exception as err:
        return jsonify({"message": str(err)}), 400

# Patch/Update method for changing a task
@app.route("/tasks/<int:id>", methods=["PATCH"])
def update_task(id):
    try:
        task = Task.query.get(id)

        if not task:
            return jsonify({"message": "Task not found"}), 404

        task.task_desc = request.json.get("taskDesc", task.task_desc)
        db.session.commit()

    except Exception as err:
        return jsonify({"message": str(err)}), 400

# Delete method for deleting a task
@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    try:
        task = Task.query.get(id)

        if not task:
            return jsonify({"message": "Task not found"}), 404

        db.session.delete(task)
        db.session.commit()
        return jsonify({})

    except Exception as err:
        return jsonify({"message": str(err)}), 400

# Run the app if app.py is directly acticated
if __name__ == "__main__":

    # Create the database
    with app.app_context():
        db.create_all()

    app.run(debug=True)