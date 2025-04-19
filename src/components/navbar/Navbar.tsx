import { CustomDock } from "./custom-dock";

export default function Navbar({ className = "" }: { className?: string }) {
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none ${className}`}>
      <div className="pointer-events-auto flex justify-center w-full">
        <CustomDock />
      </div>
    </nav>
  );
}
