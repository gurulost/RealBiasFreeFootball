# Using API Keys with the cfbd API

The [CollegeFootballData.com](https://collegefootballdata.com/) API is a free and open-source API for college football data. All of the data, documentation, and code is free to use under an [MIT license](https://opensource.org/licenses/MIT).

The API has been and will always be free to use. In the past, no API key was required for use. However, as the API has grown in popularity, the need for API keys has become a necessity.

## So, why do I need an API key?

API keys are now required for all API calls. They are used for identification and not for billing purposes. The API is and will continue to be free. However, in order to keep the API free for everyone, I need some way to identify and contact users of the API who are causing issues. In the past, this has meant having to shut down the API for everyone due to a single user's errant code. With API keys, I can identify the user, disable their key, and contact them to resolve the issue.

You can find more information at [collegefootballdata.com](https://collegefootballdata.com).

## How do I get an API key?

First, you will need to go to collegefootballdata.com and [register for a new account](https://collegefootballdata.com/register). After you have registered and verified your account, you can log in and navigate to your [profile page](https://collegefootballdata.com/account). Here you will see a section for your API key. You can create a new key or revoke an old one from this page.

## How do I use my API key?

Once you have an API key, you will need to include it in the `Authorization` header for all of your API requests. The key should be preceded by the word `Bearer` and a space.

