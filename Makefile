.PHONY: install test build release start debug deploy

install:
	npm i

test:
	npm run lint
	npm run test

build:
	make install
	npm run build

release:
	make install
	npm run release

start:
	npm run start

debug:
	npm run debug

deploy:
	make release
	gcloud app deploy ./app.yaml --project com-gairal-chools
