'use strict';

const fetch = require('node-fetch');

// https://github.com/HackerNews/API
const api = {
    newTopStories: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
    askShowJobStories: 'https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty',
    items: 'https://hacker-news.firebaseio.com/v0/item/',
    users: 'https://hacker-news.firebaseio.com/v0/user/'
};
const storiesPerPage = 30;

let dataService = {};

dataService.fetchItem = function(id) {
    return fetch(`${api.items}${id}.json?print=pretty`).then(function(res) {
        return res.json();
    }).catch(function(err) {
        return err;
    });
};

dataService.fetchItems = function(ids) {
    if (!ids || !ids.length) {
        return Promise.resolve([]);
    } else {
        return Promise.all(ids.map(function(id) {
            return dataService.fetchItem(id);
        }));
    }
};

dataService.fetchNewTopStories = function() {
    return fetch(api.newTopStories).then(function(res) {
        return res.json();
    }).catch(function(err) {
        return err;
    });
};

dataService.fetchAskShowJobStories = function() {
    return fetch(api.askShowJobStories).then(function(res) {
        return res.json();
    }).catch(function(err) {
        return err;
    });
};

dataService.fetchItemsByPage = function(topStoryIds, page) {
    const start = (page - 1) * storiesPerPage;
    const end = page * storiesPerPage;
    const ids = topStoryIds.slice(start, end);

    return dataService.fetchItems(ids);
};

dataService.fetchComments = function(storyId) {
    return dataService.fetchItem(storyId).then(function(res) {
        return dataService.fetchItems(res.kids);
    });
};

dataService.fetchUser = function(name) {
    return fetch(`${api.users}${name}.json?print=pretty`).then(function(res) {
        return res.json();
    }).catch(function(err) {
        return err;
    });
};

module.exports = dataService;
