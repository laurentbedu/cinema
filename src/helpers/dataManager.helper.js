import * as Models from "../models/index";

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

  getJsonDataTable = (tableName) => {
    const allData = JSON.parse(localStorage.getItem("data-cinema"));
    return allData[tableName];
  }

  getModelClass = (tableName) => {
    const modelName = tableName.charAt(0).toUpperCase() + tableName.slice(1);
    return Models[modelName];
  }

  getAll = (tableName, withDeleted = false) => {
    return this.getJsonDataTable(tableName).map((row) => {
      return new (this.getModelClass(tableName))(row);
    });
  };

  getOne = (tableName, id, withDeleted = false) => {
    const jsonRow = this.getJsonDataTable(tableName).find((item) => item.id == id);
    return jsonRow ? new (this.getModelClass(tableName))(jsonRow) : undefined;
  };

  insertOne = (model) => {
    const tableName = model.constructor.name.toLowerCase();
    const allData = JSON.parse(localStorage.getItem("data-cinema"));
    const jsonDataTable = allData[tableName];
    const nextId = Math.max(...jsonDataTable.map((obj) => obj.id)) + 1;
    model.id = nextId;
    jsonDataTable.push(model);
    localStorage.setItem('data-cinema', JSON.stringify(allData));
  }

  insertMany = (modelsArray) => {

  }

  updateOne = (model) => {
    const tableName = model.constructor.name.toLowerCase();
    const allData = JSON.parse(localStorage.getItem("data-cinema"));
    const jsonDataTable = allData[tableName];
    let row = jsonDataTable?.find((item) => item.id == model.id);
    Object.assign(row, model);
    localStorage.setItem('data-cinema', JSON.stringify(allData));
  }

  updateMany = (modelsArray) => {
    
  }

  deleteOne = (model) => {
    model.isDeleted = true;
    this.updateOne(model);
  }

  deleteMany = (modelsArray, hard = false) => {

  }

}
