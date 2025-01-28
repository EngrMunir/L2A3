import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  sortBy() {
    const sortBy =(this?.query?.sortBy as string) || 'createdAt';
    const sortOrder =this?.query?.sortOrder ==='desc' ? -1 : 1;
    
    this.modelQuery = this.modelQuery.sort({ [sortBy]:sortOrder });
    return this;
  }

  filter(){
     if(this.query.author){
        this.modelQuery = this.modelQuery.where({author:this.query.author})
     }
      return this;
  }
 
}

export default QueryBuilder;
