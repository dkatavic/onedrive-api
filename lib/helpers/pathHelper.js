function generateUserPath(params) {

    if (params.drive === 'user') return 'users/' + params.driveId + '/drive/'
    if (params.drive === 'drive') return 'drives/' + params.driveId + '/'
    if (params.drive === 'group') return 'groups/' + params.driveId + '/drive/'
    if (params.drive === 'site') return 'sites/' + params.driveId + '/drive/'
    
    return 'me/drive/'

}

module.exports = generateUserPath