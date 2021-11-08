interface EventObject {
    which: number;
    ctrlKey: boolean;
    altKey: boolean;
    preventDefault(): JQueryElement;
}