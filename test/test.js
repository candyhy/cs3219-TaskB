process.env.NODE_ENV = "test";

const chai = require( "chai" );
const chaiHttp = require( "chai-http" );

const app = require( "../index" );
const Task = require( "../models/Task" );
const testData = require( "../dummyTestData/dummyTasks" );

const expect = chai.expect;
const should = chai.should();
chai.use( chaiHttp );

describe( "add 2 tasks", () => {
    before( ( done ) => {
        Task.deleteMany( {}, ( err ) => {
            done();
        } );
    } );

    describe( "POST /create_task/", () => {
        it( "should add 1 task", ( done ) => {
            chai.request( app )
                .post( '/create_task')
                .send({
                    taskname: testData.validTask1.taskname,
                    isDone: testData.validTask1.isDone
                })
                .end( ( err, res ) => {
                    if (err) {
                        return done(err);
                    }
                    res.should.have.status( 200 );
                    expect( res.body.status ).to.equal( "success" );
                    done();
                } );
        } );

        it( "should add another task", ( done ) => {
            chai.request( app )
                .post( '/create_task')
                .send({
                    taskname: testData.validTask2.taskname,
                    isDone:testData.validTask2.isDone
                })
                .end( ( err, res ) => {
                    if (err) {
                        return done(err);
                    }
                    res.should.have.status( 200 );
                    expect( res.body.status ).to.equal( "success" );
                    done();
                } );
        } );
    } );
} );

describe( "update task name", () => {
    describe( "PUT /update_task", () => {
        it( "should update task status of task 2 to true", ( done ) => {
   
            chai.request( app )
                .put( '/update_task')
                .send({
                    taskname: testData.updateTaskStatus.taskname,
                    isDone: testData.updateTaskStatus.isDone
                })
                .end( ( err, response ) => {
                if (err) {
                    return done(err);
                }
                response.should.have.status( 200 );
                expect( response.body.status ).to.equal( "success" );
                done();
            } );        
     
        } );
    } );
} );

describe( "delete task", () => {
    describe( "DELETE /delete_task", () => {
        it( "should delete task with input taskname", ( done ) => {
   
            chai.request( app )
                .delete( '/delete_task')
                .send({
                    taskname: testData.validTask2.taskname
                })
                .end( ( err, response ) => {
                if (err) {
                    return done(err);
                }
                response.should.have.status( 200 );
                expect( response.body.status ).to.equal( "success" );
                done();
            } );        
     
        } );
    } );
} );

describe( "get all tasks", () => {
    describe( "GET /get_tasks", () => {
        it( "should get all tasks", ( done ) => {
   
            chai.request( app )
                .get( '/get_tasks')
                .end( ( err, response ) => {
                if (err) {
                    return done(err);
                }
                response.should.have.status( 200 );
                expect( response.body.status ).to.equal( "success" );
                done();
            } );        
     
        } );
    } );
} );
