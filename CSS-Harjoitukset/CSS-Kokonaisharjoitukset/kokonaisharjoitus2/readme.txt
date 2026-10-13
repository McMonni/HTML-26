
Miten valitsemani selectorit voittavat Cascadessa? (Perustelut tehtävää varten)

Tehtävässä pyydettiin osoittamaan, miksi valitut selectorit voittavat cascadessa ( CSS:n pisteytysjärjestelmä eli Specificity). Tässä ovat perustelut, jotka voit vastata työssäsi:
1. .card.card--featured (Yhdistelmävalitsin):
	• Miksi voittaa? Kun article-elementillä on luokat .card ja .card--featured, tämä yhdistelmävalitsin tuottaa korkeamman pisteytyksen (kaksi luokkaa = 0,2,0) kuin pelkkä .card (yksi luokka = 0,1,0). Tämän vuoksi suositellun kortin taustaväri ja reunus ylikirjoittavat tavallisen kortin tyylit ilman, että tarvitsee turvautua huonoon !important-tapaan.
2. .button--primary vs .button (Lähdejärjestys / Source Order):
	• Miksi voittaa? Molemmilla valitsimilla on tismalleen sama painoarvo (yksi luokka = 0,1,0). Cascade-sääntöjen mukaan silloin, kun pisteytys on tasan, viimeisenä CSS-tiedostossa kirjoitettu sääntö voittaa. Koska .button--primary on kirjoitettu tiedoston loppuun .button-luokan jälkeen, se muuttaa Hero-alueen painikkeen värin onnistuneesti.
3. .card .card__text (Jälkeläisvalitsin) vs p (Elementtivalitsin):
	• Miksi voittaa? Yleisessä body-osiossa määrätään tekstin väriksi tummanharmaa. Kortin sisällä olevan tekstin väri halutaan kuitenkin hieman vaaleammaksi. .card .card__text voittaa perus p-valitsimen, koska luokkavalitsimet ovat aina painavampia kuin pelkät elementtivalitsimet.
