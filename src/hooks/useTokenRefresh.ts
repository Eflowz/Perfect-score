import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/auth/useAuth";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "../utlis/storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_BASE_URL = "https://perfectb.onrender.com/api/v1";

export const useTokenRefresh = () => {
  const { user, logout } = useAuth();
  const [currentToken, setCurrentToken] = useState<string | null>(getAccessToken());
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep currentToken in sync when user logs in or out
  useEffect(() => {
    setCurrentToken(getAccessToken());
  }, [user]);

  useEffect(() => {
    if (!user || !currentToken) {
      if (refreshTimer.current) {
        clearTimeout(refreshTimer.current);
        refreshTimer.current = null;
      }
      return;
    }

    try {
      const decoded = jwtDecode<{ exp: number }>(currentToken);
      const expTime = decoded.exp * 1000;
      // Refresh 1 minute before expiration
      const refreshTime = expTime - Date.now() - 60000;

      if (refreshTime > 0) {
        if (refreshTimer.current) {
          clearTimeout(refreshTimer.current);
        }

        refreshTimer.current = setTimeout(async () => {
          try {
            const refreshToken = getRefreshToken();
            if (!refreshToken) throw new Error("No refresh token");

            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refreshToken,
            });
            const { accessToken, refreshToken: newRefreshToken } = response.data;

            setAccessToken(accessToken);
            if (newRefreshToken) {
              setRefreshToken(newRefreshToken);
            }
            setCurrentToken(accessToken); // Update current token state to trigger the next scheduling
          } catch (error) {
            console.error("Auto token refresh failed:", error);
            logout();
          }
        }, refreshTime);
      } else {
        // Token is already expired or expires in less than 1 minute, refresh immediately
        (async () => {
          try {
            const refreshToken = getRefreshToken();
            if (!refreshToken) throw new Error("No refresh token");

            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refreshToken,
            });
            const { accessToken, refreshToken: newRefreshToken } = response.data;

            setAccessToken(accessToken);
            if (newRefreshToken) {
              setRefreshToken(newRefreshToken);
            }
            setCurrentToken(accessToken); // Update current token state
          } catch (error) {
            console.error("Auto token refresh on load failed:", error);
            logout();
          }
        })();
      }
    } catch (e) {
      console.error("Error decoding token in refresh hook:", e);
    }

    return () => {
      if (refreshTimer.current) {
        clearTimeout(refreshTimer.current);
      }
    };
  }, [user, currentToken, logout]);
};
