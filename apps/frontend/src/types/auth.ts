// src/types/auth.ts
export interface LoginPayload {
  email: string;
  password: string;
}

export type AuthResponse = {
  accessToken: string;
  authentication: {
    strategy: string;
    payload: {
      iat: number;
      exp: number;
      aud: string;
      sub: string;
      jti: string;
    };
  };
  user: {
    _id: string;
    email: string;
    name: string;
    uniqueId: string;
    phone: string;
    role: "admin" | "user" | string;
  };
};
