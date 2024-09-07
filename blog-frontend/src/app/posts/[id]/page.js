import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';

export default function ViewPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((response) => response.json())
        .then((data) => setPost(data));
    }
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="p-6">
        <Card>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p>{post.content}</p>
        </Card>
      </div>
    </>
  );
}
