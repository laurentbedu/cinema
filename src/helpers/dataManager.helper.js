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
  };

  getModelClass = (tableName) => {
    const modelName = tableName.charAt(0).toUpperCase() + tableName.slice(1);
    return Models[modelName];
  };

  getAll = (tableName, withDeletedRows = false) => {
    let jsonDataTable = this.getJsonDataTable(tableName);
    if(!withDeletedRows){
      jsonDataTable = jsonDataTable.filter(item => !item.isDeleted)
    }
    return jsonDataTable.map((row) => {
        return new (this.getModelClass(tableName))(row);
    });
  };

  getOne = (tableName, id, whereIsDeleted = false) => {
    const jsonRow = this.getJsonDataTable(tableName).find((item) => item.id == id);
    if(!jsonRow || !whereIsDeleted && jsonRow.isDeleted){
      return;
    }
    return new (this.getModelClass(tableName))(jsonRow);
  };

  insertOne = (model) => {
    const tableName = model.constructor.name.toLowerCase();
    const allData = JSON.parse(localStorage.getItem("data-cinema"));
    const jsonDataTable = allData[tableName];
    const nextId = Math.max(...jsonDataTable.map((obj) => obj.id)) + 1;
    model.id = nextId;
    jsonDataTable.push(model);
    localStorage.setItem('data-cinema', JSON.stringify(allData));
  };

  insertMany = (...modelsArray) => {
    const tableName = modelsArray[0]?.constructor.name.toLowerCase();
    const allData = JSON.parse(localStorage.getItem("data-cinema"));
    const jsonDataTable = allData[tableName];
    let nextId = Math.max(...jsonDataTable.map((obj) => obj.id)) + 1;
    for(const model of modelsArray){
      model.id = nextId++;
      jsonDataTable.push(model);
    }
    localStorage.setItem('data-cinema', JSON.stringify(allData));
  };

  updateOne = (model) => {
    const tableName = model.constructor.name.toLowerCase();
    const allData = JSON.parse(localStorage.getItem("data-cinema"));
    const jsonDataTable = allData[tableName];
    let row = jsonDataTable?.find((item) => item.id == model.id);
    Object.assign(row, model);
    localStorage.setItem('data-cinema', JSON.stringify(allData));
  };

  updateMany = (...modelsArray) => {
    const tableName = modelsArray[0]?.constructor.name.toLowerCase();
    const allData = JSON.parse(localStorage.getItem("data-cinema"));
    const jsonDataTable = allData[tableName];
    for(const model of modelsArray){
      let row = jsonDataTable?.find((item) => item.id == model.id);
      Object.assign(row, model);
    }
    localStorage.setItem('data-cinema', JSON.stringify(allData));
  };

  deleteOne = (model) => {
    model.isDeleted = true;
    this.updateOne(model);
  };

  deleteMany = (...modelsArray) => {
    for(const model of modelsArray){
      model.isDeleted = true;
    }
    this.updateMany(...modelsArray)
  };

}
