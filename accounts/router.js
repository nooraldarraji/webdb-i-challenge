const router = require('express').Router()

const db = require('../data/dbConfig')

router.get('/', (req, res) => {
    db('accounts') // === select * from ('$1')
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

router.get('/:id', (req, res) => {
    const userId = req.params.id
    console.log(userId)
    db('accounts')
        .where({ id: userId })
        .first()
        .then(account => {
            if (account) {
                res
                    .json(account)
            } else {
                res
                    .status(404)
                    .json({ message: 'Unable to find the account' })
            }
        })
})

module.exports = router