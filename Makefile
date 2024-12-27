.PHONY: publish-patch publish-minor publish-major build

# Construction du projet
build:
	npm run build

# Publication avec incrémentation du patch (0.0.x)
publish-patch: build
	npm run build
	npm version patch
	npm publish

# Publication avec incrémentation mineure (0.x.0)
publish-minor: build
	npm run build
	npm version minor
	npm publish

# Publication avec incrémentation majeure (x.0.0)
publish-major: build
	npm run build
	npm version major
	npm publish 