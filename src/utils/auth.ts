import Cookie from 'js-cookie';
import { userData } from '../stores';
import type { User } from '../types';
import router from './router';

export type AuthDetails = {
  username: string;
  accessToken: string;
};

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24; // 1 day

const init = async () => {
  const encoded = Cookie.get('authDetails');
  if (!encoded) return;

  const { username, accessToken } = JSON.parse(
    window.atob(encoded)
  ) as AuthDetails;

  await login(username, accessToken);
};

const setCookie = (authDetails: AuthDetails) => {
  const encoded = window.btoa(JSON.stringify(authDetails));
  const expires = new Date(new Date().getTime() + COOKIE_MAX_AGE);

  Cookie.set('authDetails', encoded, {
    expires,
    sameSite: 'Lax',
    secure: true,
  });
};

const register = async (
  username: string
): Promise<Partial<AuthDetails> | string> => {
  const res = await fetch(
    `https://api.spacetraders.io/users/${username}/token`,
    {
      method: 'POST',
    }
  );

  switch (res.status) {
    case 201: {
      const { token } = (await res.json()) as {
        token: string;
        user: User;
      };

      return token;
    }
    case 409: {
      return { username: 'username already registered' };
    }
    default: {
      return {
        username: (await res.json()).error.message || 'unknown error occurred',
      };
    }
  }
};

const login = async (
  username: string,
  accessToken: string
): Promise<Partial<AuthDetails>> => {
  const res = await fetch(`https://api.spacetraders.io/users/${username}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  switch (res.status) {
    case 200: {
      const { user } = (await res.json()) as {
        user: User;
      };

      setCookie({ username: user.username, accessToken });
      userData.set({
        user,
        accessToken,
      });

      return {};
    }
    case 404: {
      return { username: 'username does not exist' };
    }
    case 401: {
      return { accessToken: 'invalid access token' };
    }
    default: {
      return {
        username: (await res.json()).error.message || 'unknown error occurred',
      };
    }
  }
};

const logout = () => {
  router.route('/');
  Cookie.remove('authDetails');
  userData.set(null);
};

const auth = { init, register, login, logout };
export default auth;
