import {register} from '@lib/firebase/users';

export default async function registerUser(req, res) {
  if (req.method === 'POST') {
    try {
      await register(req.body);
      return res.status(200).json({message: 'Register Successfully Completed'});
    } catch (e) {
      return res.status(500).json({error: e.message});
    }
  }
}
