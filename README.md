http://www.oracle.com/technetwork/database/database-technologies/express-edition/downloads/index.html

Descomprima la carpeta adjunta y almacene instantclient_12_1 en la carpeta C:/

Cree las siguientes variables de entorno.


OCI_INC_DIR --->> C:\instantclient_12_1\sdk\include
OCI_LIB_DIR --->> C:\instantclient_12_1\sdk\lib\msvc

añada a la variable path las siguientes rutas 

C:\instantclient_12_1;C:\oraclexe\app\oracle\product\11.2.0\server\bin;
C:\instantclient_12_1\;

Descargar un compilador de c++

Instalar Node Js
https://nodejs.org/es/


********** INSTALACION BASE DE DATOS

En la carpeta adjunta se encuentran los archivos GASTRO_11042018; y GASTRO_11042018.DMP almacenarlos en la siguiente ruta 
C:\oraclexe\app\oracle\admin\XE\dpdump

Ejecute los siguientes comandos en el cmd

impdp system/oracle schemas=GASTRO  
DUMPFILE=DATA_PUMP_DIR:GASTRO_11042018.dmp 
LOGFILE=DATA_PUMP_DIR:GASTRO_11042018.log;


Con esto ya tendrá su base de datos instalada...

Luego clone el proyecto.

Para correr el servidor ir a la carpeta donde guardo el contenido de la rama Server y poner en el cmd el siguiente comando 

********* node app.js

Para ejecutar la aplicación ir a la carpeta donde almaceno el contenido de la rama DevelopReserveSystem y seguidamente 
deberá ejecutar el siguiente comando

******** npm start

Y listo!!!!!