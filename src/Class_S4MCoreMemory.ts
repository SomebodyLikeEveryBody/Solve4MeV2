let declaredVars = {
    name: 'a',
    value: '42',
    processedValue: 42,
    

}


class S4MCoreMemory {
    protected declaredVars: Array<String>;

    public constructor() {
        this.declaredVars = [];
    }
}