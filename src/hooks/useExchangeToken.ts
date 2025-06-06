import { useMutation } from "@tanstack/react-query"
import { exchangeToken } from "../apis/aythApi"
import { ExchangeTokenResponse } from "../models/auth";

const useExchangeToken = () => {
    return useMutation<
        ExchangeTokenResponse,
        Error,
        { code: string; codeVerifier: string }
    >({
        mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.access_token);
        },
        onError: (err) => {
            console.error("토큰 교환 실패:", err);
        }
    });
};

export default useExchangeToken;
