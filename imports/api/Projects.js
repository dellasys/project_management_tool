import { Mongo } from 'meteor/mongo';
// import moment from 'moment';
var moment = require('moment-timezone');
var sgTime = moment().tz("Asia/Singapore").format();

export const Projects = new Mongo.Collection('projects');
export const Projects_Features = new Mongo.Collection('projects.features');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('projects', function() {
        return Projects.find();
    });

    Meteor.publish('projects.features', function(projectId = '', keyword, sorting){
        let pipeline = [];

        if(projectId){
            pipeline.push({
                    $match:{
                        _id: projectId
                    }
                });
        }

        const lookupFeatures = {
            $lookup:{
                from:"features",
                localField:"_id",
                foreignField:"projectId",
                as:"features"
            }
        }
        const lookupTodos = {
            $lookup:{
                from:"todos",
                localField:"_id",
                foreignField:"projectId",
                as:"todos"
            }
        }
        const addLowercaseProjectName = {
            $addFields: {
                lowerCaseProjectName: {
                    $toLower: '$projectName'
                }
            }
        }
        
        pipeline.push(lookupFeatures);
        pipeline.push(lookupTodos);
        if(keyword){
            pipeline.push({
                $match:{
                    $or:[
                        { projectName: { $regex: keyword, $options: 'i' }},
                        { 'features.title': { $regex: keyword, $options: 'i' }},
                        { 'features.description': { $regex: keyword, $options: 'i' }},
                        { 'todos.name': {$regex: keyword, $options: 'i' }},
                    ]
                }
            });
        }
        pipeline.push(addLowercaseProjectName);
        if(sorting){
            pipeline.push(sorting);
        }
        console.log(pipeline);
        ReactiveAggregate(this, Projects , pipeline, {clientCollection: "projects.features"});
    }); 
}

Meteor.methods({
    'projects.insert'(objData){
        return Projects.insert({ ...objData, createdAt: sgTime });
    },
    'projects.update'(id, objData){
        return Projects.update({ _id: id},{ $set: { ...objData, modifiedAt: sgTime }});
    },
    'projects.remove'(id){
        return Projects.remove({ _id: id });
    }
})