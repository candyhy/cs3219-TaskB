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
                    description: testData.validTask1.description
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
                    description: testData.validTask2.description
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

describe( "update task description", () => {
    describe( "PUT /update_task", () => {
        it( "should update task 'task2' description from 'description2' to 'testDescription'", ( done ) => {
   
            chai.request( app )
                .put( '/update_task')
                .send({
                    taskname: testData.updateTaskDescription.taskname,
                    description: testData.updateTaskDescription.description
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

describe( "find task", () => {
    describe( "GET /find_task", () => {
        it( "should find task with input taskname", ( done ) => {
   
            chai.request( app )
                .get( '/find_task')
                .query({
                    taskname: testData.validTask1.taskname
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
