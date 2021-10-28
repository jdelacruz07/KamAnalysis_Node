const express = require('express');
const PORT = 3000;
const cors = require('cors')
app = express();

const gap = require('./routes/gap')

app.use(express.static(__dirname + '/public'));

app.use(cors())
app.use(express.json())

app.use('/gap', gap)

app.use((req, res, next) => {
    res.status(404)
        .type('text')
        .send('Not Found');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})