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


module.exports = router