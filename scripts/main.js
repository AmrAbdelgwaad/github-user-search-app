const form = document.querySelector("form");
const error = document.getElementById("error");

const githubPhoto = document.getElementById("photo");

const date = document.getElementById("date");

const githubName = document.getElementById("name");
const userName = document.getElementById("user");
const githubBio = document.getElementById("bio");

const githubRepos = document.getElementById("repos");
const githubFollowers = document.getElementById("followers");
const githubFollowing = document.getElementById("following");

const userLocation = document.getElementById("location");
const userBlog = document.getElementById("blog");
const twitter = document.getElementById("twitter");
const userCompany = document.getElementById("company");

const locationIcon = document.getElementById("location-svg");
const blogIcon = document.getElementById("blog-svg");
const twitterIcon = document.getElementById("twitter-svg");
const companyIcon = document.getElementById("company-svg");

function formatDate(date) {
  const userDate = new Date(date);

  const formattedDate = userDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return `Joined ${formattedDate}`;
}
const getUser = async (user) => {
  const response = await fetch(`https://api.github.com/users/${user}`);
  if (response.status === 404) {
    error.textContent = "No results";
  } else {
    error.textContent = "";
    const userData = await response.json();
    const {
      name,
      login,
      bio,
      created_at,
      html_url,
      avatar_url,
      public_repos,
      followers,
      following,
      location,
      twitter_username,
      blog,
      company,
    } = userData;

    githubPhoto.src = avatar_url;

    date.innerText = formatDate(created_at);

    githubName.innerText = name ? name : login;
    userName.innerText = "@" + login;
    userName.href = html_url;

    githubBio.innerText = bio ? bio : "This profile has no bio";

    githubRepos.innerText = public_repos;
    githubFollowers.innerText = followers;
    githubFollowing.innerText = following;

    if (company) {
      userCompany.innerText = company;
    } else {
      userCompany.innerText = "Not Available";
      userCompany.style.color = "#8c94a3";
      companyIcon.style.filter =
        "brightness(0) saturate(100%) invert(66%) sepia(5%) saturate(851%) hue-rotate(181deg) brightness(88%) contrast(83%)";
    }
    if (blog) {
      userBlog.innerText = blog;
      userBlog.href = blog;
    } else {
      userBlog.style.pointerEvents = "none";
      userBlog.innerText = "Not Available";
      userBlog.style.color = "#8c94a3";
      blogIcon.style.filter =
        "brightness(0) saturate(100%) invert(66%) sepia(5%) saturate(851%) hue-rotate(181deg) brightness(88%) contrast(83%)";
    }
    if (location) {
      userLocation.innerText = location;
    } else {
      userLocation.innerText = "Not Available";
      userLocation.style.color = "#8c94a3";
      locationIcon.style.filter =
        "brightness(0) saturate(100%) invert(66%) sepia(5%) saturate(851%) hue-rotate(181deg) brightness(88%) contrast(83%)";
    }
    if (twitter_username) {
      twitter.innerText = twitter_username;
    } else {
      twitter.innerText = "Not Available";
      twitter.style.color = "#8c94a3";
      twitterIcon.style.filter =
        "brightness(0) saturate(100%) invert(66%) sepia(5%) saturate(851%) hue-rotate(181deg) brightness(88%) contrast(83%)";
    }
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchInputValue = document.getElementById("search").value;
  getUser(searchInputValue);
});

document.addEventListener("DOMContentLoaded", getUser("octocat"));
