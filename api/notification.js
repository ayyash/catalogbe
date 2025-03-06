const express = require('express');
const uuid = require('uuid').v4;

module.exports = function () {

    const router = express.Router();
    var COUNT = 21;

    router.get('/notifications', function (req, res) {
        const o = require('../data/notifications.json');
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

    router.post('/notifications/clear', function (req, res) {


        let notifications = require('../data/notifications.json');
        // remove all notifications
        notifications = [];

        res.json({
            data: true
        });
    });

    // TODO: FIXME: this is an oversight, this should be part of the account service
    router.get('/notifications/count', function (req, res) {

        // mark all as read by resetting account itself
        res.json({
            data: COUNT
        });
    });
    router.post('/notifications/mark', function (req, res) {

        // mark all as read by resetting account itself
        COUNT = 0;
        res.json({
            data: true
        });
    });
    router.delete('/notifications/:id', function (req, res) {


        // const notifications = require('../data/notifications.json');
        // // remove the notification with the given id
        // const index = notifications.findIndex(n => n.id=== req.params.id);
        // if (index !== -1) { 
        //     notifications.splice(index, 1);
        // }
        res.json({
            data: true
        });
    });


    return router;

}
