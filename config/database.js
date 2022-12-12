const mongooes = require('mongoose')

const { MONGO_URL } = process.env

exports.connect = () => {

    mongooes.connect(MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("mongo connected successfully");
        })
        .catch((error) => {
            console.log("error", error);
        })
}
