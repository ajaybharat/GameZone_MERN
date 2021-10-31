const express = require("express");
const { Router } = require("express");
const router = Router();
const UserModell = require('../model/user');

//get all users
router.get('/', async function (req, res) {
    try {
        const users = await UserModell.find();
        res.json(users);
    }
    catch(err) {
        res.json({message: err});
    }
})

//get specific user
router.get('/:userId',async (req, res) => {
    try {
        console.log(req.params.userId);
        const user = await UserModell.findById(req.params.userId);
        const {password, ...others} = user._doc;
        res.json(others);
    }
    catch(err) {
        res.json({message: err});
    }
});

//delete a user
router.delete('/:userId',async (req, res) => {
    try {
        const removeUser = await UserModell.remove({_id: req.params.userId});
        res.json(removeUser);
    }
    catch(err) {
        res.json({message: err});
    }
});

//update a user for gameScore
router.put('/:id', async (req,res) => {
    try {
        const updatedUser = await UserModell.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });

        res.status(200).json("Game score updated");
    }
    catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;