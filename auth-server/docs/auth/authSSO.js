var AuthSSO = function ({ host }) {
  if (!host) {
    throw Error('need to pass in target host SSO server');
  }
  return {
    // successUrl: URL for redirection if user is logged in
    // failUrl: URL for redirection if user is not logged in
    check: async ({ successUrl, failUrl }) => {
      window.open(
        `${host}/auth/check?successUrl=${successUrl}&failUrl=${failUrl}`,
        '_self',
      );
    },
    // successUrl: URL for redirection after login
    login: async ({ successUrl }) => {
      window.open(`${host}/auth/login?successUrl=${successUrl}`, '_self');
    },
    // successUrl: URL for redirection after logout
    logout: async ({ successUrl }) => {
      window.open(`${host}/auth/logout?successUrl=${successUrl}`, '_self');
    },
  };
};
