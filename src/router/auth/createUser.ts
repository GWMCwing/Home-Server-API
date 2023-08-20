import type { Request, Response } from 'express';
import type { CreateUserRequest, CreateUserResponse } from '../../types/auth';
import type { KeyArray } from '../../types/utility';
import isEmail from 'validator/lib/isEmail';
import { requireBody } from '../../utility/utility';

function requestVerificationEmail(req: Request, res: Response<CreateUserResponse>): Response<CreateUserResponse> {
  const requiredBody: KeyArray<CreateUserRequest> = ['userName', 'email', 'password'];
  const { body, error } = requireBody<CreateUserRequest>(req, requiredBody);
  if (error) return res.status(400);
  //
  const { userName, email, password, nonce } = body;
  //
  // TODO: Check if email is valid
  if (!isEmail(email, { domain_specific_validation: true })) return res.status(400).json({ success: false, error: 'invalid_email' });
  // TODO: Check if userName already used
  // TODO: Check if email is already verified
  // TODO: Check if email is already sent
  // TODO: Create a new user
  // TODO: Send verification email
  //
  return res.status(200).json({ success: true, message: 'Verification email sent.' });
}

export { requestVerificationEmail };
