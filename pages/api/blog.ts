import type { NextApiRequest, NextApiResponse } from "next";

// type ResType {

// }

// export default (req:NextApiRequest,res:NextApiResponse<ResType>) => {
export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  console.log(req.query);

  res.status(200).send({ success: true });
};
