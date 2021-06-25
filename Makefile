install:
	git clone https://github.com/Ruthercode/interface_app.git
	git clone https://github.com/Ruthercode/interface_backend.git

build:
	docker-compose build
run:
	docker-compose up