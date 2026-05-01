import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">Contact</h2>
          <p className="text-sm text-slate-400">support@suncart.com</p>
          <p className="text-sm text-slate-400">+1 (555) 123-4567</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">Follow Us</h2>
          <div className="flex flex-wrap gap-3 text-sm text-slate-400">
            <Link href="#" className="hover:text-white">
              Twitter
            </Link>
            <Link href="#" className="hover:text-white">
              Instagram
            </Link>
            <Link href="#" className="hover:text-white">
              Facebook
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">Legal</h2>
          <Link href="/privacy" className="text-sm text-slate-400 hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-4 text-center text-sm text-slate-500 md:px-8">
        © {new Date().getFullYear()} SunCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
