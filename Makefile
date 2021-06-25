install:
	git pull https://github.com/Ruthercode/interface_backend.git
	git pull https://github.com/Ruthercode/interface_app.git

build:
	docker-compose build
run:
	docker-compose up