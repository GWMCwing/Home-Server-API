import type { Request, Response } from 'express';
import type { CreateUserRequest, CreateUserResponse } from '../../types/export/auth';
import type { ConstraintRequestSchema } from '../../types/utility';
import { email, maxLength, minLength, object, parse, string } from 'valibot';
import { requireBody } from '../../utility/utility';
import { selectUser } from '../../database/accessor/user/user';
import { validateNonce } from '../../utility/nonce';

const CreateUserRequestSchema = object({
  userName: string(),
  email: string([minLength(1, 'Email is required.'), email('Email is invalid.')]),
  password: string([
    minLength(1, 'Password is required.'),
    minLength(8, 'Password must be at least 8 characters.'),
    maxLength(32, 'Password must be at most 32 characters.'),
  ]),
  nonce: string([minLength(1)]),
});

async function createUser(req: Request, res: Response<CreateUserResponse>): Promise<Response<CreateUserResponse>> {
  const { success, result } = requireBody(null! as CreateUserRequest, req, CreateUserRequestSchema);
  if (!success) {
    return res.status(400).json({ success: false, error: 'invalid_request' });
  }
  //
  const { userName, email, password, nonce } = result;
  if (validateNonce(nonce) === false) {
    return res.status(400).json({ success: false, error: 'invalid_request' });
  }
  //
  if ((await selectUser('name', userName)) !== null || (await selectUser('email', email)) !== null) {
    return res.status(400).json({ success: false, error: 'already_exists' });
  }
  // TODO: Check if email is already verified
  // TODO: Check if email is already sent
  // TODO: Create a new user
  // TODO: Send verification email
  //
  return res.status(200).json({ success: true, message: 'Verification email sent.' });
}

export { createUser };
