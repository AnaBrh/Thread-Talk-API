exports.handlePsqlErrs = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Bad request'})
    } else {
        next(err)
    }
}

exports.handle404 = (err, req, res, next) => {
    if (err.code === 404) {
        res.status(404).send({ msg: 'Not found'})
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