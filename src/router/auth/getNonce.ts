import type { Request, Response } from 'express';
import type { GetNonceRequest, GetNonceResponse } from '../../types/export/auth';
import { number, object, optional } from 'valibot';
import { requireBody } from '../../utility/utility';
import { generateNonce } from '../../utility/nonce';

const GetNonceSchema = object({
  expirationOffset: optional(number()),
});

function requestNonce(req: Request, res: Response<GetNonceResponse>): Response<GetNonceResponse> {
  const { success, result } = requireBody(null! as GetNonceRequest, req, GetNonceSchema);
  if (!success) return res.status(400).end();
  const { expirationOffset } = result;
  const nonce = generateNonce(expirationOffset);
  return res.status(200).json({ success: true, nonce: nonce });
}

export { requestNonce };
