
MODULE_NAME = uSelector
UNCOMPRESSED = dist/${MODULE_NAME}.uncompressed.js
MODULES = src/uSelector.js

build: compress
	@echo "Removing unnecessary files..."
	@cd dist;\
		rm $$(ls -Sr | egrep -v $$(ls -Sr | head -1));\
		mv * ${MODULE_NAME}.js;\
		echo "Resulting file has`ls -lh | tail -1 | cut -d " " -f 7,9`."

compress:
	@rm -rf dist
	@mkdir -p dist
	@cat ${MODULES} > ${UNCOMPRESSED}
	@echo "Compressing with google compiler..."
	@java -jar assets/compiler.jar --jscomp_warning undefinedVars --charset utf8 --compilation_level ADVANCED_OPTIMIZATIONS --js ${UNCOMPRESSED} --js_output_file dist/${MODULE_NAME}.cc.js
	@echo "Compressing with yui compressor..."
	@java -jar assets/yui.jar ${UNCOMPRESSED} -o dist/${MODULE_NAME}.yui.js --charset=utf8
	@echo "Compressing with uglify..."
	@uglifyjs --unsafe ${UNCOMPRESSED} > dist/${MODULE_NAME}.ugly.js

test:
	@open tests/index.html

push: build
	@git commit -a
	@git push

