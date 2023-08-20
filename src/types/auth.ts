export type RequestVerificationEmailRequest = {
  email: string;
  nonce: string;
};

export type RequestVerificationEmailResponse =
  | {
      success: true;
      message?: string;
      data?: any;
    }
  | ({
      success: false;
    } & (
      | {
          error: 'invalid_email' | 'already_verified' | 'already_sent' | 'too_many_requests';
        }
      | {
          error: 'timeout';
        }
    ));

export type CreateUserRequest = {
  userName: string;
  email: string;
  password: string;
  nonce: number;
};

export type CreateUserResponse =
  | {
      success: true;
      message: string;
    }
  | ({
      success: false;
    } & (
      | {
          error: 'invalid_email' | 'invalid_password' | 'already_exists' | 'too_many_requests';
        }
      | {
          error: 'timeout';
        }
    ));
