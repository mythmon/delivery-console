import fetch from 'isomorphic-fetch';

export function APIError(message, data = {}) {
  this.data = data;
  this.message = message;
  this.stack = Error().stack;
}
APIError.prototype = Object.create(Error.prototype);
APIError.prototype.name = 'APIError';

export default class APIClient {
  constructor(root, accessToken) {
    this.root = root;
    this.accessToken = accessToken;
  }

  async fetch(url, options) {
    let queryString = '';

    const headers = new Headers();
    headers.append('Accept', 'application/json');
    if (!(options.body && options.body instanceof FormData)) {
      headers.append('Content-Type', 'application/json');
    }

    if (this.accessToken) {
      headers.append('Authorization', `Bearer ${this.accessToken}`);
    }

    const settings = {
      headers,
      credentials: 'same-origin',
      method: 'GET',
      ...options,
    };

    // Convert `data` to `body` or querystring if necessary.
    if ('data' in settings) {
      if ('body' in settings) {
        throw new Error('Only pass one of `settings.data` and `settings.body`.');
      }

      if (['GET', 'HEAD'].includes(settings.method.toUpperCase())) {
        const queryStringData = Object.keys(settings.data).map(
          key => `${key}=${encodeURIComponent(settings.data[key])}`,
        );
        queryString = `?${queryStringData.join('&')}`;
      } else {
        settings.body = JSON.stringify(settings.data);
      }

      delete settings.data;
    }

    const response = await fetch(`${this.root}${url}${queryString}`, settings);

    // Throw if we get a non-200 response.
    if (!response.ok) {
      let message;
      let data = {};
      let err;

      try {
        data = await response.json();
        message = data.detail || response.statusText;
      } catch (error) {
        message = error.message;
        err = error;
      }

      data = { ...data, status: response.status };

      throw new APIError(message, data, err);
    }

    if (response.status !== 204) {
      return response.json();
    }

    return null;
  }
}
