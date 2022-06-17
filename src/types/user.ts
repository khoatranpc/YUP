export interface User {
  email: string;
  id: string;
  isVerified: boolean;
  role: string[];
}
export interface AuthLogin {
  email: string;
  password: string;
}
export interface ForgotPassword {
  email: string;
  message: string;
}
export interface VerifyAccount {
  email: string;
  message: string;
}
export interface ResetPassword {
  email: string;
  message: string;
}
// interface response {
//   data: {
//     accessToken: string;
//     user: {
//       email: string;
//       id: string;
//       isVerified: boolean;
//       role: string[];
//     };
//   };
// }
