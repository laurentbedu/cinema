import { BaseModel } from "./baseModel.model";

export class Film extends BaseModel{

    title = "";
    affiche = "";
    synopsis = "";

    constructor(jsonObj){
        super();
        this.assign(jsonObj);
    }

}