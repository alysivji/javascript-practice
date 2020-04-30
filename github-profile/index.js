var _ = require("lodash");
var axios = require("axios");

const BASE_URL = "https://api.github.com"

class GitHubClient {
  // test using VCR or something -- polly.js

  constructor(token) {
    this.token = token;
  }

  async getUserId(username) {
    const url = `${BASE_URL}/users/${username}`
    const response = await axios.get(url);
    return response.data.id
  }

  async getPublicEvents(username) {
    const url = `${BASE_URL}/users/${username}/events/public`
    const response = await axios.get(url);
    return response.data;
  }
}

function drawProfileImage(githubId) {
  img = document.createElement("img");
  img.src = `https://avatars.githubusercontent.com/u/${githubId}?size=400`;
  img.crossOrigin = "Anonymous";
  document.body.appendChild(img);
}

function getEventTypeCount(events) {
  event_types = events.map(event => event.type)
  result = _.countBy(event_types);
  console.log(result);
  drawTable(result);
  return result;
}

function drawTable(eventsByType) {
  output = ""
  div = document.createElement("div");
  for (let item of Object.entries(eventsByType)) {
    [type, count] = item;
    output += type + " " + count + "\n";
  }
  div.innerText = output;
  document.body.appendChild(div);
}

github = new GitHubClient();
github.getUserId("alysivji")
  .then(id => drawProfileImage(id));
github.getPublicEvents("alysivji")
  .then(events => getEventTypeCount(events));
