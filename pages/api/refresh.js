import cookie from 'cookie';
import clientPromise from "../../lib/mongodb";
import { v1 as uuidv1 } from 'uuid';

export default async function refresh(req, res) {
    if (req.method === 'POST') {
        try {
            // const session = cookie.parse(req.headers.cookie).session;
            const client = await clientPromise;
            const collection = client.db('mwitsc').collection("studentData");
            // const newSession = uuidv1();
            collection.findOne({ line: req.body.userId }, (err, userData) => {
                if (userData) {
                    res.status(200).json({
                        userData: {
                            number: userData.number,
                            id: userData.id,
                            title: userData.title,
                            firstname: userData.firstname,
                            lastname: userData.lastname,
                            room: userData.room,
                            gen: userData.gen,
                            role: userData.role,
                        }
                    });
                } else { res.status(401).json({ message: 'Unauthorized' }) }
            })
        } catch {
            res.status(401).json({ message: 'Unauthorized' });
        }

    } else res.status(405).json({ message: 'Method not Allowed' });
};