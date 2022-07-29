import * as Models from "../models/index";
// import { Film } from "../models/film.model";
// import { Reservation } from "../models/reservation.model";
// import { Salle } from "../models/salle.model";
// import { Seance } from "../models/seance.model";

export class DataManager {
  folder = "data";
  files = [];

  constructor(files, folder = "data") {
    this.files = files;
    this.folder = folder;
  }

  initDataStorage = async () => {
    const dataStorage = {};
    for (const file of this.files) {
      dataStorage[file] = await this.readJsonFile(file);
    }
    localStorage.setItem("data-cinema", JSON.stringify(dataStorage));
  };

  readJsonFile = async (fileName) => {
    let jsonDataArray = [];

    await fetch(`./src/${this.folder}/${fileName}.json`)
      .then((resp) => {
        console.log(resp);
        return resp.text();
      })
      .then((text) => {
        jsonDataArray = JSON.parse(text);
      });

    return jsonDataArray;
  };

  getAll = (tableName) => {
    const allData = JSON.parse(localStorage.getItem("data-cinema"));
    const jsonTableData = allData[tableName];
    // const modelTableData = jsonTableData.map((row) => {
    //   switch (tableName) {
    //     case "film":
    //       return new Film(row);
    //     case "reservation":
    //       return new Reservation(row);
    //     case "salle":
    //       return new Salle(row);
    //     case "seance":
    //       return new Seance(row);
    //   }
    // });
    // return modelTableData;
  };

  getOne = (tableName, id) => {
    const allData = JSON.parse(localStorage.getItem("data-cinema"));
    const jsonTableData = allData[tableName];
    const jsonRow = jsonTableData.find((item) => item.id == id);
    if(!jsonRow){ // jsonRow == undefined
        return undefined;
    }
    const modelName = tableName.charAt(0).toUpperCase() + tableName.slice(1);
    const ModelClass = Models[modelName];
    const modelObj = new ModelClass(jsonRow);
    return modelObj;
    // switch (tableName) {
    //     case "film":
    //         return new Film(jsonRow);
    //     case "reservation":
    //         return new Reservation(jsonRow);
    //     case "salle":
    //         return new Salle(jsonRow);
    //     case "seance":
    //         return new Seance(jsonRow);
    // }
  };

  // Models;
  // const modelName = tableName.charAt(0).toUpperCase() + tableName.slice(1);
  // const modelClass = Models[modelName];
  // const obj = new modelClass();
}
