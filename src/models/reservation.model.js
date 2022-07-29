import { BaseModel } from "./baseModel.model";

export class Reservation extends BaseModel{

    customer = "";
    nbPlace = 0;
    seance_id = -1;

    constructor(jsonObj){
        super();
        this.assign(jsonObj);
    }
}