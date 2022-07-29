

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
  }

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
  }


}
