import { useRouter } from "next/dist/client/router";

export default function Report({ profile, loaded, userData }) {
  const router = useRouter();
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };
  if (profile && loaded && !userData) {
    router.push("/");
  } else {
    return (
      <div className="px-8">
        {loaded && profile ? (
          // <div className="ds-form-control w-full">
          //   <label className="ds-label">
          //     <span className="ds-label-text">
          //       พิมพ์เรื่องที่คุณต้องการจะส่ง
          //     </span>
          //     {/* <span className="ds-label-text-alt">Alt label</span> */}
          //   </label>
          //   <textarea
          //     type="text"
          //     placeholder="Type here"
          //     className="ds-textarea ds-textarea-bordered w-full max-w-xs"
          //     onChange={handleKeyDown}
          //   />
          //   {/* <label className="ds-label">
          //     <span className="ds-label-text-alt">Alt label</span>
          //     <span className="ds-label-text-alt">Alt label</span>
          //   </label> */}
          // </div>
          <div className="flex">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeYbanfKR5a4EiFc5gIYu_7Ojyub009mIIE-yKdrbAwo8H92Q/viewform?embedded=true"
              className=" w-full"
              // width="100%"
              height="1500"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading…
            </iframe>
          </div>
        ) : (
          <div className="items-center text-center pt-10 space-y-5">
            <div className="w-10 h-10 inline-block rounded-full bg-slate-400 animate-ping"></div>
            <span className="block text-lg">Loading</span>
          </div>
        )}
      </div>
    );
  }
}
