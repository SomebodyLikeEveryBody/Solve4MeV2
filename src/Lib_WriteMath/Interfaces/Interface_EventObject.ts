interface EventObject {
    which: Number;
    preventDefault(): JQueryElement;
    ctrlKey: Boolean;
    altKey: Boolean;
}