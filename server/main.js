import { Meteor } from 'meteor/meteor';
import { Projects } from'../imports/api/Projects';
import { TodosCol } from '../imports/api/Todos';
import { FeaturesCol } from '../imports/api/Features';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'remove.projects.features.todos'(id){
    Projects.remove({_id: id});
    FeaturesCol.remove({projectId: id});
    TodosCol.remove({projectId: id});
  },
  'remove.features.todos'(id){
    FeaturesCol.remove({_id: id});
    TodosCol.remove({featureId: id});
  }
})