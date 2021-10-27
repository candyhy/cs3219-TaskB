process.env.NODE_ENV = "test";

const chai = require( "chai" );
const chaiHttp = require( "chai-http" );

const app = require( "../index" );
const User = require( "../models/User" );
const testData = require( "../dummyTestData/dummyUsers" );

const expect = chai.expect;
const should = chai.should();
chai.use( chaiHttp );

describe( "add 2 users", () => {
    before( ( done ) => {
        User.deleteMany( {}, ( err ) => {
            done();
        } );
    } );

    describe( "POST /create_account/", () => {
        it( "should add 1 user", ( done ) => {
            chai.request( app )
                .post( '/create_account')
                .send({
                    username: testData.validUser1.username,
                    password: testData.validUser1.password
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

        it( "should add another user", ( done ) => {
            chai.request( app )
                .post( '/create_account')
                .send({
                    username: testData.validUser2.username,
                    password: testData.validUser2.password
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

describe( "update user password", () => {
    describe( "PUT /update_password", () => {
        it( "should update user user2 password from password2 to testPassword", ( done ) => {
   
            chai.request( app )
                .put( '/update_password')
                .send({
                    username: testData.updateUserPassword.username,
                    password: testData.updateUserPassword.password
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

describe( "delete user account", () => {
    describe( "DELETE /delete_user", () => {
        it( "should delete user with input username", ( done ) => {
   
            chai.request( app )
                .delete( '/delete_user')
                .send({
                    username: testData.validUser2.username
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

describe( "delete user", () => {
    describe( "GET /find_user", () => {
        it( "should find user with input username", ( done ) => {
   
            chai.request( app )
                .get( '/find_user')
                .query({
                    username: testData.validUser1.username
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
