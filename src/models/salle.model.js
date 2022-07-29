import { BaseModel } from "./baseModel.model";

export class Salle extends BaseModel{

    name = "";
    capacity = -1;

    constructor(jsonObj){
        super();
        this.assign(jsonObj);
    }
} 