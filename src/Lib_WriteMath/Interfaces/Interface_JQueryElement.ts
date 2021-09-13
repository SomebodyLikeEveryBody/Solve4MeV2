interface JQueryElement {
    length: Number;

    appendTo(pElement: JQueryElement): JQueryElement;
    insertAfter(pElement: JQueryElement): JQueryElement;
    insertBefore(pElement: JQueryElement): JQueryElement;
    remove(): JQueryElement;
    show(pTime: number, pFunction?: Function): JQueryElement;
    hide(pTime: number, pFunction?: Function): JQueryElement;
    fadeIn(pNumber: Number, pFunction?: Function): JQueryElement;
    fadeOut(pTime: Number, pFunction?: Function): JQueryElement;
    select(): JQueryElement;
    html(pStr: String): void;
    find(pSelector: String): JQueryElement;
    css(pStyles: Object): JQueryElement;
    first(): JQueryElement;
    addClass(pClassName: String): JQueryElement;
    removeClass(pClassName: String): JQueryElement;
    append(JQueryElement): JQueryElement;
    text(): String;
    next(): JQueryElement;
    prev(): JQueryElement;
    keydown(pFunction: Function): JQueryElement;
    keyup(pFunction: Function): JQueryElement;
    focusout(pFunction: Function): JQueryElement;
    focusin(pFunction: Function): JQueryElement;    
    blur(pFuction: Function): JQueryElement;
    addClass(pClassName: String): JQueryElement;
    removeClass(pClassName: String): JQueryElement;
    animate(pCssObject: Object, pTime: Number): JQueryElement;
    offset(): Offset;
    scrollTop(pValue?: Number): Number;
    height(): Number;
    outerHeight(): Number;
    text(pStr: String): JQueryElement;
    val(pStr?: String): String;
    attr(pProp: String, pBool: Boolean);
}