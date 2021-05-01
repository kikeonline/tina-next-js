import type { NextApiRequest, NextApiResponse } from 'next'
import { STRAPI_JWT } from 'react-tinacms-strapi'

const previewHandler = (req: NextApiRequest, res: NextApiResponse): void => {
  const previewData = {
    strapi_jwt: req.cookies[STRAPI_JWT]
  }

  res.setPreviewData(previewData)
  res.status(200).end()
}

export default previewHandler
