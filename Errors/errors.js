exports.handlePsqlErrs = (err, req, res, next) => {
    console.log(err, "<--err")
    res.status(400).send({ msg: 'Bad request.'})
}

exports.handle404 = (err, req, res, next) => {
    if (err.code === '404') {
        res.status(404).send({ msg: 'Path not found.'})
    } else {
        next(err)
    }
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
