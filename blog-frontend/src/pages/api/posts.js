export default async function handler(req, res) {
    const apiUrl = 'http://127.0.0.1:5000/posts';  // Use IPv4 loopback address
  
    if (req.method === 'GET') {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return res.status(200).json(data);
    } else if (req.method === 'POST') {
      const { title, content } = req.body;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      const data = await response.json();
      return res.status(201).json(data);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      return res.status(204).end();
    }
  }
  