// import { FaSearch } from 'react-icons/fa';
import SearchBox from "./searchBox";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50">
      <div className="h-20 px-[9.5rem] flex items-center justify-between bg-secondary_s">
        <Link href="/">
          <Image src="/chill.webp" alt="logo" width={150} height={150} />
          {/* <img src='chill.jpg' alt='asd' /> */}
        </Link>
        <SearchBox />
      </div>
    </nav>
  );
};

export default Navbar;
