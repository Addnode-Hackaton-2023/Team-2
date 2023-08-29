# Fleet management och ruttoptimering
Allwin kör dagliga turer i Stockholm och Göteborg där de hämtar upp livsmedel på ett antal butiker och lämnar av det vid exempelvis en kyrka.

Idag sker planeringen av dessa transporter manuellt och tanken är att vi ska ta fram verktyg som underlättar planering och uppföljning av turerna.

En önskvärd funktion är att systemet givet adresser för butiker och slutdestination kan göra en [_Travelling salesman – optimering_](https://sv.wikipedia.org/wiki/Handelsresandeproblemet) för att på så sätt minimera körsträcka och tid.

Under färden mellan destinationerna längs turen skulle det vara en stor fördel om ruttplaneringen kunde ta hänsyn till aktuell trafik, trafikstörningar eller vägarbeten.

Här kommer vi även att behöva administrera fordon och lägga upp de rutter som ska köras.

Säkerhet och drift kommer även vara en viktig faktor i denna del.

## Simons önskelista
Features makerade med `ESRI` kan lösas med ESRIs apier/produkter.
| Feature | Beskrivning |
| ------- | ----------- |
| Administrera butiker/stopp  | Ett stopp ska kunna pausas under en period (de kanske bygger om och är då inte aktiva).‌Jmfr även m t.ex. Lidl’s huvudkontor som några ggr per år köper alla konkurrenters varor för att undersöka och sedan skänker mkt när de är klara. Även andra typer av event kan vara temporära stopp - kanske inte hör hemma i antal butiker.‌‌Fotnot: turerna börjar kl 08 på dagen, och ska lämnas kl 15 (senast) för att slutkund(kyrka)  så de i sin tur kan dela ut allt kl 17.  Lunchepaus ska få rum under den här perioden. (idag finns 45 butiker i Sthlm fördelat på två bilar; 23 resp 12 stopp) |
| Hantera antal bilar  |  |
| Adress => koordinat (koordinater = input för optimeringen) `ESRI?` | Har ESRI ett adress-till-koordinat-tjänst?  (Sokigo har ett sådant.. Google är en fallback också.) |
| Utvärdering av open source optimeringsmjukvara (eller 'egen'?) `Utgår om vi nyttjar ESRI` | Ta en lista av objekt m koordinater och skapar en ruttoptimering. Jmfr Intraphone. |
| Autentisering - appsäk..  | Behövs för samtliga team - synka..! |
| Hantera mottagare av leverans  | Kan bytas, överväg temporära adresser vid händelse av nedstängda pga renovering.Akuta nedstängningar om t.ex. en kyrka är helt stängd under en period. |
| Administratörs vy  |  |
| Platsinformation, infarter m.m.  | Detaljerad info om infart etc. Jmfr att ta sig in i Nordstan i Göteborg, kan krävas bilder och beskrivning i text. |
| Optimera rutt `ESRI?` | Rutten startar alltid från en depå, går sedan via butikerna och till avlämningsstället. Efter avlämningsstället ska bilen tillbaks till depån.Specialfall: Om bilen beräknas bli full under upphämtningen så behöver ett extra stopp på avlämningsstället läggas in. |
| Boka förare? - Input Simon  |  |
| Hantera förare  |  |
| Skapa egen (basal) optimeringsmjukvara `Utgår om vi nyttjar ESRI` |  |
| Tag hänsyn till aktuell trafiksituation vid optimering (dvs dynamisk optimering under körningen). Jmf Driver support `ESRI?` | Historiska körtider tas i beaktande? |
