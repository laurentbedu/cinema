# cinema

Ajout des relations entre les classes modèles.
(en se basant sur le MCD)


Dans la classe Seance :

getSalle()

getFilm()

getReservationList()


Dans la classe Salle :

getSeanceList()


Dans la classe Film :

getSeanceList()


Dans la classe Reservation :

getSeance()


Amélioration du constructeur de la classe DataManager en supprimant le paramètre files

Modification (fusion) des méthodes insert/update/delete One et Many

Passage de la classe DataManager en static 

