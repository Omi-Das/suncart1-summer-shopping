'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient, useSession } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const UpdateProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.replace('/login?redirect=/profile/update');
    }
  }, [isPending, user, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const result = await authClient.updateUser({
        name: name ?? user.name ?? '',
        image: image ?? user.image ?? '',
      });

      if (result?.error) {
        toast.error(result.error.message || 'Update failed');
        return;
      }

      toast.success('Profile updated successfully');
      router.push('/profile');
      router.refresh();
    } catch {
      toast.error('Something went wrong while updating your profile');
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return <p className="text-center text-slate-600">Loading update form...</p>;
  }

  if (!user) return null;

  return (
    <section className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow md:p-8">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Update Profile</h1>
      <p className="mb-6 text-sm text-slate-600">
        Edit your display name and profile photo URL.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-slate-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name ?? user.name ?? ''}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-orange-300 focus:ring"
          />
        </div>

        <div>
          <label htmlFor="image" className="mb-1 block text-sm font-semibold text-slate-700">
            Image URL
          </label>
          <input
            id="image"
            type="url"
            value={image ?? user.image ?? ''}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-orange-300 focus:ring"
          />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Updating...' : 'Update Information'}
          </button>
          <Link
            href="/profile"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default UpdateProfilePage;