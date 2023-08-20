import type { Request, Response } from 'express';
import type { RequestVerificationEmailRequest, RequestVerificationEmailResponse } from '../../types/auth';
import { requireBody } from '../../utility/utility';

function requestVerificationEmail(req: Request, res: Response) {
  const requiredBody: (keyof RequestVerificationEmailRequest)[] = ['email', 'nonce'];
  const { body, error } = requireBody(req, Object.keys(requiredBody));
  if (error) {
    return res.status(400).end();
  }
  const { email, nonce } = body;
  return res.status(400).end();
}

export { requestVerificationEmail };
