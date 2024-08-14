const extras = {
    url: "https://reqres.in/#support-heading",
    text: "To keep ReqRes free, contributions towards server costs are appreciated!",
};

respon = {};

respon.response = (res, data, code = 200) => {
    return res.status(code).json({
        data: data,
    });
};

respon.responseErr = (res, message = "error", code = 400) => {
    return res.status(code).json({
        code: code,
        message: message,
    });
};



module.exports = respon;
