import { DataManager } from "../../helpers/dataManager.helper";

export class ReservationIndexView {
    models = null;
    constructor(models) {
      this.models = models;
      //this.importCss();
    }
  
    importCss = async () => {
      const cssModule = await import("./filmDetail.index.view.css", {
        assert: { type: "css" },
      });
      document.adoptedStyleSheets = [cssModule.default];
    };

    dateConverter(date) {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return newDate;
      }

    render = () => {
        const {seance, reservation} = this.models;
        const film = seance.getFilm();

        const viewHtml = ` <div >
            <div class="p-5">
                <div class="card m-auto" >
                    <img src="${film.affiche}" class="card-img-top" alt="${film.title}">
                    <div class="card-body">
                        <h5 class="card-title">${film.title}</h5>
                        <p class="card-text">${seance.price}€ / place</p>
                        <div class="text-center">
                            Le ${this.dateConverter(seance.jour)} à ${seance.heure} Salle ${seance.getSalle().name}
                        </div>
                        
                    </div>
                </div>
            </div>
            <form class='container text-white' id="resa-form">
                            <div class="form-group row">
                            <label for="Name" class="col-4 col-form-label">Nom et prenom</label> 
                            <div class="col-8">
                                <div class="input-group">
                                    <input id="Name" name="customer" placeholder="Votre NOM et Prenom" type="text" class="form-control" required="required">
                                </div>
                            </div>
                            </div>
                            <div class="form-group row">
                                <label for="nbPlace" class="col-4 col-form-label">Nombre de place</label> 
                                <div class="col-8">
                                    <select id="nbPlace" name="nbPlace" class="custom-select">
                                    <option value="1" selected>1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    </select>
                                </div>
                            </div> 
                            <div><h2>Le prix total est de : <span id="displayPrice">${seance.price}</span>€</h2></div>
                            <div class="form-group row">
                                <div class="offset-4 col-8">
                                    <button name="submit" type="submit" class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </form>
            </div>
        `

        const viewElement = document.createElement('div');
        viewElement.innerHTML = viewHtml;

        viewElement.querySelector('#nbPlace').onchange = (evt) => {
            viewElement.querySelector('#displayPrice').innerText = evt.currentTarget.value * seance.price;
        }

        viewElement.querySelector('#resa-form').onsubmit = (evt) => {
            evt.preventDefault();
            console.log("form submitted");
            const data = new FormData(evt.currentTarget);
            const jsonData = Object.fromEntries(data.entries());
            Object.assign(reservation, jsonData);
            DataManager.insert(reservation);
            console.log(reservation);
        }

        return viewElement;

    }



}