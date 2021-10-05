.PHONY: all cleanAll S4MLParser main light WriteMath

all: WriteMath light S4MLParser main
	@echo ''
	@echo '> Full Solve4Me Project built'

light:
	@echo ''
	@echo '[Building Solve4Me Project Lightly]'
	@echo 'mkdir ./build/'
	@if [ ! -d "./build/" ]; then /usr/bin/mkdir ./build/; fi
	/bin/cp ./src/htmlResources/index.htm ./build/
	/bin/cp ./src/htmlResources/main.js ./build/
	/bin/cp ./src/htmlResources/Solve4MeGUIStyle.css ./build/
	/bin/cp -R ./src/htmlResources/imgs ./build/

main:
	@echo ''
	@echo '[Building Solve4Me Project main.js (Solve4Me.js)]'
	/usr/local/bin/tsc -t ES5 --strict --outFile ./build/Solve4Me.js \
	./src/Enum_KeyCodes.ts \
	./src/Enum_VirtualKeyboardKeyStyle.ts \
	./src/Interface_JQueryElement.ts \
	./src/Interface_MathLineInput.ts \
	./src/Interface_EventObject.ts \
	./src/Class_MathObj.ts \
	./src/Class_S4MCoreMemory.ts \
	./src/Class_InputScreen.ts \
	./src/Class_OutputScreen.ts \
	./src/Class_KeyboardListener.ts \
	./src/Class_VirtualKeyboard.ts \
	./src/main.ts

S4MLParser:
	@echo ''
	@echo '[Building S4ML Parser]'
	cd ./src/S4ML_Parser/ && /bin/make && cd ..
	cp ./src/S4ML_Parser/S4MLParser.js ./build/

S4MMemory:
	@echo ''
	@echo '[Building Solve4Me Memory]'

WriteMath:
	@echo ''
	@echo '[Building WriteMath Lib]'
	cd ./src/Lib_WriteMath/ && /bin/make && cd ../
	@if [ -d "./build/Lib_WriteMath_build" ]; then /bin/rm -R ./build/Lib_WriteMath_build; fi
	/usr/bin/cp -R ./src/Lib_WriteMath/build/ ./build/Lib_WriteMath_build

cleanS4MLParser:
	rm ./build/S4MLParser.js

cleanWriteMath:
	@echo ''
	@echo '[Cleaning WriteMath Lib]'
	cd ./src/Lib_WriteMath/ && /bin/make clean && cd ../

clean:
	@echo ''
	@echo '[Cleaning Solve4Me Project Lightly]'
	@echo '/bin/rm ./build/'
	@if [ -d "./build/" ]; then /bin/rm -r ./build/; fi


cleanAll: cleanWriteMath clean
	@echo ''
	@echo '> Full Solve4Me Project cleaned'
	@echo '/bin/rm ./build/'
	@if [ -d "./build/" ]; then /bin/rm -R ./build/; fi

re: cleanAll all
