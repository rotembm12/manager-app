export const userLogin = async (email, password) => {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    return data;
};

export const continueSession = async token => {
    const response = await fetch('/api/users', {
        headers: {
            authorization: token,
            'Content-type': 'application/json'
        }
    });
    const user = await response.json();
    return user;
};

export const userLogout = cb => {
    localStorage.removeItem('authorization');
    cb();
};

export const setAuthorizationToken = token => {
    localStorage['authorization'] = token;
};
