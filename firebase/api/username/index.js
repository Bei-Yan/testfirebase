import dbConnect from '@/lib/mongo/dbConnect';
import { User } from "@lib/mongo/models/user";
import { getUserId } from '@/lib/utils';

export default async function handle(req, res) {
  if (req.method === 'GET') {
    try {
      const userToken = req.headers['authorization'];
      const userId = await getUserId(userToken);
      await dbConnect();
      const query = await User.findOne({ uid: userId }).select('name').lean().exec();
      console.log('The user data: %s', query);
      return res.status(200).json(query);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const userToken = req.headers['authorization'];
      const userId = await getUserId(userToken);
      await dbConnect();
      const queryUser = await User.findOne({ uid: userId }).lean().exec();

      if (queryUser == null) {
        await User.create({
          uid: userId,
          name: req.body.name,
        });
        return res.status(200).json({ data: 'save successed' });
      }
      else {
        return res.status(200).json({ data: 'already saved' });
      }

    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}
