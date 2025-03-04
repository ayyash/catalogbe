const express = require('express');
const uuid = require('uuid').v4;

module.exports = function () {

    const router = express.Router();

    router.get('/posts', function (req, res) {
        const o = require('../data/posts.json');
        if (!o) {
            res.status(404).json({
                code: 'NO_RESULTS',
                message: 'No results found'
            });
        } else {
            // get diary of authenticated user
            res.json({
                data: {
                    total: o.length,
                    matches: o
                }
            });

        }
    });


    router.get('/posts/:id', function (req, res) {
        const o = require('../data/post.json')
        res.json({
            data: o
        });
    });
    router.post('/posts/:id/votes', function (req, res) {
        const o = require('../data/post.json');
        // if user already voted, subtract, else add
        o.stats.votes++;
        res.json({
            data: o.stats.votes
        });
    });

    router.get('/posts/:id/comments', function (req, res) {
        const o = require('../data/comments.json');
        if (!o) {
            res.status(404).json({
                code: 'NO_RESULTS',
                message: 'No results found'
            });
        } else {
            // get diary of authenticated user
            res.json({
                data: {
                    total: o.length,
                    matches: o
                }
            });

        }
    });
    router.get('/posts/:id/comments/:cid/replies', function (req, res) {
        const o = require('../data/replies.json');
        if (!o) {
            res.status(404).json({
                code: 'NO_RESULTS',
                message: 'No results found'
            });
        } else {
            // get diary of authenticated user
            res.json({
                data: o
            });

        }
    });
    router.post('/posts/:id/comments', function (req, res) {
        const o = require('../data/comments.json');
        // create new by body and append
        const c = {
            id: uuid(),
            content: req.body.content,
            author: {
                "displayname": "Johansen Deferson",
                "avatar": "https://randomuser.me/api/portraits",
                "shortname": "johnson"
            },
            created: new Date(),
            replies: 0
        };

        o.push(c);

        // get diary of authenticated user
        res.json({
            data: c
        });

    });
    router.post('/posts/:id/comments/:cid/replies', function (req, res) {
        const o = require('../data/replies.json');
        // create new by body and append
        const c = {
            id: uuid(),
            content: req.body.content,
            author: {
                "displayname": "Johansen Deferson",
                "avatar": "https://randomuser.me/api/portraits",
                "shortname": "johnson"
            },
            created: new Date()
        };

        o.push(c);

        // get diary of authenticated user
        res.json({
            data: c
        });

    });

    return router;

}
