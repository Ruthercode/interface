build_test:
	docker-compose -f docker-compose.test.yml build
run_test:
	docker-compose -f docker-compose.test.yml up --force-recreate -d

build:
	docker-compose build
run:
	docker-compose up -d
stop:
	docker-compose stop

clear:
	docker-compose down 