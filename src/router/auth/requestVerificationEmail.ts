import type { Request, Response } from 'express';
import { email, minLength, object, string } from 'valibot';
import { requireBody } from '../../utility/utility';
import { RequestVerificationEmailRequest } from '../../types/export/auth';
import { validateNonce } from '../../utility/nonce';

const RequestSchema = object({
  email: string([minLength(1, 'Email is required.'), email('Email is invalid.')]),
  nonce: string([minLength(1)]),
});

function requestVerificationEmail(req: Request, res: Response) {
  const { success, result } = requireBody(null! as RequestVerificationEmailRequest, req, RequestSchema);
  if (!success) {
    return res.status(400).json({ success: false, error: 'invalid_request' });
  }
  const { email, nonce } = result;
  return res.status(400).end();
}

export { requestVerificationEmail };
