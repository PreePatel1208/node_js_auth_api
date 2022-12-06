const mongooes = require('mongoose')

const { MONGO_URI } = process.env
exports.connect = () => {
    mongooes.connect(MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("mongo connected successfully");
        }).catch((error) => {
            console.log("error", error);
        })
}
