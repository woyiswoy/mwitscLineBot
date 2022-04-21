export { Navbar };
function Navbar({ profile }) {
  return (
    <div className="ds-navbar bg-base-200 sticky top-0 z-50 bg-opacity-70 backdrop-blur-md drop-shadow-xl">
      <div className="px-4 gap-2 items-center">
        <img src="/sclogo.png" className="h-10" />
        <span className=" text-xl font-semibold">MWIT SC</span>
      </div>
    </div>
  );
}
