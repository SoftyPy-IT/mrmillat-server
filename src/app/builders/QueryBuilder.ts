import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  filter() {
    const queryObj = { ...this.query };

    // Filtering
    const excludeFields = ['limit', 'page', 'fields', 'sort'];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page);
    const limit = Number(this?.query?.limit);
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  sort() {
    const sortBy = (this.query.sort as string) || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sortBy);
    return this;
  }
}

export default QueryBuilder;
