const User = require('./model');

const getUsers = (req, res, next) => {
    User.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const addUser = (req, res, next) => {
    const user = new User({
        id: req.body.id,
        name: req.body.name,
        item: req.body.item,
        email: req.body.email,
        cnumber: req.body.cnumber,
        address: req.body.address,
    });
    user.save()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
}

const updateUser = (req, res, next) => {
    const { id, name, item, email, cnumber, address} = req.body;
    User.updateOne({ id: id }, { 
        $set: {
            name: name,
            item: item,
            email: email,
            cnumber: cnumber,
            address: address
        }
    })
    .then(response => {
        res.json({ response })
    })
    .catch(error => {
        res.json({ error })
    });
}

const deleteUser = (req, res, next) => {
    const name = req.body.name;
    User.deleteOne({ name: name})
    .then(response => {
        res.json({ response })
    })
    .catch(error => {
        res.json({ error })
    });
}

exports.getUsers = getUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
