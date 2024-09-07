"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation in App Router
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

export default function HomePage() {
  const [posts, setPosts] = useState([]);  // Initialize posts as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);  // Modal state
  const [postToDelete, setPostToDelete] = useState(null); // Post to delete
  const router = useRouter(); // For navigation (App Router)

  // Fetch blog posts from the backend
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();

        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setError("Failed to fetch posts. The response is not an array.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Delete blog post
  const deletePost = async (id) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted post from the UI
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        console.error("Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
    setShowModal(false);  // Close modal
  };

  const openModal = (id) => {
    setPostToDelete(id);  // Set the post to delete
    setShowModal(true);  // Open modal
  };

  const closeModal = () => {
    setShowModal(false);  // Close modal
    setPostToDelete(null);  // Clear post to delete
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500">No blogs found. Create one!</p>
        {/* Add Create Post Button */}
        <Button 
          variant="primary" 
          className="mt-4 bg-blue-500 text-white hover:bg-blue-700" 
          onClick={() => router.push('/create')}>
          Create Post
        </Button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Blog Posts</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex justify-between">
                <Button variant="primary" className="bg-blue-500 text-white hover:bg-blue-700 mr-2" onClick={() => router.push(`/edit/${post.id}`)}>
                  Edit
                </Button>
                <Button variant="secondary" className="bg-red-500 text-white hover:bg-red-700" onClick={() => openModal(post.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p>Do you really want to delete this post? This action cannot be undone.</p>
            <div className="flex justify-end mt-4 space-x-2">
              <Button className="bg-gray-500 text-white hover:bg-gray-700" onClick={closeModal}>
                Cancel
              </Button>
              <Button className="bg-red-500 text-white hover:bg-red-700" onClick={() => deletePost(postToDelete)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
