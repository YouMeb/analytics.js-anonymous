BIN := node_modules/.bin
SRC := $(shell find lib/ -type f -name '*.js')

include dependencies.mk

build: build/index.js

build/index.js: node_modules $(SRC)
	@duo -s AnalyticsAnonymous index.js

node_modules:
	@npm i

lint: eslint

clean:
	@- rm -rf components build
