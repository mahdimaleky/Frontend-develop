import { getAppToken } from './tokenHandler';

type ApiMethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type IntError = {
  type: string;
  errors: {
    attr: string;
    code: string;
    detail: string;
  };
};

export type IntErrors = {
  type: string;
  errors: {
    attr: string;
    code: string;
    detail: string;
  }[];
};

export default async function apiHandler(
  uri: string,
  method: ApiMethodType = 'GET',
  data?: unknown,
  authRequired?: boolean
) {
  const headers: HeadersInit = {};

  if (authRequired) {
    const tokens = getAppToken();
    if (tokens) {
      const accessToken = JSON.parse(tokens);
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken.access}`;
      else throw 'An error occurred when fetching the access token';
    } else {
      throw 'An error occurred when fetching the token';
    }
  }

  const fetchOptions: RequestInit = {
    method,
    headers
  };

  // If method is not GET, add body option
  if (method !== 'GET') {
    if (data instanceof FormData) {
      fetchOptions.body = data;
    } else if (data) {
      headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(data);
    }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}${uri}`,
    fetchOptions
  );

  if (res.status < 400) {
    try {
      const text = await res.text();
      const json = JSON.parse(text);
      return json;
    } catch (err) {
      return true;
    }
  }

  const error = await res.json();
  throw error;
}
