import {getUserToken} from '@lib/firebase/users';

export default async function userToken(req, res) {
  if (req.method === 'GET') {
    try {
      const userId = await getUserToken();
      return res.status(200).json({data: userId});
    } catch (e) {
      return res.status(500).json({error: e.message});
    }
  }
}
