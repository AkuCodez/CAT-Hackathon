import express from 'express';
import admin from 'firebase-admin';
import credentials from './serviceAccountKey.json' assert { type: "json" };
import authRoute from "./server/routes/authRoute.js"

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.get("/", (res, req) => {
    res.send({ msg: "Hello World!" });
});

app.use('/', authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on Port:${PORT}`);
})
