const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscribers.model')

// return json for all data
async function getSubscribers (req, res) {
    try {
        const subscribers = await Subscriber.find()
        res.status(200).json(subscribers)
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
}

async function getSubscriber (req, res) {
    res.json(res.subscriber)
}

// add a new subscriber to database
async function postSubscriber (req, res) {
    const subscriber = new Subscriber({name: req.body.name})
    try {
        const newSubscriber = await subscriber.save()
        res.status(200).json(newSubscriber)
    } catch (error) {
        res.status(400).json({ message: err.message })
    }
}

async function updateSubscriber (req, res) {
    let subscriberId = req.params.id

    let updateData = {
        name: req.body.name
    }

    Subscriber.findByIdAndUpdate(subscriberId, {$set: updateData})
    .then(() => {
        res.json({ message: "Subscriber Updated"})
    })
    .catch(error => {
        res.json({ message: error.message })    
    })

    // if (req.body.name != null) {
    //     res.subscriber.name = req.body.name
    // }
    // res.subscriber.name = req.body.name
    // try {
    //     const updatedSubscriber = await res.subscriber.save()
    //     res.json(updatedSubscriber)
    // } catch (err) {
    //     res.status(400).json({ message: err.message })
    // }

    // const subscriber = new Subscriber({name: req.body.name})
    // try {
    //     const newSubscriber = await subscriber.save()
    //     res.status(200).json(newSubscriber)
    // } catch (error) {
    //     res.status(400).json({ message: err.message })
    // }

    // res.subscriber == mongodb data point fetch by middleware
    // subscriber.save() == updating the data point

    // req.body.name 
}

async function deleteSubscriber (req, res) {
    try {
        res.subscriber.remove()
        res.status(200).json({ message: "Subscriber Deleted" })
    } catch (error) {
        res.status(500)
    }
}
    

async function fetchSubscriber(req, res, next) {
    let subscriber
    try {
        // subscriber = await Subscriber.findById(req.params.id)
        subscriber = await Subscriber.findById(req.params.id)
        
        if (subscriber == null) {
        return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.subscriber = subscriber
    next()
}

module.exports = {
    getSubscribers,
    getSubscriber,
    postSubscriber,
    updateSubscriber,
    deleteSubscriber,
    fetchSubscriber
}