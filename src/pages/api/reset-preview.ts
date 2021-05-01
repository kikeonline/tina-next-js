import type { NextApiRequest, NextApiResponse } from 'next'

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  res.clearPreviewData()
  res.status(200).end()
}
