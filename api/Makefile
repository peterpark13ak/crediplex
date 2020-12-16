#!/bin/bash
test/all:   clean
	mocha

add_jobs:
	mocha test/testJobKickoff.js

process_jobs:
	mocha test/testJobQueue.js	

save_lender_products:
	docker-compose exec lender-service mocha --timeout 130000  test/elastic/testLender.js

crawl:
	docker-compose exec lender-service mocha --timeout 130000  test/parse/testLenderList.js

migrate:
	sequelize db:migrate

clean:
	sequelize db:migrate:undo:all
	sequelize db:migrate
