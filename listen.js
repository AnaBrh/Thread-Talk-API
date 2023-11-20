const app = require("./db/connection")

app.listenerCount(9090, () => {
    console.log("Listening on port 9090.")
})