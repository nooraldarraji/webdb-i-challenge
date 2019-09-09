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
    // console.log(userId)
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

router.put('/:id', (req, res) => {
    const userId = req.params.id
    // console.log(userId)
    db('accounts')
        .where({ id: userId })
        .update(req.body)
        .then(results => {
            if (results) {
                res
                    .json({ message: `${results} record(s) updated` })
            } else {
                res
                    .status(404)
                    .json({ message: 'Account not found' })
            }
        })
        .catch(() => {
            res
                .status(500)
                .json({ message: 'Could not update the account' })
        })
})

router.delete('/:id', (req, res) => {
    const userId = req.params.id
    // console.log(userId)
    db('accounts')
        .where({ id: userId })
        .del()
        .then(results => {
            res
                .json({ message: `${results} record(s) deleted` })
        })
        .catch(() => {
            res
                .status(500)
                .json({ message: 'Could not remove the account' })
        });
});

router.post('/', (req, res) => {
    if (req.body.name && typeof req.body.budget === 'number' && req.body.budget >= 0) {
        db('accounts')
            .insert(req.body)
            .then(([id]) => id)
            .then(id => {
                db('accounts')
                    .where({ id })
                    .first()
                    .then(results => {
                        res
                            .status(201)
                            .json(results)
                    });
            })
            .catch(() => {
                res
                    .status(500)
                    .json({ message: "Couldn't add the account" })
            })
    } else {
        res
            .status(400)
            .json({
                message: "Please provide name and budget of zero or more for the account"
            })
    }
})

module.exports = router