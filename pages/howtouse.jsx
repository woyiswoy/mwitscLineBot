import { useRouter } from "next/dist/client/router";

export default function HowToUse({ profile, loaded, userData }) {
  const router = useRouter();
  const howtoContent = [
    {
      text: '1. เพิ่มเพื่อนกับไลน์บอท "MWIT SC#30" > กดปุ่ม "Chat"',
      img: "/howtoimg/01.png",
    },
    {
      text: "2. กดปุ่มลงทะเบียนจากริชเมนูด้านล่าง",
      img: "/howtoimg/02.png",
    },
    {
      text: '3. กดปุ่ม "ลงทะเบียนใช้งาน"',
      img: "/howtoimg/03.png",
    },
    {
      text: "4. พิมพ์เลขประจำตัวนักเรียน",
      desc: "1 รหัสนักเรียนสามารถใช้ลงทะเบียนได้เพียง 1 ครั้งเท่านั้น",
      img: "/howtoimg/04.png",
    },
    {
      text: '5. กดปุ่ม "ลงทะเบียน"',
      img: "/howtoimg/05.png",
    },
    {
      text: '6. รอสักครู่ หน้าหลักจะมี badge สีเขียวเขียนว่า "ลงทะเบียนแล้ว" เมื่อลงทะเบียนสำเร็จ',
      img: "/howtoimg/06.png",
    },
    {
      text: "7. บอทจะส่งข้อความมาว่าลงทะเบียนสำเร็จแล้ว",
      img: "/howtoimg/07.png",
    },
  ];

  return (
    <div className="px-8 pb-10">
      {loaded ? (
        <div className=" space-y-4">
          {howtoContent.map((howtoItem, howtoIdx) => (
            <div className="ds-card ds-card-compact w-full bg-base-100 border-2">
              <div className="ds-card-body font-IBMPlex">
                <h2 className="ds-card-title text-lg">{howtoItem.text}</h2>
                {howtoItem.desc ? <p>{howtoItem.desc}</p> : <></>}
              </div>
              <figure>
                <img src={howtoItem.img} />
              </figure>
            </div>
          ))}
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
