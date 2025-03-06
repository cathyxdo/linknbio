import Link from "next/link";
export default function NotFound() {
    return (
    <div className="flex flex-col items-center mt-12 min-h-screen text-center gap-8">
        <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Linknbio
            </span>
        </Link>
        <h1 className="text-7xl font-bold text-blue-700">OOPS!</h1>
        <h2 className="text-lg">The page you are looking for does not exist</h2>
    </div>
    );
  }