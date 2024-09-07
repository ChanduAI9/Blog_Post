"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required.');
      return;
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        setMessage('Blog post created successfully!');
        setTitle('');
        setContent('');
        setError('');
      } else {
        setMessage('Failed to create blog post.');
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto py-10 px-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Create a New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Post Content"
            className="border p-2 w-full rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <Button variant="primary" className="w-full bg-blue-500 text-white hover:bg-blue-700">
            Submit
          </Button>
        </form>

        {/* Display validation errors */}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        {/* Display success or failure messages */}
        {message && <p className={`text-center mt-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
      </div>
    </>
  );
}
