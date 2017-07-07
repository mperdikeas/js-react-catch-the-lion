all:
	npm install
	npm run build
	npm run flow
	npm run test
	npm run dev
clean:
	rm -fr node_modules/
	rm -f es5/*.js
	rm -f es5/*.map
