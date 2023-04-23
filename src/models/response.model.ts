export class Pagination {
  offset: number;
  limit: number;
  total: number;
}

export class CollectionResponse<T> {
  data: T[];
  pagination: Pagination;
}
