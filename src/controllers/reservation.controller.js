import { DataManager } from "../helpers/dataManager.helper";
import { Reservation } from "../models/reservation.model";
import { ReservationIndexView } from "../views/reservation/reservation.index.view";


export class ReservationController {

    index = (params) => {
        const id_seance = params[0];
        const seance = DataManager.getOne('seance', id_seance);
        const reservation = new Reservation({seance_id : id_seance});
        const view = new ReservationIndexView({seance, reservation});

        return view.render();
    }

}