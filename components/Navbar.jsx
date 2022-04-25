import { useRouter } from "next/router";

export { Navbar };
function Navbar({ profile }) {
  const router = useRouter();
  return (
    <div>
      <div className="ds-navbar bg-base-200 sticky top-0 z-50 bg-opacity-70 backdrop-blur-md drop-shadow-xl">
        <div className="px-4 gap-2 items-center">
          <img src="/sclogo.png" className="h-10" />
          <span className=" text-xl font-semibold">MWIT SC</span>
        </div>
      </div>
      {router.pathname !== "/" && (
        <div className="px-4 pt-4">
          <button
            className="ds-btn ds-btn-ghost text-lg gap-2"
            onClick={() => router.push("/")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
            BACK
          </button>
        </div>
      )}
    </div>
  );
}
