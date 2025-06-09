//ApiResponse 타입화해 중복 최소화(?)
export interface ApiResponse<T> {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string | null;
    total: number;
    items: T[]; //제네릭으로 유동적 처리
}
