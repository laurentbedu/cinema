export class FilmDetailIndexView {
  models = null;
  constructor(models) {
    this.models = models;
    this.importCss();
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

    const { film, seances } = this.models;
    const sortedSeances = seances.sort((s1,s2) => s1.heure < s2.heure ? -1 : 1)
                                .sort((s1,s2) => s1.jour < s2.jour ? -1 : 1);
    const seanceLinks = sortedSeances.map(seance => {
      return `
        <a href="/reservation/${seance.id}" class="btn btn-primary spa-link m-1">
          Le ${this.dateConverter(seance.jour)} à ${seance.heure} Salle ${seance.getSalle().name}
        </a>
      `;
    }).join('');

    return `
        <div class="p-5">
        <div class="card m-auto" >
            <img src="${film.affiche}" class="card-img-top" alt="${film.title}">
            <div class="card-body">
                <h5 class="card-title">${film.title}</h5>
                <p class="card-text">${film.synopsis}</p>
                <div class="text-center">
                  ${seanceLinks}
                </div>
                
            </div>
        </div>
        </div>
              `;
  };
}
