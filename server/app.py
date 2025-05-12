from flask import request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from config import app, db, jwt
from models import Task, User

bcrypt = Bcrypt(app)

@app.route("/register", methods=["POST"])
def register_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"message": "User already exists"})
    
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    user = User.query.filter_by(email=email).first()

    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Unauthorized"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({
    "access_token": access_token,
    "email": email
})

@app.route("/verify", methods=["GET"])
@jwt_required()
def verify_token():
    current_user = get_jwt_identity()
    return jsonify({"user": current_user}), 200

@app.route("/tasks", methods=["GET"])
@jwt_required()
def get_tasks():
    try:
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()
        tasks = Task.query.filter_by(user_id=user.id).all()
        tasks_list = [x.to_dict() for x in tasks]
        return jsonify({"tasks": tasks_list})
    except Exception as err:
        
        return jsonify({"message": str(err)}), 400

@app.route("/tasks", methods=["POST"])
@jwt_required()
def create_task():
    try:
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()

        data = request.json
        task_desc = data.get("taskDesc")
        if not task_desc:
            return jsonify({"message": "Invalid task"}), 400
        
        new_task = Task(task_desc=task_desc, user_id=user.id)
        db.session.add(new_task)
        db.session.commit()

        return jsonify({
            "id": new_task.id,
            "taskDesc": new_task.task_desc
        }), 201
    
    except Exception as err:
        return jsonify({"message": str(err)}), 400

@app.route("/tasks/<int:id>", methods=["PATCH"])
@jwt_required()
def update_task(id):
    try:
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()

        task = Task.query.get(id)
        if not task or task.user_id != user.id:
            return jsonify({"message": "Task not found"}), 404
        
        task.task_desc = request.json.get("taskDesc", task.task_desc)
        db.session.commit()
        return jsonify({})
    
    except Exception as err:
        return jsonify({"message": str(err)}), 400

@app.route("/tasks/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_task(id):
    try:
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()

        task = Task.query.get(id)
        if not task or task.user_id != user.id:
            return jsonify({"message": "Task not found"}), 404
        
        db.session.delete(task)
        db.session.commit()
        return jsonify({})
    
    except Exception as err:
        return jsonify({"message": str(err)}), 400

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)