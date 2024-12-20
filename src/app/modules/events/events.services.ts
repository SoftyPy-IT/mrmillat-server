import QueryBuilder from "../../builders/QueryBuilder";
import { TEvent } from "./events.interface";
import { Event } from "./events.model";


const createEventIntoDB = async(payload:TEvent)=>{
const result = await Event.create(payload);
return result;
}

const getAllEventsFromDB = async(query:Record<string,unknown>)=>{
const eventsQuery = new QueryBuilder(Event.find(),query).paginate();

const result = await eventsQuery.modelQuery;

return result;
}

const getSingleEventFromDB = async(id:string)=>{
const result = await Event.findById(id);
return result;
}

const updateEventFromDB = async(id:string,payload:Partial<TEvent>)=>{
const result = await Event.findByIdAndUpdate(id,payload,{new:true});
return result;
}

const deleteEventFromDB = async(id:string)=>{
const result = await Event.findByIdAndDelete(id);
return result;
}


export const EventServices ={
  createEventIntoDB,
  getAllEventsFromDB,
  getSingleEventFromDB,
  updateEventFromDB,
  deleteEventFromDB
}