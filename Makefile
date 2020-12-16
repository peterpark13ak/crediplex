install:
	# Start Elastic Search Container
	docker-compose up -d elasticsearch
	#
	# Sleep until the Elastic Search container is ready
	docker-compose run  elasticsearch sleep 30
	#
	# Resore Elastic Search data from snapshot file
	make snapshot/restore	
	#
	# Stop all containers and remove attached volumes
	docker-compose down -v
	#
	# Build containers from Dockerfile's 
	docker-compose build --no-cache

# start website and dependencies (api, elasticsearch)
start/website:
	docker-compose down
	docker-compose up -d website

snapshot/create:
	docker-compose run esdump elasticdump --input=http://elasticsearch:9200/ --output=/tmp/snapshots/esdata.json

snapshot/restore:
	docker-compose run esdump elasticdump --input=/tmp/snapshots/esdata.json --output=http://elasticsearch:9200/

start/all:
	docker-compose up -d

logs:
	docker-compose logs -f


# Runs scraper with gathers loan and lender data and inserts it into elastic search
scraper/run:
	docker-compose exec scraper ./bin/index.js --sector SOFOM_ENR --period CURRENT

# Deploys website to s3 and cloudfrtont
deploy/website:
	docker-compose exec website ./deploy.sh	

# Deploys Backend API to AWS API Gateway and Lambda
deploy/api:
	docker-compose exec api ./deploy.sh	

# Deploys data in local elastic search to Elastic Search DB in AWS
deploy/data:
	# Not working - need to add host hack
	#curl -X DELETE 'http://localhost:9200/_all'	
	docker-compose up -d esprod
	docker-compose run  esdump  elasticdump --input=http://elasticsearch:9200/ --output=https://esprod:9200/  