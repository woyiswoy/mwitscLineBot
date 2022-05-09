import cookie from 'cookie';
import clientPromise from "../../lib/mongodb";
import { v1 as uuidv1 } from 'uuid';

export default async function refresh(req, res) {
    if (req.method === 'POST') {
        try {
            const session = cookie.parse(req.headers.cookie).session;
            const client = await clientPromise;
            const collection = client.db('mwitsc').collection("studentData");
            const newSession = uuidv1();
            collection.findOneAndUpdate({ session }, { $set: { session: newSession } }, (err, userData) => {
                if (userData.value) {
                    res.setHeader('Set-Cookie', cookie.serialize('session', newSession, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        path: '/'
                    }));
                    res.status(200).json({
                        userData: {
                            number: userData.value.number,
                            id: userData.value.id,
                            title: userData.value.title,
                            firstname: userData.value.firstname,
                            lastname: userData.value.lastname,
                            room: userData.value.room,
                            gen: userData.value.gen,
                            role: userData.value.role,
                        }
                    });
                } else { res.status(401).json({ message: 'Unauthorized' }) }
            })
        } catch {
            res.status(401).json({ message: 'Unauthorized' });
        }

    } else res.status(405).json({ message: 'Method not Allowed' });
};