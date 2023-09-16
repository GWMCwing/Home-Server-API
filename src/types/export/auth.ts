export type RequestVerificationEmailRequest = {
  email: string;
  nonce: string;
};

export type CommonRequestError = 'invalid_request' | 'too_many_requests';
export type RequestTimeoutError = 'timeout';

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
          error: 'invalid_email' | 'already_verified' | 'already_sent' | CommonRequestError;
        }
      | {
          error: RequestTimeoutError;
        }
    ));

export type CreateUserRequest = {
  userName: string;
  email: string;
  password: string;
  nonce: string;
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
          error: 'invalid_email' | 'invalid_password' | 'already_exists' | CommonRequestError;
        }
      | {
          error: RequestTimeoutError;
        }
    ));

export type GetNonceResponse =
  | {
      success: true;
      nonce: string;
    }
  | {
      success: false;
      error: CommonRequestError;
    };

export type GetNonceRequest = {
  expirationOffset?: number;
};
