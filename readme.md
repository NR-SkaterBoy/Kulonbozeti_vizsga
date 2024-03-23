# Webprogramozás - Különbözeti Vizsga 2024

## Bemutatkozás

Neuvald Richárd (FGTV2E) nevű tanuló vagyok. 2022-ben kezdtem meg tanulmányaimat a Pannon Egyetem Mérnökinformatikai karán Gazdaságinformatikusként. 2023-ban váltottam Programtervező informatikár, mert úgy éreztem, hogy számomra nagyobb élvezetet nyújt a programozás/fejlesztés, mint a gazdaság. A webes technológiákkal gimnáziumi éveim alatt kezdtem el foglalkozni, így több online elérhető projektem is van.

- [MulticolorBot | Website](multicolorbot.com)
-  [Saját Weboldam](richardneuvald.hu)

Valamint a közeljövőben tervezem megjeleníteni a MulticolorBot Dashboardot.

## Projekt Leírása

A weboldal lehetőséget teremt a felhasználónak, hogy egy előre elkészített adatbázis tekintsen meg, valamint szerkessze, beleértve az adatok hozzáadását, frissítését és törlését. 

### Backend

Backendnek a megadott technológiát használtam, azaz NodeJS alapokon ExpressJS-t. 
> Fájlok
- server.js
- database.js

A **server.js** fájl tartalmazza a webserver beüzemeléséhez szükségem importokat, definíciókat, valamit a routokat (/home, /select, /insert, /update, /delete) továbbá az adatfeldolgozó egységeket.
A **database.js** fájl megnyitja az előre megadott *chinook.db* filet, valmint definiálja az oldalon használatba vett funkciókat (select, insert, update, delete).

### Frontend

Frontend technológiának a PUG html sablont választottam, mert az évek alatt már előfordult, hogy használtam.
> Fileok, Mappák
- .pug kiterjesztéső fájlok
- static, frontend, scss

Mint elmlítettem, sablonmotornak a **PUG**-ot választottam, így a frontendes fájlok a **frontend** nevű mappában találhatóak **.pug** kiterjesztéssel.
A **static** nevű mappában találhatóak meg az oldalon használt képek, stílusok valamint JavaScript kódok.
Az **scss** mappában találhatóak meg a stílusért felelős fájlok, melynek lefordításához szzükséges egy sass fájl fordító.

#### Módosítás dátuma: 2024.03.23.