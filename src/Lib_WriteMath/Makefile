all:
	/usr/local/bin/tsc -t ES5 --strict --outFile ./build/WriteMath.js \
    ./Enum_KeyCodes.ts \
    ./Interfaces/Interface_Coordinates2D.ts \
    ./Interfaces/Interface_S4MLParser.ts \
    ./Interfaces/Interface_Offset.ts \
    ./Interfaces/Interface_KeywordObject.ts \
    ./Interfaces/Interface_JQueryElement.ts \
    ./Interfaces/Interface_InputTextElement.ts \
    ./Interfaces/Interface_KeywordObject.ts \
    ./Interfaces/Interface_MathFieldTreeElement.ts \
    ./Interfaces/Interface_HistoryStatement.ts \
    ./Interfaces/Interface_CursorConfiguration.ts \
    ./Interfaces/Interface_EventObject.ts \
    ./Interfaces/Interface_ErrorObject.ts \
    ./Class_MathLineInput.ts \
    ./Class_ShortcutsManager.ts \
    ./Class_UndoRedoManager.ts \
    ./Class_SaverNOpenerStateManager.ts \
    ./Module_AutoCompleter/Class_AutoCompleterKeywordsList.ts \
    ./Module_AutoCompleter/Class_AutoCompleter.ts \
    ./main.ts
	cp ./htmlResources/WriteMathStyle.css ./build/
	cp ./Module_AutoCompleter/AutoCompleterStyle.css ./build/
	cp -R ./Module_MathQuill/ ./build/
	cp -R ./Module_jQuery/ ./build/

clean:
	@echo '/bin/rm ./build/'
	@if [ -d "./build/" ]; then /bin/rm -r ./build/; fi
