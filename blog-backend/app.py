from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize the Flask app and database
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)

#  database
with app.app_context():
    db.create_all()

# GET /posts - Retrieve all blog posts
@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([{'id': post.id, 'title': post.title, 'content': post.content} for post in posts])

# POST /posts - Create a new blog post
@app.route('/posts', methods=['POST'])
def create_post():
    try:
        data = request.get_json()
        new_post = Post(title=data['title'], content=data['content'])
        db.session.add(new_post)
        db.session.commit()
        return jsonify({'id': new_post.id, 'title': new_post.title, 'content': new_post.content}), 201
    except Exception as e:
        app.logger.error(f"Error creating post: {str(e)}")
        return jsonify({'error': 'An error occurred creating the post'}), 500
# PUT /posts/<id> - Update a blog post
@app.route('/posts/<int:id>', methods=['PUT'])
def update_post(id):
    try:
        post = Post.query.get_or_404(id)
        data = request.get_json()

        post.title = data['title']
        post.content = data['content']
        db.session.commit()

        return jsonify({'message': 'Post updated successfully'}), 200
    except Exception as e:
        app.logger.error(f"Error updating post with id {id}: {str(e)}")
        return jsonify({'error': 'An error occurred updating the post'}), 500

# DELETE /posts/<id> - Delete a blog post
@app.route('/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    try:
        # Retrieve the post by id
        post = Post.query.get(id)
        if post is None:
            app.logger.error(f"Post with id {id} not found")
            return jsonify({'error': 'Post not found'}), 404
        
        # Delete the post
        db.session.delete(post)
        db.session.commit()
        return '', 204
    except Exception as e:
        app.logger.error(f"Error deleting post with id {id}: {str(e)}")
        return jsonify({'error': 'An error occurred deleting the post'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
