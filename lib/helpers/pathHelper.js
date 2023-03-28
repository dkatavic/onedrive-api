function generateUserPath(params) {
  if (params.drive === "user") return "users/" + params.driveId + "/drive/";
  if (params.drive === "drive") return "drives/" + params.driveId + "/";
  if (params.drive === "group") return "groups/" + params.driveId + "/drive/";
  if (params.drive === "site") return "sites/" + params.driveId + "/drive/";

  return "me/drive/";
}

function formatItemPath(itemPath) {
  if (itemPath === "/") {
    return "root"
  }

  if (itemPath[0] === '/') {
    itemPath = itemPath.slice(1)
  }
  if (itemPath[itemPath.length - 1] === '/') {
    itemPath = itemPath.slice(0, -1)
  }

  return "root:/" + itemPath + ":"
}

module.exports = {
  userPathGenerator: generateUserPath,
  itemPathFormatter: formatItemPath
};
