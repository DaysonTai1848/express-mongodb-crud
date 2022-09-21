const express = require('express')

const router = express.Router()

const Subscriber = require('../models/subscribers.model')

const {
    getSubscribers,
    getSubscriber,
    postSubscriber,
    updateSubscriber,
    deleteSubscriber,
    fetchSubscriber
} = require('./subscribers.controller')

router.get('/', getSubscribers)

router.get('/:id', fetchSubscriber, getSubscriber)

router.post('/', postSubscriber)

router.patch('/:id', fetchSubscriber, updateSubscriber)

router.delete('/:id', fetchSubscriber, deleteSubscriber)

module.exports = router
