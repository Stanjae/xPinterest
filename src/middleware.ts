import {withAuth} from "@kinde-oss/kinde-auth-nextjs/middleware";
export default withAuth(
  async function middleware(req:any) {
    console.log("look at me", req.kindeAuth);
  },
  {
    isReturnToCurrentPage: true,
    loginPage: "/auth/login",
    isAuthorized: ({token}:any) => {
      // The user will be considered authorized if they have the permission 'eat:chips'
      console.log('token: ', token)
      return token
    }
  }
);

export const config = {
  matcher: ["/creation-pin-tool"]
};