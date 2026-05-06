import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference py-8 px-12 flex justify-between items-center pointer-events-none">
      <div className="pointer-events-auto">
        <Link href="/" className="font-display font-semibold text-2xl tracking-[0.3em] text-white">M4</Link>
      </div>
      <div className="flex gap-12 pointer-events-auto">
        {['Heritage', 'Engineering', 'Performance', 'Configure'].map((item) => (
          <Link
            key={item}
            href={`/#${item.toLowerCase()}`}
            className="font-body text-[11px] tracking-[0.45em] uppercase text-white hover:text-accent transition-colors duration-300"
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
