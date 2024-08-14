const User = require("../models/user");
const respon = require("../utils/helpers");

controller = {};

controller.create = async (req, res) => {
    try {
        //!req.body.name?.trim() || !req.body.job?.trim()
        if (req.body.name.trim() === "" || req.body.job.trim() === "") {
            return respon.responseErr(res, "error create user missing record");
        }
        const createUser = await User.create(req.body, {
            // attributes: { exclude: ["updatedAt"] },
        });
        return respon.response(res, createUser, 201)
    } catch (error) {
        console.log(error);
        return respon.responseErr(res, error.message, 500)
    }
}

controller.update = async (req, res) => {
    let message = "Success";
    try {
        let updateUser = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (updateUser[0] === 0) {
            return respon.responseErr(res, "Update User Data Failed");
        }
        let userBaru = await User.findOne({
            where: {
                id: req.params.id,
            },
        });
        return respon.response(res, userBaru);
    } catch (err) {
        console.log(err);
        return respon.responseErr(res, err.message);
    }
};


controller.patch = async (req, res) => {
    let message = "Success";
    try {
        let updateUser = await User.patch(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (updateUser[0] === 0) {
            return respon.responseErr(res, "Gagal edit data User");
        }
        const userBaru = await User.findOne({
            where: {
                id: req.params.id,
            },
        });
        return respon.response(res, userBaru);
    } catch (err) {
        console.log(err);
        return respon.responseErr(res, err.message, 500);
    }
};

controller.delete = async (req, res) => {
    let message = "Succes";
    try {
        let getOne = await User.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (getOne == null) {
            return respon.responseErr(res, "User Id Not Found")
        }
        await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        return respon.response(res, message)

    } catch (error) {
        return respon.responseErr(res, error.message);
    }
}

controller.getAll = async (req, res) => {
    try {
        const delay = parseInt(req.query.delay) || 0;
        await new Promise((resolve) => setTimeout(resolve, delay));
        const listUsers = await User.findAll();
        return respon.response( res, listUsers);
    } catch (error) {
        return respon.responseErr(
            res,
            error.message
        );
    }
};

controller.getById = async (req, res) => {
    let id = req.params.id;
    try {
        const data = await User.findOne({
            where: {
                id: id,
            },
        });
        console.log(data);
        if (data == null) {
            return respon.responseErr(res,  "User Id Not Found") ;
        }
        return respon.response(res, data);

    } catch (error) {
        return respon.responseErr(res, error.message);
    }
}
module.exports = controller;
