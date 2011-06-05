MODULE_NAME = uSelector
UNCOMPRESSED = dist/${MODULE_NAME}.uncompressed.js
CORE = src/uSelector.js
ALL_MODULES = \
	$(CORE) \
	src/uSelectorPseudoClasses.js

build: compress
	@echo "Removing unnecessary files..."
	@cd dist;\
		rm $$(ls | egrep -v $$(ls -S | tail -1));\
		mv * ${MODULE_NAME}.js;\
		echo "Adding comment header to compressed file";\
		cat ../HEADER ${MODULE_NAME}.js > __tmp__ && cat __tmp__ > ${MODULE_NAME}.js && rm -rf __tmp__;\
		echo "Resulting file has `ls -lh *.js | tail -1 | awk '{ print $$5 }'`.";\
		gzip -c ${MODULE_NAME}.js > ${MODULE_NAME}.js.gzip;\
		echo "Resulting file gzipped has `ls -lh *.gzip | tail -1 | awk '{ print $$5 }'`.";\
		rm -rf *.gzip

compress:
	@rm -rf dist
	@mkdir -p dist
	@\
		if [ "$(all)" ]; then\
			MODULES="$(ALL_MODULES)";\
		else\
			MODULES="$(CORE)";\
		fi;\
		cat $$MODULES > ${UNCOMPRESSED}
	@echo "Compressing with google compiler..."
	@java -jar assets/compiler.jar --jscomp_warning undefinedVars --charset utf8 --compilation_level SIMPLE_OPTIMIZATIONS --js ${UNCOMPRESSED} --js_output_file dist/${MODULE_NAME}.cc.js
	@echo "Compressing with yui compressor..."
	@java -jar assets/yui.jar ${UNCOMPRESSED} -o dist/${MODULE_NAME}.yui.js --charset=utf8
	@echo "Compressing with uglify..."
	@uglifyjs --unsafe ${UNCOMPRESSED} > dist/${MODULE_NAME}.ugly.js

test:
	@open tests/index.html

