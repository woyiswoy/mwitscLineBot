import { useRouter } from "next/router";

export default function AccessDenied() {
  const router = useRouter();

  return (
    <div className="px-8">
      <div className="ds-card w-full bg-error shadow-xl">
        <div className="ds-card-body items-center text-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="ds-card-title text-2xl font-bold">Login Error!</h2>
          <p>กรุณาใช้ E-mail ของโรงเรียน (@mwit.ac.th)</p>
          <div className="ds-card-actions">
            <button className="ds-btn ds-btn-warning">LOGIN AGAIN</button>
          </div>
        </div>
      </div>
    </div>
  );
}
