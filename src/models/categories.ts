export interface GetCategoriesRequest {
    country?: string; 
    locale?: string;
    limit?: number;
    offset?: number;
}

export interface GetCategoriesResponse {
    categories: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: CategoryObject[];
    };
}
export interface CategoryObject {
    href: string;
    icons: { url: string; height: number | null; width: number | null; }[]; // 카테고리 아이콘 이미지 배열
    id: string; 
    name: string;
}
