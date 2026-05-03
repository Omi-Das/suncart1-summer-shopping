'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const user = session?.user;

  const handleLogout = async () => {
    const result = await signOut();
    if (result?.error) {
      toast.error(result.error.message || 'Logout failed');
      return;
    }
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-semibold text-slate-900">
            SunCart
          </Link>
          <nav className="hidden items-center gap-4 text-sm font-medium text-slate-700 md:flex">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/profile">My Profile</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isPending ? (
            <span className="text-sm text-slate-500">Checking session...</span>
          ) : user ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-800">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'User'}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-xs font-semibold text-slate-950">
                    {(user.name || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="max-w-24 truncate">{user.name || 'User'}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;