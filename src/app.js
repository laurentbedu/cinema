

export class App {

    static spaLinks = document.getElementsByClassName('spa-link');

    static start = () => {

        window.onpopstate = (evt) => { //événement qui se produit quand on se "deplace" dans l'historique du navigateur
            console.log("window.onpopstate");
            App.navigateToRoute(evt.state?.route || "");
        }

        window.onload = () => {
            console.log("window.onload");
            //événement qui se produit quand la page se charge 
            //par refresh ou saisie d'une route dans la barre d'adresse du navigateur
            if(!history.state){
                const route = location.pathname;
                App.pushRouteToHistory(route);
                App.navigateToRoute(route);
            }
            else{
                App.navigateToRoute(history.state?.route || "");
            }
        }

        

    }

    static pushRouteToHistory = (route) => { //permet d'ajouter une route dans l'historique
        if(route == history.state?.route) return; //si la dernière entrée dans l'historique est la même inutile de l'ajouter
        console.log("pushRouteToHistory", route);
        history.pushState({
            route
        }, null, route);
    }

    static navigateToRoute = async (route) => { //permet d'afficher le contenu de la page demandée
        console.log("navigateToRoute", route);
        


        //initialisation de l'événement click sur les liens de la page (une fois le contenu modifié)
        for(const link of App.spaLinks){
            link.onclick = (evt) => {
                evt.preventDefault();
                console.log("link.onclick");
                const route = evt.target.pathname;
                App.pushRouteToHistory(route);
                App.navigateToRoute(route);
            }
        }
    }

}