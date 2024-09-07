import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="flex justify-between">
        <Link href="/" className="text-lg font-bold">My Blog</Link>
        <Link href="/create" className="text-lg">Create Post</Link>
      </nav>
    </header>
  );
}
