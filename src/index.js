import { DataManager } from "./helpers/dataManager.helper.js";

const dm = new DataManager(["film","reservation","salle","seance"]);
dm.initDataStorage();



console.log(dm);