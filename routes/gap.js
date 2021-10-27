const express = require('express')
const router = express.Router();
const pgp = require("pg-promise")(/*options*/);
const password = 'analysis'
const db = pgp(`postgres://analysis:${password}@localhost:5432/analysis`);

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.post("/add", (req, res, err) => {
    newGap(req, res);
})

router.get("/", (req, res, err) => {
    getGaps(req, res);
})

router.delete("/:id", (req, res, err) => {
    deleteGap(req, res);
})

function newGap(req, res) {
    console.log("Gap a insertar", req.body)
    let body = req.body
    db.task(t => {
        return t.none("insert into gap(isclose, dateselected)" + 'values(${isClose}, ${dateSelected})', body)
            .then(() => {
                return t.one("Select * from gap where dateselected = $1", body.dateSelected)
            });
    })
        .then(gap => {
            newGap = transformToOneGap(gap)
            console.log("El Gap insertado es ", newGap)
            res.status(201)
                .json(newGap)
        })
        .catch(error => {
        });
}

function getGaps(req, res) {
    db.many("SELECT * FROM gap Order by dateselected desc")
        .then(function (gaps) {
            console.log(gaps)
            let allGaps = transformToGaps(gaps);
            res.json(allGaps)

        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });
}

function deleteGap(req, res) {
    console.log("Gap a eliminar: ", req.params)
    let id = req.params.id
    db.result("delete from gap where id = $1", id)
        .then(function (result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} gap`
                });
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });
}

function transformToGaps(gaps) {
    let allGaps = [];
    for (let index = 0; index < gaps.length; index++) {
        let element = gaps[index];
        let newGap = { id: null, isClose: null, dateSelected: null };
        newGap['id'] = element.id;
        newGap['isClose'] = element.isclose;
        newGap['dateSelected'] = element.dateselected;
        allGaps.push(newGap);
    }
    return allGaps
}

function transformToOneGap(gap) {
    let newGap = { id: null, isClose: null, dateSelected: null };
    newGap['id'] = gap.id;
    newGap['isClose'] = gap.isclose;
    newGap['dateSelected'] = gap.dateselected;
    return newGap
}

module.exports = router;