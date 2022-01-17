interface EventObject {
    preventDefault(): void;
    stopPropagation(): void;
    which?: number;
}