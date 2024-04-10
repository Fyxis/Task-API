require("dotenv").config();
const express = require("express"),
	helmet = require("helmet");

const taskRoute = require(`./routes/taskRoute`)
const variables = require(`./utilities/variables`)

let PORT = variables.port
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(
	helmet({
		strictTransportSecurity: {
			maxAge: 31536000,
			includeSubDomain: true,
		},
    xFrameOptions: { action: "sameorigin" },
	})
);

app.use("/", taskRoute)

app.listen(PORT, () =>
	console.log(`SERVER RUNNING AT http://localhost:${PORT}`)
);
