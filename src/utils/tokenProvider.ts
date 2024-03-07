import { AuthTokens, TokenProvider, decodeJWT } from "aws-amplify/auth";

const tokenProvider: TokenProvider = {
  async getTokens(p?: { forceRefresh?: boolean }) {
    if (p?.forceRefresh) {
      //
      console.log("force refresh token");
    }

    const url = new URL(window.location.href);
    const idToken = url.searchParams.get("idtoken");
    if (!idToken) {
      throw new Error("id token is required");
    }

    const accessTokenString = decodeURIComponent(idToken);
    const idTokenString = decodeURIComponent(idToken);

    const authToken: AuthTokens = {
      accessToken: decodeJWT(accessTokenString),
      idToken: decodeJWT(idTokenString)
    }

    console.log("authToken", authToken);

    return authToken;
  },
};

export default tokenProvider;
