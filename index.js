const express = require('express');
const PORT = 3000;
const cors = require('cors')
app = express();

const gap = require('./routes/gap')

app.use(cors())
app.use(express.json())

app.use('/gap', gap)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})