import  express  from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/error.handler.js";
import routerAnime from "./routes/animes.js";
import routerStudios from "./routes/studios.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use('/animes', routerAnime);
app.use('/studios', routerStudios)
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})
