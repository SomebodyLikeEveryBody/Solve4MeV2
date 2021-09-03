all: WriteMath light
	@echo ''
	@echo '> Full Solve4Me Project built'

light:
	@echo ''
	@echo '[Building Solve4Me Project Lightly]'
	@echo 'mkdir ./build/'
	@if [ ! -d "./build/" ]; then mkdir ./build/; fi
	/bin/cp ./htmlResources/index.htm ./build/
	/bin/cp ./htmlResources/Solve4MeGUIStyle.css ./build/
	/bin/cp -R ./htmlResources/imgs ./build/
	@if [ -d "./build/Lib_WriteMath_build/" ]; then /bin/rm -R ./build/Lib_WriteMath_build; fi
	/bin/cp -R ./Lib_WriteMath/build/ ./build/Lib_WriteMath_build/


WriteMath:
	@echo ''
	@echo '[Building WriteMath Lib]'
	cd ./Lib_WriteMath/ && /bin/make && cd ../

cleanWriteMath:
	@echo ''
	@echo '[Cleaning WriteMath Lib]'
	cd ./Lib_WriteMath/ && /bin/make clean && cd ../

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


