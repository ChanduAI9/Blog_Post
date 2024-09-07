export default async function handler(req, res) {
    const { id } = req.query; // Get the post ID from the URL
    const apiUrl = `http://127.0.0.1:5000/posts/${id}`;  // URL for the Flask backend
  
    if (req.method === 'GET') {
      // Handle GET request: Fetch a single post by ID from the Flask backend
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (response.ok) {
          return res.status(200).json(data);
        } else {
          return res.status(response.status).json({ error: 'Failed to fetch post' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Failed to connect to backend' });
      }
    } else if (req.method === 'PUT') {
      // Handle PUT request: Update the post on the Flask backend
      try {
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req.body), // Pass the updated post data to the backend
        });
  
        if (response.ok) {
          return res.status(200).json({ message: 'Post updated successfully' });
        } else {
          return res.status(response.status).json({ error: 'Failed to update post' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Failed to connect to backend' });
      }
    } else {
      // If the method is not GET or PUT, return 405 Method Not Allowed
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  