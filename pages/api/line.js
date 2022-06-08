import clientPromise from '../../lib/mongodb';
const Client = require('@line/bot-sdk').Client;

const client = new Client({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
});

const cmdList = [{
    cmd: "g30",
    name: "รุ่น 30",
    filter: {
        line: { $ne: null },
        $or: [
            { gen: 30 },
            { role: "admin" },
        ],
    }
}, {
    cmd: "g31",
    name: "รุ่น 31",
    filter: {
        line: { $ne: null },
        $or: [
            { gen: 31 },
            { role: "admin" },
        ],
    }
}, {
    cmd: "g32",
    name: "รุ่น 32",
    filter: {
        line: { $ne: null },
        $or: [
            { gen: 32 },
            { role: "admin" },
        ],
    }
}, {
    cmd: "all",
    name: "ผู้ใช้งานทั้งหมด",
    filter: {
        line: { $ne: null },
    }
}, {
    cmd: "adm",
    name: "แอดมิน",
    filter: {
        line: { $ne: null },
        role: "admin"
    }
}];

export default async function line(req, res) {
    console.log(req.body);
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
}

async function handleEvent(event) {

    if (event.type === 'message') {
        const message = event.message;
        const source = event.source;
        const replyToken = event.replyToken;
        const mongoClient = await clientPromise;
        const collection = mongoClient.db('mwitsc').collection("studentData");

        if (((source.type === 'group' && source.groupId === 'Cb75d124290e54ba84bb5f512af07c08d') || (source.type === 'user' && source.userId === 'Uf371e1f096b77a290a586216c462155f')) && message.text.substring(0, 1) === '$') {
            const cmd = message.text.substring(1, 4);
            const cmdInfo = cmdList.find(x => x.cmd === cmd);
            const text = message.text.substring(4);
            collection.find(cmdInfo.filter, { projection: { _id: 0, line: 1 } })
                .toArray()
                .then(resp => {
                    return client.multicast(resp.map(d => d.line), [{ type: 'text', text }])
                })
                .then(() => client.replyMessage(replyToken, { type: 'text', text: 'ส่งข้อความไปยัง ' + cmdInfo.name + ' สำเร็จ!' }));
        }
    }

    return;
}