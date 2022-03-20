# TISEU-2022
Projekat na nivou celog smera koji simulira elektronsku upravu.

## Mapiranje portova

Pozeljno je da se svi drze sledeceg mapiranja portova prilikom unosa svojih servisa
u docker-compose fajl u root direktorijumu radi lakseg snalazenja

Primer:
maticar - tim br 4 - **prvi broj porta je broj tima**

```port frontend: 4001, port backend: 4002, port baza: 4003```

Ukoliko imate jos opcionih servisa, slobodno inkrementirajte dalje(4004,4005...)
