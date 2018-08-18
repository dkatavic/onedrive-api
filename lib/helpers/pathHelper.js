function generateUserPath(params) {
    if (params.shared && !params.user) {
        throw new Error("params.shared is set but params.user is missing");
    }

    return params.shared ? 'users/' + params.user + '/' : 'me/';
}

module.exports = generateUserPath;