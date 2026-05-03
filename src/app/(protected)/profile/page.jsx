'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace('/login?redirect=/profile');
    }
  }, [isPending, user, router]);

  if (isPending) {
    return <p className="text-center text-slate-600">Loading profile...</p>;
  }

  if (!user) return null;

  return (
    <section className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow md:p-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">My Profile</h1>
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || 'Profile picture'}
            width={112}
            height={112}
            unoptimized
            className="h-28 w-28 rounded-full object-cover ring-4 ring-orange-100"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-300 text-3xl font-bold text-slate-900">
            {(user.name || 'U').charAt(0).toUpperCase()}
          </div>
        )}

        <div className="space-y-2 text-slate-700">
          <p><span className="font-semibold">Name:</span> {user.name || 'N/A'}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <Link
            href="/profile/update"
            className="mt-3 inline-block rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Update Information
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;