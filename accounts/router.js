const router = require('express').Router()

const db = require('../data/dbConfig')

router.get('/', (req, res) => {
    db('accounts')
        .then(results => {
            res
                .json(results)
        })
        .catch(error => {
            res
                .status(500)
                .json({ errorMessage: "Couldn't get the accounts" })
        }
        )
})

module.exports = router