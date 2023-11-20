exports.handlePsqlErrs = (err, req, res, next) => {
    console.log(err, "<--err")
}

exports.handleCustomErrs = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg})
    } else {
        next(err)
    }
}

exports.handleServerErrs = (err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error'})
}