import { Mongo } from 'meteor/mongo';
// import moment from 'moment';
var moment = require('moment-timezone');
var sgTime = moment().tz('Asia/Singapore').format();

export const FeaturesCol = new Mongo.Collection('features');
export const Features_Todos = new Mongo.Collection('features.todos');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('features', function() {
        return FeaturesCol.find();
    });

    Meteor.publish('features.todos', function(projectId){
        let pipeline = [{$match:{projectId: projectId}}];
        let lookupTodos = {
            $lookup:{
                from:'todos',
                localField:'_id',
                foreignField:'featureId',
                as:'todos'
            }
        }
        pipeline.push(lookupTodos);
        
        ReactiveAggregate(this, FeaturesCol , pipeline, {clientCollection: 'features.todos'});
        
    });
}

Meteor.methods({
    'features.insert'(objData){
        return FeaturesCol.insert({...objData, createdAt: sgTime});
    },
    'features.update'(id, objData){
        return FeaturesCol.update({_id: id},{$set:{...objData, modifiedAt: sgTime}});
    },
    'features.remove'(id){
        return FeaturesCol.remove({_id: id});
    }
})