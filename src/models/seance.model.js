import { BaseModel } from "./baseModel.model";

export class Seance extends BaseModel{

    jour = "";
    heure = "";
    price = 0;
    film_id = -1;
    salle_id = -1;

    constructor(jsonObj){
        super();
        this.assign(jsonObj);
    }
}