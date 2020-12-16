# Crediplex
Website that displays information about loan product in Mexico.
 
## Getting Started 
You need to have make and Docker installed.  
 - Clone the repository
 - Add an empty file called `secrets.env` to the root directory.
- Install the services and add seed data:

For example, if you have `make` and `touch` commands installed, you can do:
```Bash
git clone git@github.com:rulio/crediplex.git
cd crediplex
touch secrets.env 
make install
```
 Then start the website and dependencies with:
 ```Bash
 make start/website
 ```
 You can start additional services including Kibana to view Elastic Search data with:
 ```Bash 
make  start/all
```
If you don't have make installed, review the `Makefile` and execute the commands written there individually.

View the website at http://localhost:3000.  Changes should be reloaded automatically.
Other services are:


## API
Retrieves data from Elastic Search database about lenders and loan products.

http://localhost:9090 (from host)

http://api:8080 (from other containers)

## Scraper
Crawls web for information about loan products and inserts the data into Elastic Search Database.  Refer to the Makefile to see how to run the scraper

## Website
React.js based website that displays informaiton about loans and lenders via a directory and search interface.

http://localhost:3000

## Elastic Search
Document database uses to store Crediplex data and power search.

http://localhost:9200 (from host)
http://elasticsearch:9200 (from other containers)

## Kibana
Graphical interface that allows interaction with Elastic Search database

http://localhost:9998

## Redis DB
Used by the scraper to save/cache pages that have previously been loaded.

http://localhost:6379 (from host)
http://redis:6379 (from other containers)

## Redis Commander
Graphical interface that allows interaction with the Redis data store

http://localhost:9999

## Vols Directory
Stores data for Elastic Search and Redis so it loads when containers are started.