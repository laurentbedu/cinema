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

  render = () => {

    const { film, seances } = this.models;

    return `
        <br class="pt-5" >
        <div class="card m-auto" style="width: 18rem;">
            <img src="${film.affiche}" class="card-img-top" alt="${film.title}">
            <div class="card-body">
                <h5 class="card-title">${film.title}</h5>
                <p class="card-text">${film.synopsis}</p>
                <a href="/reservation" class="btn btn-primary spa-link">Réserver</a>
            </div>
        </div>
              `;
  };
}
