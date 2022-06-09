import clientPromise from "../../lib/mongodb";
import { v1 as uuidv1 } from 'uuid';
import cookie from 'cookie';
const Client = require('@line/bot-sdk').Client;

const lineClient = new Client({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    // channelSecret: process.env.LINE_CHANNEL_SECRET
});

export default async function login(req, res) {

    if (req.method === 'POST' && req.body.studentid && req.body.profile) {

        const client = await clientPromise;
        const collection = client.db('mwitsc').collection("studentData");
        // const session = uuidv1();
        collection.findOneAndUpdate({
            id: req.body.studentid,
            $or: [
                { line: { $exists: false } },
                { line: null },
                { line: req.body.profile.userId }
            ],
        }, { $set: { line: req.body.profile.userId, linePf: req.body.profile } }, (err, resp) => {
            // console.log('err', err);
            // console.log('res', resp);
            if (resp.value) {
                // res.setHeader('Set-Cookie', cookie.serialize('session', session, {
                //     httpOnly: true,
                //     secure: process.env.NODE_ENV !== 'development',
                //     sameSite: 'strict',
                //     path: '/'
                // }));
                lineClient.pushMessage(req.body.profile.userId, {
                    type: 'text',
                    text: 'ลงทะเบียนสำเร็จ รอติดตามข่าวสารจากโครงการ "กน.นกพิราบ" ได้เลยคับ!'
                });
                res.status(200).json({ ok: true });
            } else {
                collection.findOne({ id: req.body.studentid }, (ferr, fres) => {
                    // console.log('ferr', ferr);
                    if (fres) {
                        res.status(401).json({ message: 'เลขประจำตัวนักเรียนนี้ได้ถูกลงทะเบียนไปแล้ว หากไม่ใช่คุณ กรุณาติดต่อกน.', ok: false });
                    } else {
                        res.status(401).json({
                            message: 'เกิดข้อผิดพลาด! กรุณาตรวจสอบข้อมูลอีกครั้ง หรือรายงานปัญหาการใช้งาน',
                            ok: false
                        });
                    }
                });
            }
        });
        // console.log(req.body);

    } else res.status(405).json({ message: 'Method not Allowed' });
}