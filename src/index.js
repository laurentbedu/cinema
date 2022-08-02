import { DataManager } from "./helpers/dataManager.helper.js";
import { Film } from "./models/film.model.js";
import { Reservation } from "./models/reservation.model.js";
import { Salle } from "./models/salle.model.js";
import { Seance } from "./models/seance.model.js";

// const dm = new DataManager();
DataManager.initDataStorage();
const folder = DataManager.folder;
const files = DataManager.files;
console.log();

// const filmJsonObj = {"id":1,"title":"Avenger's 1","synopsis":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, quibusdam quisquam. Quasi blanditiis quam laborum est quae facere a. Enim fuga qui, distinctio deserunt molestias consequatur necessitatibus nesciunt repudiandae fugiat!","affiche":"https://picsum.photos/id/1001/400/600"};
// const film1 = new Film(filmJsonObj);
// console.log(film1);

// const resaJsonObj = {"id":1, "customer":"John Doe", "nbPlace":2, "seance_id":1};
// const resa1 = new Reservation(resaJsonObj);
// console.log(resa1);

// const salleJsonObj = {"id":1,"name":"bleu","capacity":200};
// const salle1 = new Salle(salleJsonObj);
// console.log(salle1);

// const seanceJsonObj = {"id":1,"jour":"2022-08-01","heure":"14:00","price":7.5,"film_id":1,"salle_id":1};4
// const seance1 = new Seance(seanceJsonObj);
// console.log(seance1);

// const films = dm.getAll("film", true);
// const reservations = dm.getAll("reservation");
// const salles = dm.getAll("salle");
// const seances = dm.getAll("seance");

// console.log(films);
// console.log(reservations);
// console.log(salles);
// console.log(seances);


// const film1 = dm.getOne("film", 4, true);
// const film2 = dm.getOne("film", 5, true);
// film1.title = "nouveau titre";
// film2.title = "nouveau titre";
// dm.updateOne(film1);

// dm.deleteOne(film1);
// const film10 = dm.getOne("film", 10);

// console.log(film1);
// console.log(film10);

// const newFilm = new Film({title:"Avenger's 6", synopsis:"description résumé", affiche:'https://picsum.photos/id/1006/400/600'})
// dm.insertOne(newFilm);

// const filmA = new Film({title:"Avenger's 6", synopsis:"description résumé", affiche:'https://picsum.photos/id/1006/400/600'});
// const filmB = new Film({title:"Avenger's 6", synopsis:"description résumé", affiche:'https://picsum.photos/id/1006/400/600'});
// dm.insertMany(filmA, filmB);

// dm.updateMany(film1,film2, film3, film4);
// dm.deleteMany(film1, film2);
