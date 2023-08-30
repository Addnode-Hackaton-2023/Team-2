If not possible to use MSDN credits for hosting in Azure, there are Azure resources per team that can be used during Hackathon. 
One VM server - windows  - and one Sql server database. 

# For each team, 1-6, the following resources are available (VM's are shut down and need to be started, ask someone in the projectgroup). 

## Team 1
VM: add-hack-1    	51.12.54.3

U: addhack1

P: *..

DB-server: add-hack.database.windows.net

DB-name: add-hack-1

U: addhack1

P: *..

## Team 2
VM: add-hack-2    	51.12.49.101

U: addhack2

P: *..

DB-server: add-hack.database.windows.net

DB-name: add-hack-2

U: addhack2

P: *..

## Team 3
VM: add-hack-3    	20.240.60.218

U: addhack3

P: *..

DB-server: add-hack.database.windows.net 

DB-name: add-hack-4

U: addhack4

P: *..

## Team 4
VM: add-hack-4    	20.240.248.166

U: addhack4

P: *..

DB-server: add-hack.database.windows.net

DB-name: add-hack-4

U: addhack4

P: *..

## Team 5
VM: add-hack-5    	4.225.163.249

U: addhack5

P: *..

DB-server: add-hack.database.windows.net

DB-name: add-hack-5

U: addhack5

P: *..

## Team 6
VM: add-hack-6    	20.240.61.30

U: addhack6

P: *..

DB-server: add-hack.database.windows.net

DB-name: add-hack-6

U: addhack6

P: *..

# Connection strings example: 
ado.net: Server=tcp:add-hack.database.windows.net,1433;Initial Catalog=add-hack-1;Persist Security Info=False;User ID=addhack1;Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;

Driver={ODBC Driver 18 for SQL Server};Server=tcp:add-hack.database.windows.net,1433;Database=add-hack-1;Uid=addhack1;Pwd={your_password_here};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;


# N.B! the resources are only accesible from H4 guest network with the IP:: 193.15.92.195
