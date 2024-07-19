import { Router } from "express";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import  path  from "path";

const routerAnime = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const animesFilePath = path.join(__dirname,"../../data/animes.json");

const readAnimesFs = async () =>{
    try {
        const animes = await fs.readFile(animesFilePath,"utf-8");
        return JSON.parse(animes)
    } catch (error) {
        throw new Error(`Error en la promesa ${err}`);
    }
}

const writeAnimesFs = async (animes) =>{
    fs.writeFile(animesFilePath, JSON.stringify(animes,null,2)); //1 objeto a string, funcion o array que modifique, espaciado
}

routerAnime.post('/postAnimes', async (req,res) => {
    const animes = await readAnimesFs();
    const newAnime = {
        id: animes.length + 1,
        title: req.body.title,
        genre: req.body.genre,
    };
    animes.push(newAnime);
    await writeAnimesFs(animes);
    res.status(201).send('Anime created successfully ' + JSON.stringify(newAnime));
    console.log(newAnime);
});


routerAnime.get('/getAnimes', async (req,res) => {
    const animes = await readAnimesFs();
    res.json(animes);
});

routerAnime.get("/animeId", async (req,res) => {
    const animes = await readAnimesFs();
    const anime = animes.find((anime) => anime.id === parseInt(req.params.animeId));
    if (!anime)return res.status(404).send("Anime not found")
    res.json(anime)
})

routerAnime.put("/animeId", async (req, res) => {
    const animes = await readAnimesFs();
    const indexAnime = animes.findIndex((anime) => anime.id === parseInt(req.params.animeId));
    if (indexAnime === -1) return res.status(404).send("Anime not found");
    const updateAnime = {
        ...animes[indexAnime],
        title: req.body.title || animes[index].title,
        genre: req.body.genre || animes[index].genre,
    }
    animes[index] = updateAnime;
    await writeAnimesFs(animes);
    res.status(200).send(`Anime update successfully ${updateAnime}`);
})

// routerAnime.delete("/delete/:id", async (req, res) => {
//     let animes = await readAnimesFs();
//     animes = animes.filter(anime => anime.id !== parseInt(req.params.id));
//     if (!anime) return res.status(404).send("Anime not found");
//     animes = animes.filter(a => a.id !== anime.id);

//     await writeAnimesFs(animes);
//     res.send("Anime deleted successfully")
// })

routerAnime.delete('/:id', async(req,res) =>{
    const animes = await readAnimesFs();
    const indexAnime = animes.findIndex((anime) => anime.id === parseInt(req.params.id));
    if(indexAnime === -1) return res.status(404).send("Anime not found");
    const deleteAnime = animes.splice(animeIndex,1)
    await writeAnimesFs(deleteAnime);
    res.send(`Anime deleted successfully`);
})


export default routerAnime;













































