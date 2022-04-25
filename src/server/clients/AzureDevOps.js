const AzureClient = require("azure-devops-node-api");
const {
  BUILD_STATE_FAIL,
  BUILD_STATE_NONE,
  BUILD_STATE_PROGRESS,
  BUILD_STATE_SUCCESS,
  BUILD_STATE_WARNING,
} = require("../../shared/constants");

class AzureDevOps {
  constructor(orga, email, token) {
    const auth = AzureClient.getBasicHandler(email, token);
    this.connection = new AzureClient.WebApi(
      `https://vsrm.dev.azure.com/${orga}`,
      auth
    );
  }

  /**
   * Get details
   * @param {*} groupId Project Id
   * @param {*} buildId Pipeline Id
   */
  async getBuildDetails(groupId, buildId) {
    const releaseApi = await this.connection.getReleaseApi();
    const releasesForId = await releaseApi.getReleases(groupId, buildId);
    const latestRelease = releasesForId[0];
    const releaseDetails = await releaseApi.getRelease(
      groupId,
      latestRelease.id
    );
    return {
      date: releaseDetails.createdOn,
      stages: releaseDetails.environments.map((env) => ({
        name: env.name,
        status: this.mapStatus(env.status),
      })),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  mapStatus(status) {
    switch (status) {
      case 32:
      case 64:
      case 2:
        return BUILD_STATE_PROGRESS;
      case 4:
        return BUILD_STATE_SUCCESS;
      case 16:
      case 8:
        return BUILD_STATE_FAIL;
      case 128:
        return BUILD_STATE_WARNING;
      case 1:
      case 0:
      default:
        return BUILD_STATE_NONE;
    }
  }
}

module.exports = { AzureDevOps };
