all:
	/usr/local/bin/tsc -t ES5 --outFile ./build/WriteMath.js \
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
    ./Module_AutoCompleter/Class_AutoCompleterKeywordsList.ts \
    ./Class_MathLineInput.ts \
    ./Module_UndoRedoManager/Class_UndoRedoManager.ts \
    ./Module_ShortcutsManager/Class_ShortcutsManager.ts \
    ./Module_AutoCompleter/Class_AutoCompleter.ts \
    ./Module_SaverNOpenerStateManager/Class_SaverNOpenerStateManager.ts \
    ./main.ts
	cp ./htmlResources/WriteMathStyle.css ./build/
	cp ./Module_AutoCompleter/AutoCompleterStyle.css ./build/
	cp -R ./Module_MathQuill/ ./build/
	cp -R ./Module_jQuery/ ./build/

clean:
	@echo '/bin/rm ./build/'
	@if [ -d "./build/" ]; then /bin/rm -r ./build/; fi
