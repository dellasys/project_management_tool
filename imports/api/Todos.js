import { Mongo } from 'meteor/mongo';
// import moment from 'moment';
var moment = require('moment-timezone');
var sgTime = moment().tz("Asia/Singapore").format();

export const TodosCol = new Mongo.Collection('todos');


if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('todos', function() {
        return TodosCol.find();
    });
}

Meteor.methods({
    'todos.insert'(objData){
        
        return TodosCol.insert({...objData, createdAt: sgTime});
    },
    'todos.update'(id, objData){
        return TodosCol.update({_id: id}, {$set:{...objData, modifiedAt: sgTime}});
    },
    'todos.remove'(id){
        return TodosCol.remove({_id: id});
    }
})