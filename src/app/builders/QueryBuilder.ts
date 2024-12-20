import { Query } from "mongoose";

class QueryBuilder<T>{
  public modelQuery:Query<T[],T>;
  public query:Record<string,unknown>

  constructor(modelQuery:Query<T[],T>,query:Record<string,unknown>){
    this.modelQuery = modelQuery;
    this.query = query;
  }

 paginate(){
  const page = Number(this?.query?.page)||1;
  const limit = Number(this?.query?.limit)||5;
  const skip =(page - 1)*limit;
  this.modelQuery=this.modelQuery.skip(skip).limit(limit);

  return this;
 }



}

export default QueryBuilder;